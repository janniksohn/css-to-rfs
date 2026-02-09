import * as vscode from 'vscode';

export function cssToRfs(line: string): string | null {
  const match = line.match(/^(\s*)([\w-]+)\s*:\s*(.+?)\s*;?\s*$/);
  if (!match) {
    return null;
  }

  const [, indent, property, values] = match;
  return `${indent}@include rfs(${values}, ${property});`;
}

export function rfsToCss(line: string): string | null {
  const match = line.match(/^(\s*)@include\s+rfs\((.+),\s*([\w-]+)\)\s*;?\s*$/);
  if (!match) {
    return null;
  }

  const [, indent, values, property] = match;
  return `${indent}${property}: ${values};`;
}

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand('css-to-rfs.convert', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (!text) {
      vscode.window.showWarningMessage('No text selected.');
      return;
    }

    const lines = text.split('\n');
    // Detect direction: if any line is RFS, convert back to CSS
    const isRfs = lines.some((line) => /^\s*@include\s+rfs\(/.test(line));

    const converted = lines.map((line) => {
      const result = isRfs ? rfsToCss(line) : cssToRfs(line);
      return result ?? line;
    });

    editor.edit((editBuilder) => {
      editBuilder.replace(selection, converted.join('\n'));
    });
  });

  context.subscriptions.push(command);
}

export function deactivate() {}

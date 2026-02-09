# CSS to RFS

Quickly convert CSS property declarations to their [RFS](https://github.com/twbs/rfs) (Responsive Font Size) SCSS mixin equivalents, and vice versa. Select your code, run the command, and the conversion is applied in place.

## Features

- **Bidirectional conversion** -- automatically detects whether the selected text is CSS or RFS and converts in the appropriate direction.
- **Multi-line support** -- select multiple lines and convert them all at once. Lines that don't match the expected pattern are left unchanged.
- **Keyboard shortcut** -- trigger the conversion instantly with a keybinding.

### CSS to RFS

```css
/* Before */
font-size: 2rem;
padding: 1.5rem;

/* After */
@include rfs(2rem, font-size);
@include rfs(1.5rem, padding);
```

### RFS to CSS

```scss
/* Before */
@include rfs(2rem, font-size);
@include rfs(1.5rem, padding);

/* After */
font-size: 2rem;
padding: 1.5rem;
```

## Usage

1. Select the CSS or RFS lines you want to convert in the editor.
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run **Convert CSS to RFS**.
3. The selected text is replaced with the converted output.

Alternatively, use the keyboard shortcut:

| Platform        | Shortcut          |
| --------------- | ----------------- |
| macOS           | `Cmd+Shift+R`     |
| Windows / Linux | `Ctrl+Shift+R`    |

> The shortcut is active when the editor has focus and text is selected.

## Commands

| Command                  | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `Convert CSS to RFS`     | Convert selected CSS declarations to RFS, or RFS back to CSS |

## Requirements

No additional dependencies are required. The extension works out of the box with any file type open in the editor.

## Extension Settings

This extension does not contribute any VS Code settings.

## Known Issues

None at this time.

## Release Notes

### 0.0.1

- Initial release
- Bidirectional conversion between CSS properties and `@include rfs(...)` SCSS syntax
- Keyboard shortcut support (`Cmd+Shift+R` / `Ctrl+Shift+R`)

## License

See [LICENSE](LICENSE) for details.

# Changelog

All notable changes to the **css-to-rfs** extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.0.2] - 2026-02-09

### Changed

- Added `repository` URL to `package.json` for Marketplace resource links.

## [0.0.1] - 2026-02-09

### Added

- `Convert CSS to RFS` command that converts CSS property declarations to `@include rfs(...)` SCSS syntax.
- Automatic direction detection -- if the selection already contains RFS includes, the command converts back to plain CSS.
- Multi-line selection support; non-matching lines are left unchanged.
- Keyboard shortcut: `Cmd+Shift+R` (macOS) / `Ctrl+Shift+R` (Windows & Linux).

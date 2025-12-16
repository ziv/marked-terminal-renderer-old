# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

marked-terminal-renderer is a terminal renderer extension for the [marked](https://github.com/markedjs/marked) markdown parser. It converts markdown into beautifully formatted terminal output with support for colors, tables, code highlighting, emoji, and terminal images/links.

## Development Commands

### Running Examples
```bash
npm run example
```
Runs `examples/example.mts` to demonstrate the renderer's capabilities.

### Testing
The project is in transition - the old build system used Jest, but tests are currently not configured in the new setup:
```bash
# Old commands (from package.old.json):
npm test              # Run Jest tests
npm run test:cover    # Run tests with coverage
```

### Linting & Formatting
```bash
# Old commands (from package.old.json):
npm run lint          # Run ESLint
npm run format        # Auto-fix ESLint issues and format with Prettier
```

### Building
```bash
# Old commands (from package.old.json):
npm run build         # Clean lib/, compile TypeScript, bundle with Rollup
npm run prepare       # Runs build automatically before npm publish
```

## Architecture

### Core Files Structure

The codebase is currently transitioning from a `src/` directory structure to root-level `.mts` files:

- **renderer.mts** - Main renderer implementation. Contains `createCliRenderer()` which returns a marked extension with a custom `RendererObject` that handles all markdown token types.
- **types.mts** - TypeScript interfaces, primarily `CliRendererOptions` which defines all styling/configuration options.
- **primitives.mts** / **themes.mts** - Theme definitions (DARK, LIGHT, COMMON) with chalk styling for different markdown elements. Note: Both files currently exist with same content.
- **utils.mts** - Helper functions for text manipulation: wrapping, padding, emoji replacement, line processing.

### Key Architectural Patterns

1. **Token-based Rendering**: The renderer works by implementing methods for each marked token type (heading, paragraph, list, code, etc.). The `apply()` function maps token types to renderer methods using a switch statement for type safety.

2. **Recursive Token Processing**: The `autoApply()` function recursively processes nested tokens (e.g., bold text inside a list item) by checking for `tokens` arrays and mapping them through `apply()`.

3. **Async Image Handling**: The `walkTokens` async function preprocesses image tokens, fetching remote images via `got` and converting them to terminal output via `terminal-image` before rendering.

4. **Styling via Chalk**: All visual styling (colors, bold, italic, etc.) is handled through chalk instances defined in theme objects, making it easy to create new themes.

5. **List Depth Tracking**: Uses `currentListDepth` to handle nested lists properly, with special padding for nested items.

6. **Meta Characters**: Uses special Unicode character `྿` (LI constant) as a placeholder for list markers to avoid collision with actual content.

## Dependencies

Key runtime dependencies:
- **marked** - Markdown parser (peer dependency in old config)
- **chalk** - Terminal colors
- **cli-highlight** - Code syntax highlighting
- **cli-table3** - Table rendering
- **node-emoji** - Emoji support
- **terminal-image** - Display images in terminal
- **terminal-link** - Clickable links in terminal
- **boxen** - Boxed content for code blocks
- **got** - HTTP client for fetching remote images

## Release Process

This project uses semantic-release for automated versioning and publishing:
- Commits to `main` trigger CI pipeline
- After tests/lint pass, semantic-release analyzes commits and publishes to npm
- Uses conventional commits for version bumping
- Configured in `release.config.js`

## Current State & Migration

The repository shows signs of active refactoring:
- Files being renamed from `.ts` to `.mts` (ES modules)
- `src/` directory removed, files moved to root
- `package.json` simplified (old version saved as `package.old.json`)
- Build tooling (TypeScript compiler, Rollup) being reconfigured
- Test infrastructure needs to be re-established

When working with this codebase, be aware that some infrastructure from `package.old.json` may need to be restored or updated for modern ESM builds.
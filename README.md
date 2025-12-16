# marked-terminal-renderer

Terminal renderer [marked](https://github.com/markedjs/marked) extension.

[![CI](https://github.com/ziv/marked-terminal-renderer/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/ziv/marked-terminal-renderer/actions/workflows/main.yml)
[![CodeQL](https://github.com/ziv/marked-terminal-renderer/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/ziv/marked-terminal-renderer/actions/workflows/codeql-analysis.yml)

## Install

```shell
npm i marked-terminal-renderer
```

## Usage

### Typescript

```typescript
import terminalRenderer from "marked-terminal-renderer";
import * as marked from "marked";
import { readFileSync } from "fs";

marked.use(terminalRenderer());
const src = readFileSync(__dirname + "example.md").toString();
console.log(marked(src));
```

### ESM

```javascript
import terminalRenderer from "marked-terminal-renderer";
import marked from "marked";
import { readFileSync } from "fs";

marked.use(terminalRenderer());
// there is no __dirname in ESM (this is not a node environment)
const src = readFileSync(new URL("example.md", import.meta.url)).toString();
console.log(marked(src));
```

### Examples

```shell
node examples/example.mjs
```

Output:

<img src="examples/example.png" alt="output" width="400">

## Options

TBW

## Features

- Colors - thanks to [chalk](https://github.com/chalk/chalk)
- Tables - thanks to [cli-table3](https://github.com/cli-table/cli-table3)
- Wrapping - thanks to [word-wrap](https://github.com/jonschlinkert/word-wrap)
- Code Highlighting - thanks to
  [cli-highlight](https://github.com/felixfbecker/cli-highlight)
- Emoji - thanks to [node-emoji](https://github.com/omnidan/node-emoji)

[![downloads](https://badgen.net/npm/dt/marked-terminal-renderer)](https://www.npmjs.com/package/marked-terminal-renderer)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

:)

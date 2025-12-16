// ESM example
import terminalRenderer from "../lib/index.mjs";
import marked from "marked";
import { readFileSync } from "fs";

marked.use(terminalRenderer());

// there is no __dirname in ESM (this is not a node environment)
const src = readFileSync(new URL("example.md", import.meta.url)).toString();

console.log(marked(src));

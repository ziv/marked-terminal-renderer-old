import { marked } from 'marked';
import { readFileSync } from 'node:fs';
import { createCliRenderer } from '../renderer.mjs';
import { DARK, LIGHT } from '../primitives.mjs';


marked.use(createCliRenderer(LIGHT));
console.log(await marked.parse(readFileSync('./examples/example.md', 'utf-8')));

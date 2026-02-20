#!/usr/bin/env node

import { stdin, argv } from "zx";
import wrapAnsi from "wrap-ansi";
import stripAnsi from "strip-ansi";

if (process.stdin.isTTY) {
	process.exit(1);
}

let text = await stdin();
if (!text) {
	process.exit(1);
}

const columns = argv?.columns || 80;
// const width = argv?.width || process.stdout.columns || 80;

text = stripAnsi(text);

text = text.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, "");

text = wrapAnsi(text, columns, { hard: true });

console.log(text);

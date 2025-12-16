import { emojify } from 'node-emoji';
import { CliRendererOptions } from './types.mjs';

export const SEP = ' '; // separator
export const EOL = '\n'; // end of line
export const LI = '྿'; // list character (meta char to avoid collision)

export function section(text: string) {
  return text + EOL + EOL;
}

export function block(text: string) {
  return EOL + text + EOL;
}


export function replaceTextWithSymbols(text: string): string {
  // first emojify to avoid replacing inside emoji codes
  text = emojify(text);

  // then replace other text patterns
  const textReplacers: [string | RegExp, string][] = [
    [/\(c\)/g, '©'],
    [/\(C\)/g, '©'],
    [/\(tm\)/g, '™'],
    [/\(TM\)/g, '™'],
    [/\(r\)/g, '®'],
    [/\(R\)/g, '®'],
    [/\(p\)/g, '℗'],
    [/\(P\)/g, '℗'],
    [/\+-/g, '±'],
    [/&quot;/g, '"'],
    [/&#39;/g, '\'']
  ];
  for (const [search, replace] of textReplacers) {
    text = text.replace(search, replace);
  }
  return text;
}


export function padLines(text: string, padding = 2): string {
  return text.split(EOL).map(
    (line: string) => ' '.repeat(padding) + line
  ).join(EOL);
}


export function padLinesEnd(text: string, length: number): string {
  return text.split(EOL).map(
    (line: string) => {
      const toAdd = length - line.length;
      return line + ' '.repeat(toAdd > 0 ? toAdd : 0);
    }
  ).join(EOL);
}

export function isCheckbox(opt: CliRendererOptions, text: string): boolean {
  return text.includes(opt.cbCheckedChar) || text.includes(opt.cbUncheckedChar);
}


export function hardWrap(text: string, width: number) {
  let current = '';
  const lines: string[] = [];
  for (const next of text.replace(/\n/g, ' ').split(' ')) {
    if (current.length + next.length > width) {
      lines.push(current);
      current = next;
    } else if (current === '') {
      current = next;
    } else {
      current += ' ' + next;
    }
  }
  lines.push(current);
  return lines.join('\n');
}

export function softWrap(text: string, width: number) {
  const lines: string[] = [];
  for (const line of text.split('\n')) {
    if (line.length <= width) {
      lines.push(line);
    } else {
      lines.push(...hardWrap(line, width).split('\n'));
    }
  }
  return lines.join('\n');
}

export function wrap(text: string, width: number, indent = ''): string {
  if (text.length <= width) {
    return text;
  }

  const newline = EOL + indent;
  const regexString = '.{1,' + width + '}([\\\\s\u200B]+|$)|[^\\\\s\u200B]+?([\\\\s\u200B]+|$)';
  const re = new RegExp(regexString, 'g');
  const lines = text.match(re) || [];

  const result = indent + lines.map(function(line) {
    if (line.slice(-1) === '\n') {
      line = line.slice(0, line.length - 1);
    }
    return line;
  }).join(newline);

  // if (options.trim === true) {
  //   result = trimTabAndSpaces(result);
  // }
  return result;
}


export function trimEmptylines(text: string): string {
  return text.split('\n').filter(line => line.trim() !== '').join('\n');
}
import { marked, MarkedExtension, Renderer, RendererObject, Token, Tokens } from 'marked';
import chalk from 'chalk';
import { highlight } from 'cli-highlight';
import Table from 'cli-table3';
import { CliRendererOptions } from './types.mjs';
import terminalImage from 'terminal-image';
import { DARK } from './primitives.mjs';
import { readFileSync } from 'node:fs';
import {
  block,
  EOL,
  hardWrap,
  isCheckbox,
  padLines,
  replaceTextWithSymbols,
  section,
  LI,
  SEP,
  trimEmptylines
} from './utils.mjs';
import terminalLink from 'terminal-link';
import got from 'got';
import boxen from 'boxen';

// todo should load dark/light themes based on terminal bg color
// todo should support more themes
// todo auto detect terminal capabilities (colors, images, links, etc)
// todo wrapping text in any level (paragraphs, list items, table cells, etc)


/**
 * Creates a CLI renderer extension for marked
 * @param opts
 */
export function createCliRenderer(opts: CliRendererOptions): MarkedExtension {
  let currentListDepth = 0;
  let currentListItemIndex = 0;

  const walkTokens = async (token: Token) => {
    if (token.type === 'image') {
      if (token.href.startsWith('http')) {
        const body = await got(token.href).buffer();
        token.text = await terminalImage.buffer(body, {width: '50%', height: '50%'});
      } else {
        // todo add terminal image support
        token.text = await terminalImage.file(token.href);
      }
    }
  };

  const renderer: RendererObject = {

    // inline elements

    space(token: Tokens.Space): string {
      return '';
    },

    checkbox(token: Tokens.Checkbox): string {
      return opts.cbStyle(
        token.checked ? opts.cbCheckedChar : opts.cbUncheckedChar
      ) + SEP;
    },

    strong(token: Tokens.Strong): string {
      return opts.strongStyle(autoApply(token));
    },

    em(token: Tokens.Em): string {
      return opts.emStyle(autoApply(token));
    },

    codespan(token: Tokens.Codespan): string {
      return opts.codeStyle(autoApply(token));
    },

    br(): string {
      return EOL;
    },

    del(token: Tokens.Del): string {
      return opts.delStyle(autoApply(token));
    },

    link(token: Tokens.Link): string {
      return terminalLink(autoApply(token), token.href);
    },

    image(token: Tokens.Image): string {
      return token.text;
    },

    text(token: Tokens.Text | Tokens.Escape): string {
      if (token.type !== 'text') {
        return '';
      }
      return replaceTextWithSymbols(autoApply(token));
    },

    // block elements

    code(token: Tokens.Code): string {
      const language = token.lang ?? '';
      const output = highlight(token.text, { language });

      return language
        ? boxen(output, {
          title: language,
          titleAlignment: 'left',
          width: opts.lineLength,
          padding: 1,
          borderColor: 'gray'
        })
        : boxen(output);
    },

    blockquote(token: Tokens.Blockquote): string {
      const text = padLines(autoApply(token));
      // notify('blockquote', text);
      // const { quotePadding, quoteChar, quoteStyle } = opts;
      // const mapper = (line: string) =>
      //   quoteStyle(SEP.repeat(quotePadding) + quoteChar + SEP + line);
      // return block(lines(text.trim(), mapper));
      return text;
    },

    heading(token: Tokens.Heading): string {
      const levelStyle = opts.headingLevels[token.depth - 1];
      return section(levelStyle(autoApply(token)));
    },

    hr(): string {
      return block(SEP + opts.hrStyle(opts.hrChar.repeat(opts.lineLength - 2)) + SEP);
    },

    paragraph(token: Tokens.Paragraph): string {
      return section(hardWrap(autoApply(token), opts.lineLength));
    },

    // compound elements

    html(): string {
      return block(chalk.redBright('HTML not implemented yet'));
    },

    list(token: Tokens.List): string {
      // todo list item can be multi-line because we do text wrap, need to handle that
      // todo if depth if 0, section is also redundant
      currentListDepth++;
      let output = '';
      const items = token.items.map(apply);

      if (token.ordered) {
        // ordered list need a counter
        let start = token.start || 1;
        output = padLines(EOL + items.map(line => line.replace(LI, opts.listStyle(start++ + '.'))).join(EOL));
        // output = padLines(EOL + items.map(i => opts.listStyle(start++) + '.' + SEP + i).join(EOL));
      } else {
        // unordered list/checkboxes
        output = padLines(EOL + items.map(line => line.replace(LI, opts.listStyle(opts.listChar))).join(EOL));
        // output = padLines(EOL + items.map(i => opts.listStyle(opts.listChar) + SEP + i).join(EOL));
      }
      currentListDepth--;
      return section((currentListDepth === 0) ? trimEmptylines(output) : output);
    },

    listitem(token: Tokens.ListItem): string {
      const item = autoApply(token);
      return (isCheckbox(opts, item)) ? item : LI + SEP + item;
    },

    table({ header, rows }: Tokens.Table): string {
      const { lineLength, tableWordWrap: wordWrap } = opts;

      const head = header.map((cell) => cell.text);
      const bodyRows = rows.map((row) => row.map((cell) => cell.text));

      // create table with no columns restrictions
      let table = new Table({ head, wordWrap });
      table.push(...bodyRows);
      const output = table.toString();
      const length = output.search(EOL);
      if (length <= lineLength) {
        return output + EOL;
      }

      // re-create table with normalized columns
      const width = Math.ceil(lineLength / head.length);
      table = new Table({ head, wordWrap, colWidths: head.map(() => width) });
      table.push(...bodyRows);
      return table.toString() + EOL;
    }
  };

  function apply(token: Token) {
    const r = renderer as Renderer;
    // this switch exists since we must have a mapper
    // between token types and renderer methods
    // that unfortunately do not have the same names
    // between a key value mapper and switch case statement
    // I chose switch for better readability and type safety
    switch (token.type) {
      case 'text':
        return r.text(token as Tokens.Text) as string;
      case 'em':
        return r.em(token as Tokens.Em);
      case 'strong':
        return r.strong(token as Tokens.Strong);
      case 'codespan':
        return r.codespan(token as Tokens.Codespan);
      case 'link':
        return r.link(token as Tokens.Link);
      case 'image':
        return r.image(token as Tokens.Image);
      case 'del':
        return r.del(token as Tokens.Del);
      case 'list_item':
        return r.listitem(token as Tokens.ListItem);
      case 'list':
        return r.list(token as Tokens.List);
      case 'heading':
        return r.heading(token as Tokens.Heading);
      case 'code':
        return r.code(token as Tokens.Code);
      case 'checkbox':
        return r.checkbox(token as Tokens.Checkbox);
      case 'paragraph':
        return r.paragraph(token as Tokens.Paragraph);
      case 'blockquote':
        return r.blockquote(token as Tokens.Blockquote);
      case 'space':
        return r.space(token as Tokens.Space);
      default:
        throw new Error('Unsupported token type in apply(): ' + token.type);
    }
  }

  function autoApply(token: Token) {
    // recursively apply tokens
    if ('tokens' in token && Array.isArray(token.tokens)) {
      return token.tokens.map(apply).join('');
    }
    // plain text as fallback
    if ('text' in token && typeof token.text === 'string') {
      return token.text;
    }
    // todo replace with proper error handling
    console.warn(chalk.yellowBright(`[applyTokens] Unsupported token type: ${token.type}`));
    return '';
  }

  return { renderer, walkTokens, async: true };
}


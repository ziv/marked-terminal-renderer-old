# marked-terminal-renderer

## Typographic

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

## Emojis

The renderer supports emojis using `:emoji_name:` syntax.

:smile: :heart: :+1: :tada: :rocket: :100: :fire: :clap: :sparkles:

## Emphasis

Simple text

**This is bold text**

_This is italic text_

~~Strikethrough~~

This is a paragraph with a **bold** word, an _italic_ word, and a ~~strikethrough~~ word.

## Image support

![Markdown Logo](https://markdown-here.com/img/icon256.png)

## Horizontal Rules

---

## Blockquotes

> Blockquotes can also be nested...
>
>> Blockquotes can also be nested...

## Lists

### Unordered list:

- First item
- Second item
- Third item
- Item with too long text that should properly wrap around to the next line and maintain correct indentation.
- Another item

### Ordered list:

1. ordered item A
2. ordered item B
3. ordered item C

### Starting from:

22. Item 22
23. Next item (23)
24. Next item (24)

### Task list:

- [x] Task 1
- [ ] Task 2
- [ ] Task 3

### Nested list:

1. Parent 1
    - Subitem 1a
    - Subitem 1b
2. Parent 2
    1. Subitem 2a
    2. Subitem 2b
        - Subitem 2b1
        - Subitem 2b2
        - Subitem 2b3

## Code

Inline `code` and block of highlighted code:

```typescript
export function inc(counter: number): number {
  return counter++;
}
```

## Tables

| Letter | Number |
|--------|--------|
| A      | 1      |
| B      | 2      |

| Option | Description                                                               |
|--------|---------------------------------------------------------------------------|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

# Long Paragraph

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
Ipsum has been the industry's standard dummy text ever since the 1500s, when an
unknown printer took a galley of type and scrambled it to make a type specimen unknown printer took a galley of type and
scrambled it to make a type specimen
book. It has survived not only five centuries, but also the leap into electronic
typesetting, remaining essentially unchanged. It was popularised in the 1960s
with the release of Letraset sheets containing Lorem Ipsum passages, and more
recently with desktop publishing software like Aldus PageMaker including
versions of Lorem Ipsum. This is [a link to wiki](https://en.wikipedia.org/wiki/Lorem_Ipsum) tp demonstrate links in a
long paragraph.

# Checkboxes

- [ ] Markdown
- [x] Marked-terminal-renderer
- [ ] Terminal Applications

```typescript
export function inc(counter: number): number {
  return counter++;
}
```

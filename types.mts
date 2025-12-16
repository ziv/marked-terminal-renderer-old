import { ChalkInstance } from "chalk";

export interface CliRendererOptions {
  // terminal
  lineLength: number;
  indent: string;
  mode?: "dark" | "light";

  // text
  strongStyle: ChalkInstance;
  emStyle: ChalkInstance;
  delStyle: ChalkInstance;

  // heading
  headingLevels: ChalkInstance[];
  headingStyle: ChalkInstance;

  // code
  codeStyle: ChalkInstance;
  codeInfoStyle: ChalkInstance;

  // block-quote
  quotePadding: number;
  quoteChar: string;
  quoteStyle: ChalkInstance;

  // hr
  hrChar: string;
  hrStyle: ChalkInstance;

  // lists
  listStyle: ChalkInstance;
  listChar: string;

  // checkbox
  cbCheckedChar: string;
  cbUncheckedChar: string;
  cbStyle: ChalkInstance;

  // link
  linkStyle: ChalkInstance;

  // table
  // todo complete options
  tableWordWrap: boolean;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type InfoString = string | undefined;

export type CellFlags = {
  header: boolean;
  align: "center" | "left" | "right" | null;
};

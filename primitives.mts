import chalk from "chalk";
import type { CliRendererOptions } from "./types.mjs";

export const COMMON: Partial<CliRendererOptions> = {
  lineLength: 100,
  indent: "",
  quotePadding: 1,
  quoteChar: "│",
  hrChar: "─",
  listChar: "•",
  cbCheckedChar: "☑",
  cbUncheckedChar: "☐",
  tableWordWrap: true,
  headingStyle: chalk.bold,
  strongStyle: chalk.bold,
  emStyle: chalk.italic,
  delStyle: chalk.strikethrough,
};

export const DARK = {
  ...COMMON,
  mode: "dark",
  headingLevels: [
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
  ],
  codeStyle: chalk.bgBlackBright,
  codeInfoStyle: chalk.bgGray.yellowBright,
  hrStyle: chalk.dim,
  quoteStyle: chalk.dim,
  listStyle: chalk.cyan,
  cbStyle: chalk.cyan,
  linkStyle: chalk.blueBright,
} as CliRendererOptions;

// todo replace colors
export const LIGHT = {
  ...COMMON,
  mode: "dark",
  headingLevels: [
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
  ],
  codeStyle: chalk.bgWhite,
  codeInfoStyle: chalk.bgWhite.black,
  hrStyle: chalk.dim,
  quoteStyle: chalk.dim,
  listStyle: chalk.redBright,
  cbStyle: chalk.redBright,
  linkStyle: chalk.blueBright,
} as CliRendererOptions;

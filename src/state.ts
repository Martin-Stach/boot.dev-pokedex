import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex > ",
});

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
}

export function initState() {
    const rl = readline;
    const commands = getCommands();

    return {rl, commands};
}

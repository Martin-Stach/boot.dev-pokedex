import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex > ",
});

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export function initState() {
  const rl = readline;
  const commands = getCommands();
  const pokeAPI = new PokeAPI();

  return {
    rl,
    commands,
    pokeAPI,
    nextLocationsURL: null,
    prevLocationsURL: null,
  };
}

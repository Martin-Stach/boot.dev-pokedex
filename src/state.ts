import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
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
  pokedex: Record<string, Pokemon>;
};

export function initState(cacheInterval: number) {
  const rl = readline;
  const commands = getCommands();
  const pokeAPI = new PokeAPI(cacheInterval);

  return {
    rl,
    commands,
    pokeAPI,
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };
}

import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMapBack, commandMapForward } from "./command_map.js";
import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Help for pokedex",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the next 20 locations",
      callback: commandMapForward,
    },
    mapb: {
      name: "map",
      description: "Displays the previous 20 locations",
      callback: commandMapBack,
    },
    explore: {
      name: "explore <location_name>",
      description: "Find all Pokémons in a given area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Catches given pokemon",
      callback: commandCatch,
    }
  };
}

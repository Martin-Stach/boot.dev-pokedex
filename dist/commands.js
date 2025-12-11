import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapBack, commandMapForward } from "./command_map.js";
export function getCommands() {
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
    };
}

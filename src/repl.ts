import { getCommands } from "./commands.js";
import type { State } from "./state.js";

export function startREPL(state: State) {
  console.log("Starting REPL");
  state.rl.prompt();

  state.rl.on("line", async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const args = words.slice(1);
    const commands = getCommands();
    const cmd = commands[commandName];
    
    if (!cmd) {
      console.log("Unknown command");
    } else {
      try {
        await cmd.callback(state, ...args);
      } catch (error) {
        console.log("Error running command:", error);
      }
    }
    
    state.rl.prompt();
  });
}


export function cleanInput(input: string): string[] {
  const split = input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
  const result = [];
  for (const word of split) {
    result.push(word.trim());
  }
  return result;
}


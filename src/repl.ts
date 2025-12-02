import { createInterface } from "readline";
import { getCommands } from "./commands.js";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex > ",
});

export function startREPL() {
  console.log("Starting REPL");
  readline.prompt();
  readline.on("line", (input) => {

    const words = cleanInput(input);
    if (words.length === 0) {
      readline.prompt();
      return;
    }

    const commandName = words[0];
    const commands = getCommands();
    const cmd = commands[commandName];
    
    if (!cmd) {
      console.log("Unknown command");
    } else {
      cmd.callback(commands);
    }
    readline.prompt();
  });
}


export function cleanInput(input: string): string[] {
  let split = input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word != "");
  let result = [];
  for (const word of split) {
    result.push(word.trim());
  }
  return result;
}


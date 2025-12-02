import { createInterface } from "readline";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex > ",
});

export function startREPL() {
  console.log("Starting REPL");
  readline.prompt();
  readline.on("line", (input) => {
    let clean = cleanInput(input);
    if (clean.length === 0) {
      readline.prompt();
      return;
    } else {
      console.log(`Your command was: ${clean[0]}`);
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


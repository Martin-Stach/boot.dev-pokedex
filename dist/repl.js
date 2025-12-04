import { getCommands } from "./commands.js";
export function startREPL(state) {
    console.log("Starting REPL");
    state.rl.prompt();
    state.rl.on("line", (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.rl.prompt();
            return;
        }
        const commandName = words[0];
        const commands = getCommands();
        const cmd = commands[commandName];
        if (!cmd) {
            console.log("Unknown command");
        }
        else {
            cmd.callback(state);
        }
        state.rl.prompt();
    });
}
export function cleanInput(input) {
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

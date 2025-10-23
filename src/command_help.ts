import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
console.log("\nWelcome to the Pokedex!");
console.log("\nUsage: \n");

for(const command of Object.values(state.commands)){
    console.log(`${command.name}: ${command.description}`);
}
console.log("");
}
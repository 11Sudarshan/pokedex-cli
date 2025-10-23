import { State } from "./state.js";

export async function commandExit(state: State): Promise<void> {
    console.log("Closing the Pokedex... Goodbye!");

    state.cache.stopReapLoop();
    process.exit(0);
};
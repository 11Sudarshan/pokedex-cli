import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {

    const pokedexEntries = Object.values(state.pokedex);

    if(pokedexEntries.length === 0){
        console.log("Your Pokedex is empty. Catch some Pokemon!");
        return;
    }

    console.log("Your Pokedex:");
    for(const pokemon of pokedexEntries){
        console.log(`- ${pokemon.name}`);
    }
}
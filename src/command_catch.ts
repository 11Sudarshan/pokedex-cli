import { diff } from "util";
import { Pokemon } from "./pokeapi";
import { State } from "./state.js";


export async function commandCatch(state: State, ...args: string[]): Promise<void>  {

    if(args.length === 0){
        console.log("Please provide a pokemon name to catch.");
        console.log("Usage: catch <pokemon name>");
        return;
    }

    const pokemonName = args[0];

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    try{
        const data = await state.pokeapi.fetchPokemon(pokemonName);


        const difficulty = data.base_experience;
        const roll = Math.floor(Math.random() * difficulty);
        
        const threshold = 50;

        if(roll < threshold){
            console.log(`${pokemonName} was caught!`);
            console.log("You may now inspect it with the inspect command.");
            state.pokedex[pokemonName] = data;
        }else{
            console.log(`${pokemonName} escaped!`);
        }


    }catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred.");
    }
}
    
}
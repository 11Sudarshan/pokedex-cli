import { stat } from "fs";
import { State } from "./state.js";

export async function commandMapb(state: State): Promise<void>{

    if(!state.previousLocationsURL){
        console.log("you're on the first page");
    }

    console.log("Fetching previous 20 location...");

    try{
        const data = await state.pokeapi.fetchLocations(state.previousLocationsURL);

        state.nextLocationsURL = data.next;
        state.previousLocationsURL = data.previous;

        for(const location of data.results){
            console.log(location.name);
        }
    }catch(error){
        throw new Error(`Error fetching locations: ${error}`);
    }
}
import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    console.log("Fetching next 20 locations...");

    try{
        const data = await state.pokeapi.fetchLocations(state.nextLocationsURL);

        state.nextLocationsURL = data.next;
        state.previousLocationsURL = data.previous;

        for(const location of data.results){
            console.log(location.name);
        }

    }catch(error){
        throw new Error(`Error fetching locations: ${error}`);
    }
}
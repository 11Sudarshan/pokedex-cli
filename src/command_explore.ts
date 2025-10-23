import { State } from "./state.js";


export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    if(args.length === 0){
        console.log("Please provide a location area name.");
        console.log("Usage: explore <Location area name>");
        return;
    }

    const locationName = args[0];

    console.log(`Exploring: ${locationName}...`);

    try{
        const data = await state.pokeapi.fetchLocation(locationName);

        if(data.pokemon_encounters.length === 0){
            console.log(`No pokemon encounters found in location area: ${locationName}`);
            return;
        }
        console.log(`Found Pokemon:`);
        for(const encounter of data.pokemon_encounters){
            console.log(`- ${encounter.pokemon.name}`);
        }


    }catch(error){
        if(error instanceof Error){
            console.error(`Error fetching location '${locationName}': ${error.message}`);
        }else {
            console.error(`Unknown error fetching location '${locationName}':`, error);
        }
    }
}
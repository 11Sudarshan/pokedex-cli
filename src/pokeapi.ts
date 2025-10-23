
import { Cache } from "./pokecache";

export type ShallowLocations = {
  count : number;
  next : string | null;
  previous : string | null;
  results : {
    name: string;
    url: string;
  }[];
};

export type Location = {
    id: number;
  name: string;

  pokemon_encounters: {
    pokemon: {
        name: string;
        url: string;
    };
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  // Add the stats array
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  // Add the types array
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private readonly cache: Cache;

  constructor(cache: Cache) {
    this.cache = cache;
  }

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;

    const cacheData = this.cache.get<ShallowLocations>(url);
    if(cacheData){
        return cacheData
    }


    const res =  await fetch(url);

    if(!res.ok){
        throw new Error(`Failed to fetch locations: ${res.status}`);
    }
    const data = await res.json() as ShallowLocations;
    this.cache.add<ShallowLocations>(url, data);

    return data 
    
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cacheData = this.cache.get<Location>(url);

    if(cacheData){
        return cacheData
    }

    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`Failed to fetch location ${locationName}: ${res.status}`);
    }

    const data = await res.json() as Location;
    this.cache.add<Location>(url,data);
    return data;

  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {

    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cacheData = this.cache.get<Pokemon>(url);

    if(cacheData){
        return cacheData;
    }

    const res = await fetch(url);

     if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`Pokemon "${pokemonName}" not found.`);
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = (await res.json()) as Pokemon;

  
    this.cache.add(url, data);
    return data;
  }


}






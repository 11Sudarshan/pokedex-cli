import  * as readline from 'readline';
import type { Interface } from 'readline';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap } from './command_map.js';
import { commandMapb } from './command_mapb.js';
import { commandExplore } from './command_explore.js';
import { commandCatch } from './command_catch.js';
import { commandInspect } from './command_inspect.js';
import { commandPokedex } from './command_pokedex.js';
import { PokeAPI, Pokemon } from './pokeapi.js';
import { Cache } from './pokecache.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => void;
};

export type State = {
  readonly readline: Interface;
  readonly commands: Record<string, CLICommand>; 
  readonly pokeapi : PokeAPI;
  readonly cache: Cache;
  nextLocationsURL: string | null;
  previousLocationsURL: string | null;

  pokedex: Record<string, Pokemon>;
};

export function getCommands(): Record<string, CLICommand>{
    return {
        help:{
            name: "help",
            description: "Displays help message",
            callback: commandHelp
        },
        exit:{
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit
        },
        map: {
            name: "map",
            description: "Displays the next 20 locations",
            callback: commandMap
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 locations",
            callback: commandMapb
        },
        explore: {
            name: "explore",
            description: "List of the pokemon in the given location area",
            callback: commandExplore
        },
        catch: {
            name: "catch",
            description: "Catches a pokemon by name",
            callback: commandCatch
        },
        inspect: {
            name: "inspect",
            description: "View details about a caught Pokemon",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "View all the Pokemon you have caught",
            callback: commandPokedex,
        },

    };
}

export function initState(): State {
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex> ",
});

const commands = getCommands(); 
const cache = new Cache(6000)
const pokeapi = new PokeAPI(cache);

return {
    readline: rl,
    commands: commands,
    pokeapi: pokeapi,
    cache: cache,
    nextLocationsURL: null,
    previousLocationsURL: null,

    pokedex: {},
};
}
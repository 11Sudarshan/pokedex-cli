import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
  // Check if the argument was provided
  if (args.length === 0) {
    console.log("Error: You must provide a Pokemon name.");
    console.log("Usage: inspect <pokemon_name>");
    return;
  }

  const pokemonName = args[0];

  // Look for the Pokemon in the user's Pokedex
  const pokemon = state.pokedex[pokemonName];

  if (!pokemon) {
    // Pokemon not found in Pokedex
    console.log("you have not caught that pokemon");
    return;
  }

  // Pokemon was found, print its details
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  
  console.log("Stats:");
  for (const stat of pokemon.stats) {
    console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
  }

  console.log("Types:");
  for (const typeInfo of pokemon.types) {
    console.log(`  - ${typeInfo.type.name}`);
  }
}
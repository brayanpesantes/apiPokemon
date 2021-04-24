import { pokemonApi } from "../api/PokemonApi";
import {
  FechAllPokemonResponse,
  SmallPokemon,
  Pokemon,
} from "../interfaces/fechallPokemonResponse";

export const fechAllPokemons = async (): Promise<Pokemon[]> => {
  const resp = await pokemonApi.get<FechAllPokemonResponse>(
    "/pokemon?limit=1500"
  );
  const smallPokemonList = resp.data.results;
  return transformSmallPokemonIntoPokemon(smallPokemonList);
};

const transformSmallPokemonIntoPokemon = (
  smallPokemonList: SmallPokemon[]
): Pokemon[] => {
  const pokemonArr: Pokemon[] = smallPokemonList.map((poke) => {
    const pokeArre = poke.url.split("/");
    const id = pokeArre[6];
    const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return {
      id,
      pic,
      name: poke.name,
    };
  });
  
  return pokemonArr;
};

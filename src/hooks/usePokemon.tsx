import { useEffect, useState } from 'react'
import { fechAllPokemons } from '../helpers/fechAllPokemons'
import { Pokemon } from '../interfaces/fechallPokemonResponse'

export const usePokemon = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [pokemons, setpokemons] = useState<Pokemon[]>([])
    
    useEffect(() => {
        fechAllPokemons().then(pokemons =>{
            setIsLoading(false)
            setpokemons(pokemons)
        })
    }, [])
    return{
        isLoading,
        pokemons
    }
}

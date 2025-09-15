import { useState, useEffect } from "react";
import { getPokedexNumber } from "../utils";

export function PokeCard(props) {
    const { selectedPokemon } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        // if loading, exit logic
        if (loading || !localStorage) return;

        // check if selectedPokemon is in cache
        // 1. define cache
        let cache = {};
        if (localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokedex'));
        }
        // 2. check if in cache
        if (selectedPokemon in cache) {
            setData(cache[selectedPokemon]);
            return;
        } 
        // 3. if not, fetch from API and store in cache
        async function fetchPokemonData() {
            setLoading(true);
            try {
                const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
                const res = await fetch(baseUrl + getPokedexNumber(selectedPokemon));
                const pokemonData = await res.json();
                setData(pokemonData);
                console.log(pokemonData);
                cache[selectedPokemon] = pokemonData;
                localStorage.setItem('pokedex',JSON.stringify(cache));
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            } finally {
                setLoading(false);
            }
        }
         
        fetchPokemonData();

    }, [selectedPokemon]);

    return (
        <div className="poke-card"></div>
    )
}
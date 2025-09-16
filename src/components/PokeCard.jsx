import { useState, useEffect } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";

export default function PokeCard(props) {
    const { selectedPokemon } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const { name, height, abilities, stats, types, moves, sprites } = data || {};

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) return false;
        if (['versions', 'other'].includes(val)) return false;
        return true;
    })

    useEffect(() => {
        // if loading, exit logic
        if (loading || !localStorage) return;

        // check if selectedPokemon is in cache
        // 1. define cache
        let cache = {};
        if (localStorage.getItem('pokedex')) {
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
                localStorage.setItem('pokedex', JSON.stringify(cache));
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemonData();

    }, [selectedPokemon]);

    if (loading || !data) {
        return (
            <div className="poke-card"> Loading...</div>
        )
    }
    return (
        <div className="poke-card">
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex) => {
                    return (
                       <TypeCard key={typeIndex} type={typeObj?.type?.name} /> 
                    )
                })}
            </div>
            <img className="'default-img" src={'/pokemon/' + 
                getFullPokedexNumber(selectedPokemon) + '.png'} alt={`${name}-large-img`} />
            <div className="img-container">
                {imgList.map((spriteUrl, spriteIndex) => {
                    const imgUrl = sprites[spriteUrl];
                    return (
                        <img key={spriteIndex} src={imgUrl} alt={`${name}-${spriteUrl}-img`} />
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {stats.map((statObj, statIndex) => {
                    const {stat, base_stat} = statObj;
                    return (
                        <div key={statIndex} className="stat-item">
                            <p>{stat?.name.replaceAll("-", " ")}</p>
                            <p>{base_stat}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
import { useState, useEffect } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";
import Modal from "./Modal";

export default function PokeCard(props) {
    const { selectedPokemon } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [skill, setSkill] = useState(null);
    const [loadingSkill, setLoadingSkill] = useState(false);

    const { name, height, abilities, stats, types, moves, sprites } = data || {};

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) return false;
        if (['versions', 'other'].includes(val)) return false;
        return true;
    })

    async function fetchMoveData(move, moveUrl) {
        if (loadingSkill || !localStorage || !moveUrl) return;

        // check if move is in cache
        let cache = {};
        if (localStorage.getItem('pokemon-moves')) {
            cache = JSON.parse(localStorage.getItem('pokemon-moves'));
        }

        if (move in cache) {
            setSkill(cache[move]);
            console.log('Found move in cache: ', cache[move]);
            return;
        }

        try {
            setLoadingSkill(true);
            const res = await fetch(moveUrl);
            const moveData = await res.json();
            console.log('Fetched move from API: ', moveData);
            const description = moveData?.flavor_text_entries?.filter
            (
                val => {
                    return val.version_group.name = 'firered-leafgreen' && val.language.name === 'en'
                }
            )[0]?.flavor_text || 'No description found';

            const skillData = {
                name: move,
                description
            }
            setSkill(skillData);
            cache[move] = skillData;
            localStorage.setItem('pokemon-moves', JSON.stringify(cache));
        } catch (error) {

        } finally {

        }
    }

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
            console.log('Found pokemon in cache: ', cache[selectedPokemon]);

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
                console.log('Fetched pokemon from API: ', pokemonData);
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
            {skill && (
                <Modal handleCloseModal={() => { }}>
                    <div>
                        <h6>Name</h6>
                        <h2 className="skill-name">{skill.name.replaceAll('-',' ')}</h2>
                    </div>
                    <div>
                        <h6>Descriptions</h6>
                        <h6>{skill.description}</h6>
                    </div>
                </Modal>
            )}
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
                    const { stat, base_stat } = statObj;
                    return (
                        <div key={statIndex} className="stat-item">
                            <p>{stat?.name.replaceAll("-", " ")}</p>
                            <p>{base_stat}</p>
                        </div>
                    )
                })}
            </div>
            <div className="pokemon-move-grid">
                {moves.map((moveObj, moveIndex) => {
                    return (
                        <button className="button-card pokemon-move" key={moveIndex} onClick={() => {
                            fetchMoveData(moveObj?.move?.name, moveObj?.move?.url)
                         }}>
                            <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
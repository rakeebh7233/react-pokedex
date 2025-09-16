import { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(props) {
    const { selectedPokemon, setSelectedPokemon, closeNav, showNav } = props;

    const [searchValue, setSearchValue] = useState("");

    const filteredPokemon = first151Pokemon.filter((ele, index) => {
        // if  pokedex number or name matches search value
        return ele.toLowerCase().includes(searchValue) || getFullPokedexNumber(index).includes(searchValue);
    })

    return (
        <nav className={(!showNav ? ' open' : '')}>
            <div className={"header" + (!showNav ? ' open' : '')}>
                <button onClick={closeNav} className="open-nav-button">
                <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                </button>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input placeholder="E.g. 001 or Bulba..." value={searchValue} onChange={
                (e) => setSearchValue(e.target.value.toLowerCase())
            }/>
            {filteredPokemon.map((pokemon, pokemonIndex) => {
                const trueIndex = first151Pokemon.indexOf(pokemon);
                return (
                    <button onClick={() => {
                        setSelectedPokemon(trueIndex)
                        closeNav();
                    }} key={pokemonIndex} className={"nav-card" + (pokemonIndex === selectedPokemon ? " nav-card-selected" : "")} >
                        <p>{getFullPokedexNumber(trueIndex)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}
// 
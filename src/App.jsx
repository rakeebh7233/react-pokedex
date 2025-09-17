import Header from "./components/Header";
import PokeCard from "./components/PokeCard";
import SideNav from "./components/SideNav";

import { useState } from "react";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showNav, setShowNav] = useState(false);

  function toggleNav() {
    setShowNav(!showNav);
  }

  function closeNav() {
    setShowNav(false);
  }

  return (
    <>
      <Header toggleNav={toggleNav} />
      <SideNav
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        closeNav={closeNav} 
        showNav = {showNav} />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  )
}

export default App
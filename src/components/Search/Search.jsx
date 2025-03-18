import React, { useState } from "react";

function Search() {
  const [pokemon, setPokemon] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [clearError, setClearError] = useState(null);

  const handleInput = (e) => setInput(e.target.value);

  const getMon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Mon not found");
        } else if (input === "") {
          setClearError(null);
          throw new Error("Please enter a Mon")
        }
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setError(null)
        setClearError(null);
      })
      .catch((err) => {
        setPokemon(null);
        setError(err.message);
      });
  };

  const clearMon = () => {
    if (pokemon === null) {
      setClearError("no Mon to clear");
    }
    setPokemon(null);
    setInput("");
    setError(null);
  };

  return (
    <div>
      <input
        data-testid="cypress-input"
        type="text"
        value={input}
        onKeyDown={(e) => (e.key === "Enter" ? getMon() : null)}
        onChange={handleInput}
      />
      <button data-testid="cypress-catch" onClick={getMon}>
        Catch!
      </button>
      <button data-testid="cypress-clear" onClick={clearMon}>
        Clear
      </button>
      {error && <h2 data-testid="cypress-fetch-error">{error}</h2>}
      {clearError && <h2 data-testid="cypress-clear-error">{clearError}</h2>}
      {pokemon && (
        <div>
          <h2 data-testid="cypress-name">{pokemon.name}</h2>
          <img data-testid="cypress-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p data-testid="cypress-height">Height: {pokemon.height}</p>
          <p data-testid="cypress-weight">Weight: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
}

export default Search;
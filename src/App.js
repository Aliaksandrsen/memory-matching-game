import React, { useState, useEffect } from "react";
import shuffle from "lodash.shuffle";

import "./App.css";

const pokemon = [
  { id: 4, name: "charizard" },
  { id: 10, name: "caterpie" },
  { id: 77, name: "ponyta" },
  { id: 108, name: "lickitung" },
  { id: 132, name: "ditto" },
  { id: 133, name: "eevee" },
];
const doublePokemon = shuffle([...pokemon, ...pokemon]);

const App = () => {
  return (
    <div className="app">
      <div className="cards">
        {doublePokemon.map((pokemon, index) => {
          return <PokemonCard key={index} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
};

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card flipped">
      <div className="inner">
        <div className="front">
          <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            width="100"
          />
        </div>
        <div className="back">?</div>
      </div>
    </div>
  );
};

export default App;

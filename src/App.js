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
  const [opened, setOpened] = useState([]);

  // clear cards after 2 have been selected
  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 1000);
  }, [opened]);

  const flipCard = (index) => {
    if (opened.length === 2) {
      setOpened([]);
    }
    setOpened((opened) => [...opened, index]);
  };

  return (
    <div className="app">
      <div className="cards">
        {doublePokemon.map((pokemon, index) => {
          let isFlipped = false;

          if (opened.includes(index)) isFlipped = true;

          return (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              isFlipped={isFlipped}
              flipCard={flipCard}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

const PokemonCard = ({ index, pokemon, isFlipped, flipCard }) => {
  return (
    <button
      className={`pokemon-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => flipCard(index)}
    >
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
    </button>
  );
};

export default App;

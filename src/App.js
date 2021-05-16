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
  const [opened, setOpened] = useState([]); // using index
  const [matched, setMatched] = useState([]); // pokemon.id
  const [moves, setMoves] = useState(0);

  // check if there a match
  // if there are 2 in the opened array, check if they match
  useEffect(() => {
    if (opened.length < 2) return;

    const firstPokemon = doublePokemon[opened[0]];
    const secondPokemon = doublePokemon[opened[1]];

    if (firstPokemon.name === secondPokemon.name) {
      setMatched((matched) => [...matched, firstPokemon.id]);
    }
  }, [opened]);

  // clear cards after 2 have been selected
  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 1000);
  }, [opened]);

  // check if there is a winner
  useEffect(() => {
    if (matched.length === pokemon.length) {
      alert("You won!");
    }
  }, [matched]);

  const flipCard = (index) => {
    // if same card was clicked
    if (opened.includes(index)) return;

    setMoves((moves) => moves + 1);
    setOpened((opened) => [...opened, index]);
  };

  return (
    <div className="app">
      <p>
        {moves} <strong>moves</strong>
      </p>
      <div className="cards">
        {doublePokemon.map((pokemon, index) => {
          let isFlipped = false;

          if (opened.includes(index)) isFlipped = true;
          if (matched.includes(pokemon.id)) isFlipped = true;

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

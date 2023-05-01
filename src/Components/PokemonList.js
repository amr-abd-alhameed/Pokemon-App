import React from "react";
const PokemonList = ({ pokemon }) => {
  return (
    <>
      {pokemon.map((p) => (
        <div key={p}>{p}</div>
      ))}
    </>
  );
};

export default PokemonList;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
}

function DetailView() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [id]);

  if (!pokemon) 
    return <p>Loading...</p>;

  let nextId = Number(id) + 1;
  let prevId = Number(id) - 1;

  if (prevId <= 0) {
    prevId = 251;
    }

  return (
    <div className = "pokemon-info">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <div className="pokemon-details">
        <p>ID: {pokemon.id}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
      </div>
      <div className="detail-nav" >
        <Link to={`/pokemon/${prevId}`}>Previous</Link> |{" "}
        <Link to={`/pokemon/${nextId}`}>Next</Link>
      </div>
    </div>
  );
}

export default DetailView;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonStats {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

function GalleryView() {
  const [pokemonList, setPokemonList] = useState<PokemonStats[]>([]);
  const [selectedType, setSelectedType] = useState("all");

useEffect(() => {
    //get list of pokemon present
    fetch("https://pokeapi.co/api/v2/pokemon?limit=250")
      .then((res) => res.json())
      .then((data) => {
        const urls = data.results.map((p: Pokemon) => p.url);

        // grt the details for each Pokémon
        Promise.all(urls.map((url: string) => fetch(url).then((r) => r.json())))
          .then((details) => setPokemonList(details));
      });
  }, []);

  // filter by type, either being grass or psychic
const filtered = pokemonList.filter((p) => {
    if (selectedType === "all") {
        return true;
    }
    return p.types.some((t) => t.type.name === selectedType);
  });


  return (
    <div>
      <h2>Gallery View</h2>

      <div>
        <button onClick={() => setSelectedType("all")}>All</button>
        <button onClick={() => setSelectedType("grass")}>Grass</button>
        <button onClick={() => setSelectedType("psychic")}>Psychic</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filtered.map((p) => (
          <Link key={p.id} to={`/pokemon/${p.id}`} style={{ margin: "10px" }}>
            <img src={p.sprites.front_default} alt={p.name} />
            <div>{p.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GalleryView;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Pokemon {
  name: string;
  url: string;
}

function ListView() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=250")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
  }, []);

  // filter the pokemons by what the user enters 
  const filtered = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // sort based on ascending or descending of id or name
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else {
      let idA = parseInt(a.url.split("/")[6]);
      let idB = parseInt(b.url.split("/")[6]);

      if (order === "asc") {
        return idA - idB;
      } else {
        return idB - idA;
      }
    }
  });

  return (
    <div>
      <h2>List View</h2>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="id">ID</option>
        </select>

        <label style={{ marginLeft: "10px" }}>Order: </label>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul>
        {sorted.map((p, i) => {
          const id = parseInt(p.url.split("/")[6]);
          return (
            <li key={i}>
              <Link to={`/pokemon/${id}`}>{p.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListView;

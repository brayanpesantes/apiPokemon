import React, { useState, ChangeEvent } from "react";
import { Loading } from "../components/Loading";
import { usePokemon } from "../hooks/usePokemon";
import { Pokemon } from "../interfaces/fechallPokemonResponse";

export const HomePage = () => {
  const { isLoading, pokemons } = usePokemon();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const filteredPokemons = (): Pokemon[] => {
    if (search.length === 0)
      return pokemons.slice(currentPage, currentPage + 5);
    const filtered = pokemons.filter((poke) => poke.name.includes(search));
    return filtered.slice(currentPage, currentPage + 5);
  };

  const nextPage = () => {
    if (
      pokemons.filter((poke) => poke.name.includes(search)).length >
      currentPage + 5
    )
      setCurrentPage(currentPage + 5);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 5);
  };
  const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };
  return (
    <div className="mt-5 container">
      <h1>Listado de pokemos</h1>
      <hr />
      <input
        type="text"
        className="mb-5 form-control"
        placeholder="Buscar pokemons"
        value={search}
        onChange={onSearchChange}
      />
      <button
        className="btn btn-primary"
        onClick={prevPage}
        disabled={currentPage > 1 ? false : true}
      >
        Anterior
      </button>
      &nbsp;
      <button
        className="btn btn-primary"
        onClick={nextPage}
        disabled={
          pokemons.filter((poke) => poke.name.includes(search)).length >
          currentPage + 5
            ? false
            : true
        }
      >
        Siguiente
      </button>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 100 }}>ID</th>
            <th style={{ width: 150 }}>Nombre</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemons().map(({ id, name, pic }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>
                <img src={pic} alt={name} style={{ width: 75 }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <Loading />}
    </div>
  );
};

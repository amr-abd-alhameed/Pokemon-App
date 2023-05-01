import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "./Components/PokemonList";
import Pagination from "./Components/Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  useEffect(() => {
    let cancel;
    axios
      .get(current, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((response) => {
        setPokemon(response.data.results.map((p) => p.name));
        setLoading(false);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    return () => {
      cancel();
    };
  }, [current]);
  if (loading) return "lading...";
  function setNextUrl() {
    setCurrent(nextPage);
  }
  function setPrevtUrl() {
    setCurrent(prevPage);
  }
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        setNextUrl={setNextUrl ? setNextUrl : null}
        setPrevtUrl={setPrevtUrl ? setPrevtUrl : null}
      />
    </>
  );
}

export default App;

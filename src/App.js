import React, { useEffect, useState } from "react";
import "./App.css";
import MovieView from "./MovieView";
import MovieList from "./MovieList";
function App() {
  const [movie, setMovie] = useState();
  const [searchinput, setSearchinput] = useState("");
  const [viewmovie, setViewmovie] = useState();
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_KEY}`
    )
      .then((r) => r.json())
      .then((r) => {
        setMovie(r.results);
        setViewmovie(r.results[0]);
      });
  }, []);
  function Search() {
    fetch(`
    https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&query=${searchinput}&page=1&include_adult=false`)
      .then((r) => r.json())
      .then((r) => {
        setMovie(r.results);
        setViewmovie(r.results[0]);
      });
  }
  return (
    <div style={{color: 'white'}}>
      <header style={{display: 'flex'}}>
        <h2 style={{flex: 1,marginLeft:"20px"}}>MovieList </h2>
        <div style={{ flex:3}}>
        <input
          type="text"
          className="search"
          value={searchinput}
          onChange={(e) => setSearchinput(e.target.value)}
        />
        <button onClick={() => Search()}>Search</button></div>
      </header>
      <div className="container">
        <section>
         { viewmovie ? <MovieList movie={movie} view={setViewmovie} /> : <h3>No Movies</h3>}
        </section>
        <aside>
        {viewmovie ?  <MovieView view={viewmovie} /> : <h3>No Movie</h3>}
        </aside>
      </div>
    </div>
  );
}

export default App;

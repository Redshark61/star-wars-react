import React from "react";
import { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(false);
		setMovies([]);
		fetch("https://swapi.dev/api/films")
			.then((res) => res.json())
			.catch(() => {
				setError(true);
				setIsLoading(false);
			})
			.then((json) => {
				setMovies(json.results);
				setIsLoading(false);
			});
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	return (
		<>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{!error && !isLoading && movies.length > 0 && <MoviesList movies={movies} />}
				{!error && isLoading && <h3>Chargement...</h3>}
				{!error && !isLoading && !movies.length && <h3>Nothing to display</h3>}
				{error && <h3>Error</h3>}
			</section>
		</>
	);
}

export default App;

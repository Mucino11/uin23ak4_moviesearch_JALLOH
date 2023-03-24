import React, { useState, useEffect } from 'react';

function MovieList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://www.omdbapi.com/?s=james+bond&type=movie&apikey=30280810&plot=short');
      const result = await response.json();
      setData(result.Search);
    };

    fetchMovies();
  }, []);

  if (data && data.length > 0) {
    return (
      <div className='movie-list'>
        {data.slice(0, 10).map(movie => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        No search found.
      </div>
    );
  }
}

export default MovieList;

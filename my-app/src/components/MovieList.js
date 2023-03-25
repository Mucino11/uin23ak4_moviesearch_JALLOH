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
      <div className='movie-container'>
        {data.slice(0, 10).map(movie => (
          <div className='movie' key={movie.imdbID}>
            <h3 className='title'>{movie.Title}</h3>
            <p className='year'>{movie.Year}</p>
            <img className="poster" src={movie.Poster === "N/A" ? "https://via.placeholder.com/150x225.png?text=No+Poster+Available" : movie.Poster} alt={movie.Title}  />
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

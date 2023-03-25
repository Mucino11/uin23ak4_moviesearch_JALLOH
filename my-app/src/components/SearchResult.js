import React, { useState, useEffect } from 'react';

function SearchResult({ onSearchResult }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=30280810&plot=short`);
      const result = await response.json();
      setData(result.Search || []);
      onSearchResult(result.Search && result.Search.length > 0);
    };

    if (searchTerm.length > 2) {
      fetchMovies();
    }
  }, [searchTerm, onSearchResult]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input className="search_bar" type="text" placeholder="Enter a movie title...." value={searchTerm} onChange={handleInputChange} />
      {data && data.length > 0 ? (
        <div className='movie-container'>
          <h2 className='search-result'>Results for {searchTerm}</h2>
          {data.map(movie => (
            <div className='movie' key={movie.imdbID}>
              <h3 className='title'>{movie.Title}</h3>
              <p className='year'>{movie.Year}</p>
              <p className='genre'>{movie.Genre}</p>
              <p className='director'>{movie.Director}</p>
              <p className='actors'>{movie.Actors}</p>
              <p className='awards'>{movie.Awards}</p>
              <img className='poster' src={movie.Poster} alt={movie.Title} />
            </div>
          ))}
        </div>
      ) : (
        <p>{data.length === 0 && "No result found."}</p>
      )}
    </div>
  );
}

export default SearchResult;

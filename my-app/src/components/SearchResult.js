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
      
      <input type="text" placeholder="Enter a movie title...." value={searchTerm} onChange={handleInputChange} className="Search_bar"/>
      {data && data.length > 0 ? (
        <div className='movie-list'>
          <h2>{searchTerm}</h2>
          {data.map(movie => (
            <div key={movie.imdbID} className="movies">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <p>{movie.Genre}</p>
              <p>{movie.Director}</p>
              <p>{movie.Actors}</p>
              <p>{movie.Awards}</p>
              <img src={movie.Poster} alt={movie.Title}  />
            </div>
          ))}
        </div>
      ) : (
        <p>{null}</p>
      )}
    </div>
  );
}

export default SearchResult;

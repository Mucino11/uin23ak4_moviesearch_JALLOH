import React, { useState } from 'react';
import './css/main.css';
import Header from './components/Header';
import SearchResult from './components/SearchResult';
import MovieList from './components/MovieList';

function App() {
  const [showMovieList, setShowMovieList] = useState(true);

  const handleSearchResult = (hasResult) => {
    setShowMovieList(!hasResult);
  };

  return (
    <div>
      <Header />
      <SearchResult onSearchResult={handleSearchResult} />
      {showMovieList && <MovieList />}
     
     
    </div>
  );
}

export default App;



  





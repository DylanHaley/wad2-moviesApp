import React, { useContext } from "react";
import MoviesListPageTemplate from '../components/templateMovieListPage'
import {MoviesContext} from '../contexts/moviesContext'
import AddToFavoritesButton from '../components/buttons/addToFavorites'

const NowPlayingMovies = () => {
  const context = useContext(MoviesContext);
  const nowPlayingMovies = context.nowplaying.filter((m) => {  
    return !("favorite" in m);
  });

  return (
    <MoviesListPageTemplate
      title="Now Playing"
      movies={nowPlayingMovies} 
      action={(movie) => {
        return <AddToFavoritesButton movie={movie} />;
      }}
    />
  );
};

export default NowPlayingMovies;
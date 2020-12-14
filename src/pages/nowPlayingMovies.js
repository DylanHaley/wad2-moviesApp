import React, {useContext} from "react";
import MoviesListPageTemplate from "../components/templateMovieListPage";
import {MoviesContext} from '../contexts/moviesContext'

const NowPlayingMovies = () => {
    const context = useContext(MoviesContext);
    const nowPlayingMovies = context.nowplaying.filter( (m) => {
        return !("watchlist" in m);
    });
    return (
      <MoviesListPageTemplate
        title={"Now Playing Movies"}
        movies={nowPlayingMovies}
        action={(movie) => {
            return ;
        }}
      />
    );
  };
  
  export default NowPlayingMovies;
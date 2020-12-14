import React, {useContext} from "react";
import MoviesListPageTemplate from "../components/templateMovieListPage";
import {MoviesContext} from '../contexts/moviesContext'

const LatestMovies = () => {
    const context = useContext(MoviesContext);
    const latestMovies = context.latest.filter( (m) => {
        return !("watchlist" in m);
    });
    return (
      <MoviesListPageTemplate
        title={"Latest Movies"}
        movies={latestMovies}
        action={(movie) => {
            return ;
        }}
      />
    );
  };
  
  export default LatestMovies;
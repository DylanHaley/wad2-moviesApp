import React, { useEffect, createContext, useReducer } from "react";
import { getMovies, getUpcomingMovies, getNowPlayingMovies, getLatestMovies } from "../api/tmdb-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: true } : m
        ),
        upcoming: [...state.upcoming],
        nowplaying: [...state.nowplaying],
        latest: [...state.latest]
      };
      case "load":
      return { movies: action.payload.movies, upcoming: [...state.upcoming], nowplaying: [...state.nowplaying], latest: [...state.latest] };
    case "load-upcoming":
      return { upcoming: action.payload.movies, movies: [...state.movies], nowplaying: [...state.nowplaying], latest: [...state.latest] };
    case "load-nowplaying":
      return { nowplaying: action.payload.movies, movies: [...state.movies], upcoming:[...state.upcoming], latest: [...state.latest] };
    case "load-latest":
      return {latest: action.payload.movies, movies: [...state.movies], nowplaying: [...state.nowplaying], upcoming:[...state.upcoming] }
    case "add-review":
        return {
            movies: state.movies.map((m) =>
              m.id === action.payload.movie.id
                ? { ...m, review: action.payload.review }
                : m
            ),
          };
      break;
    default:
      return state;
  }
};

const MoviesContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { movies: [], upcoming: [], nowplaying: [], latest:[] });

  const addToFavorites = (movieId) => {
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-favorite", payload: { movie: state.movies[index] } });
  };

  const addReview = (movie, review) => {
    dispatch({ type: "add-review", payload: { movie, review } });
  };
  useEffect(() => {
    getMovies().then((movies) => {
      dispatch({ type: "load", payload: { movies } });
    });
  }, []);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      dispatch({ type: "load-upcoming", payload: { movies } });
    });
  }, []);

  useEffect(() => {
    getNowPlayingMovies().then((movies) => {
      dispatch({ type: "load-nowplaying", payload: { movies } });
    });
  }, []);

  useEffect(() => {
    getLatestMovies().then((movies) => {
      dispatch({ type: "load-latest", payload: { movies } });
    });
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        upcoming: state.upcoming,
        nowplaying: state.nowplaying,
        favorites: state.favorites,
        latest: state.latest,
        addToFavorites: addToFavorites,
        addReview: addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
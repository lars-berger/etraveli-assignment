import React from "react";
import "./MoviesList.css";

const MoviesList = props => (
  <div onClick={props.onClick} className="movies">
    <p className="movies-episode">Episode {props.movie.fields.episode_id}</p>
    <p className="movies-title">{props.movie.fields.title}</p>
    <p className="movies-date">{props.movie.fields.release_date}</p>
  </div>
);

export default MoviesList;

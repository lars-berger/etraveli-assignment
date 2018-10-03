import React from "react";
import "./SelectedMovie.css";

const SelectedMovie = (props) => (
  <div>
    <p>{props.movie.fields.title}</p>
    <p>{props.movie.fields.opening_crawl}</p>
    <p>Directed by: {props.movie.fields.director}</p>
  </div>
);

export default SelectedMovie;

import React, { Component } from "react";
import { connect } from "react-redux";
import SelectedMovie from "../components/SelectedMovie/SelectedMovie";
import MoviesList from "../components/MoviesList/MoviesList";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      searchFilter: "",
      sortFilter: null
    };
  }

  componentDidMount() {
    this.props.getInvoices();
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectMovie = indexOfMovie => {
    this.setState({ selectedMovie: indexOfMovie });
  };

  applyFilters = movies => {
    if (this.state.sortFilter) {
      movies = movies.sort((a, b) => {
        switch (this.state.sortFilter) {
          case "episodes":
            return a.fields.episode_id - b.fields.episode_id;
          case "year":
            return (
              new Date(a.fields.release_date) - new Date(b.fields.release_date)
            );
          default:
            return movies;
        }
      });
    }

    const regex = new RegExp(this.state.searchFilter, "gi");
    movies = movies.filter(e => e.fields.title.match(regex));

    return movies;
  };

  render() {
    return <div className="App">
        <div className="filters">
          <select className="filters-sort" onChange={this.handleInput} name="sortFilter">
            <option disabled selected>Sort by...</option>
            <option value="episodes">Episode</option>
            <option value="year">Year</option>
          </select>

          <input className="filters-search" onChange={this.handleInput} type="text" name="searchFilter" placeholder="Type to search..." />
        </div>

        <div className="card">
          <h2>Episodes</h2>
          <div className="card-divider" />
          {this.props.movies && this.applyFilters(this.props.movies).map(
              (e, index) => {
                return (
                  <MoviesList
                    onClick={() => this.selectMovie(index)}
                    key={e.id}
                    movie={e}
                  />
                );
              }
            )}
        </div>

        <div className="card">
          {this.state.selectedMovie !== null ? (
            <SelectedMovie
              movie={this.props.movies[this.state.selectedMovie]}
            />
          ) : (
            <p className="card-emptyState">No movie selected.</p>
          )}
        </div>
      </div>;
  }
}

const mapDispatchToProps = dispatch => ({
  getInvoices: () => {
    dispatch({
      type: "GET_MOVIES",
      url: "/films"
    });
  }
});

const mapStateToProps = store => ({
  movies: store.movies
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

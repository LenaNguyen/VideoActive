import React, { Component } from 'react';
import { getMovies} from "../services/fakeMovieService";

class Movie extends Component {
    constructor() {
        super();
        this.state = {
            movies: getMovies()
        }
    }

    displayMovies() {
        return this.state.movies.map(movie => {
            return (
            <tr key={movie._id}>
                <th scope="row">{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                <button type="button" className="btn btn-dark" onClick={() => this.handleDelete(movie._id)}>Delete</button>
                </td>
            </tr>)
        });
    }

    handleDelete = (id) => {
        const curMovies = this.state.movies.filter(movie => movie._id !== id);
        this.setState({movies: curMovies});
    }

    render() {
        let movieCount = this.state.movies.length;
        return (
            <React.Fragment>
                <p>{movieCount ? `Showing ${movieCount} movies in the database.` : "There are no movies in the database."}</p>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rating</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayMovies()}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

export default Movie;
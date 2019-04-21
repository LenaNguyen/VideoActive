import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import ListGroup from './common/ListGroup';
import Like from './common/Like';
import Pagination from './common/Pagination'
import { paginate } from "../utils/paginate";

class Movie extends Component {
    constructor() {
        super();
        const genres = [{name: 'All Genres'}, ...getGenres()]
        this.state = {
            genres,
            movies: getMovies(),
            pageSize: 4,
            currentPage: 1
        }
    }

    displayMovies(movies) {
        return movies.map(movie => {
            return (
                <tr key={movie._id}>
                    <th scope="row">{movie.title}</th>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><Like active={movie.liked} onLike={() => this.handleLike(movie._id)} /></td>
                    <td>
                        <button type="button" className="btn btn-dark" onClick={() => this.handleDelete(movie._id)}>Delete</button>
                    </td>
                </tr>)
        });
    }

    handleDelete = (id) => {
        const curMovies = this.state.movies.filter(movie => movie._id !== id);
        this.setState({ movies: curMovies });
    }

    handleLike = (id) => {
        let movies = [...this.state.movies].map(movie => {
            if (movie._id === id) {
                movie.liked = !movie.liked
            }
            return movie;
        });
        this.setState({ movies });
    }

    handleGenreChange = (genre) => {
        this.setState({selectedGenre: genre, currentPage: 1})
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page })
    }

    render() {
       // const { length: count } = this.state.movies;
        const { pageSize, currentPage, genres, selectedGenre, movies } = this.state;

        const filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre._id === selectedGenre._id) : movies;
        const pageMovies = paginate(filtered, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-3 col-sm col-xs">
                    <ListGroup 
                        items={genres} 
                        selectedItem={selectedGenre} 
                        onItemSelect={this.handleGenreChange}
                        />
                </div>
                <div className="col col-sm col-xs">
                    <p>{filtered.length ? `Showing ${filtered.length} movies in the database.` : "There are no movies in the database."}</p>
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
                            {this.displayMovies(pageMovies)}
                        </tbody>
                    </table>
                    <Pagination
                        onPageChange={this.handlePageChange}
                        pageSize={pageSize}
                        itemsCount={filtered.length}
                        currentPage={currentPage} />
                </div>
            </div>
        );
    }

}

export default Movie;
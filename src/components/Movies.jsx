import React, { Component } from 'react';
import { getMovies} from "../services/fakeMovieService";
import Like from './Like';
import Pagination from './Pagination'
import{paginate} from "../utils/paginate";

class Movie extends Component {
    constructor() {
        super();
        this.state = {
            movies: getMovies(),
            pageSize: 4,
            currentPage: 1
        }
    }

    displayMovies() {
        const {currentPage, pageSize, movies} = this.state;
        const pageMovies = paginate(movies, currentPage, pageSize);

        return pageMovies.map(movie => {
            return (
            <tr key={movie._id}>
                <th scope="row">{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like active={movie.liked} onLike={() => this.handleLike(movie._id)}/></td>
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

    handleLike = (id) => {
        let movies = [...this.state.movies].map( movie => {
           if(movie._id === id){
               movie.liked = !movie.liked
           }
           return movie;
        });
        this.setState({movies});
    }

    handlePageChange = (page) => {
        // const {pageSize} = this.state;
        // const indexStart = page * pageSize - pageSize;
        // const pageMovies = this.state.movies.slice(indexStart, indexStart + pageSize);
        // this.displayMovies(pageMovies);
        this.setState({currentPage: page})
    }

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage} = this.state;

        return (
            <React.Fragment>
                <p>{count ? `Showing ${count} movies in the database.` : "There are no movies in the database."}</p>
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
                <Pagination 
                    onPageChange={this.handlePageChange} 
                    pageSize={pageSize} 
                    itemsCount={count}
                    currentPage={currentPage}/>
            </React.Fragment>
        );
    }

}

export default Movie;
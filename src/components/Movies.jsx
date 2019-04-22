import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import { paginate } from "../utils/paginate";
import ListGroup from './common/ListGroup';
import MoviesTable from './MoviesTable';
import Pagination from './common/Pagination'
import _ from 'lodash';


class Movie extends Component {
    constructor() {
        super();
        const genres = [{_id: '', name: 'All Genres'}, ...getGenres()]
        this.state = {
            genres,
            movies: getMovies(),
            pageSize: 4,
            currentPage: 1,
            sortColumn: {path:'title', order: 'asc'}
        }
    }

    getPageData = () => {
        const {movies, sortColumn, currentPage, pageSize, selectedGenre} = this.state;
        const filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre._id === selectedGenre._id) : movies;
        const sorted =  _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        
        const pageMovies = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: pageMovies}
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

    handleSort = sortColumn => {
        this.setState({sortColumn})
    }

    render() {
        const { pageSize, currentPage, genres, selectedGenre, sortColumn } = this.state;
        const {totalCount, data} = this.getPageData();

        return (
            <div className="row">
                <div className="col-md-3 col-12">
                    <ListGroup 
                        items={genres} 
                        selectedItem={selectedGenre} 
                        onItemSelect={this.handleGenreChange}
                        />
                </div>
                <div className="col-md col-12">
                    <p className="mt-3">
                        {totalCount ? `Showing ${totalCount} movies in the database.` : "There are no movies in the database."}
                    </p>
                    <MoviesTable 
                        movies={data}
                        sortColumn={sortColumn} 
                        onLike={this.handleLike}   
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}/>
                    <Pagination
                        onPageChange={this.handlePageChange}
                        pageSize={pageSize}
                        itemsCount={totalCount}
                        currentPage={currentPage} />
                </div>
            </div>
        );
    }

}

export default Movie;
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import { paginate } from "../utils/paginate";
import ListGroup from './common/ListGroup';
import MoviesTable from './MoviesTable';
import Pagination from './common/Pagination';
import Search from './common/Search';
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
            sortColumn: {path:'title', order: 'asc'},
            selectedGenre: null,
            searchQuery: ""
        }
    }

    getPageData = () => {
        const {movies: allMovies, sortColumn, currentPage, pageSize, selectedGenre, searchQuery} = this.state;
        let filtered = allMovies;
        if(searchQuery)
            filtered = allMovies.filter(m => 
                m.title.toLocaleLowerCase().startsWith(searchQuery.toLocaleLowerCase())
            );
        else if(selectedGenre && selectedGenre._id )
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

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
        this.setState({selectedGenre: genre, currentPage: 1, searchQuery: ""})
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page })
    }

    handleSort = sortColumn => {
        this.setState({sortColumn})
    }

    handleSearch = (query) => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    }

    render() {
        const { pageSize, currentPage, genres, selectedGenre, sortColumn, searchQuery } = this.state;
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
                <Link to='movies/new' className="btn btn-primary">New Movie</Link>
                    <p className="mt-3">
                        {totalCount ? `Showing ${totalCount} movies in the database.` : "There are no movies in the database."}
                    </p>
                    <Search value={searchQuery} onChange={this.handleSearch}/>
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
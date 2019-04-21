import Like from './common/Like';
import React, {Component} from 'react';

class MoviesTable extends Component {
    
    raiseSort = path => {
        const sortColumn = {...this.props.sortColumn};
        if(sortColumn.path === path){
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    }

    render() { 
        const { movies, onDelete, onLike } = this.props
    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th onClick={() => this.raiseSort('title')} scope="col">Title</th>
                    <th onClick={() => this.raiseSort('genre.name')} scope="col">Genre</th>
                    <th onClick={() => this.raiseSort('numberInStock')} scope="col">Stock</th>
                    <th onClick={() => this.raiseSort('dailyRentalRate')} scope="col">Rating</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {movies.map(movie => {
                    return (
                        <tr key={movie._id}>
                            <th scope="row">{movie.title}</th>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><Like active={movie.liked} onLike={() => onLike(movie._id)} /></td>
                            <td>
                                <button type="button" className="btn btn-dark" onClick={() => onDelete(movie._id)}>Delete</button>
                            </td>
                        </tr>)
                })}
            </tbody>
        </table>
    );
    }
}

export default MoviesTable;


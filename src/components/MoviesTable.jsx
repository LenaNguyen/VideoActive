import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Like from './common/Like';
import Table from './common/Table';

class MoviesTable extends Component {
    columns =[
        {
            path: 'title', 
            label:'Title', 
            content: movie =><Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        {path: 'genre.name', label:'Genre'},
        {path: 'numberInStock', label:'Stock'},
        {path: 'dailyRentalRate', label:'Rate'},
        {key: 'like', content:movie => <Like active={movie.liked} onLike={() => this.props.onLike(movie._id)}/>},
        {key: 'delete', 
            content:movie => 
            <button type="button" className="btn btn-dark" onClick={() => this.props.onDelete(movie._id)}>
            Delete
            </button>}
    ]

    render() { 
        const { movies, sortColumn, onSort} = this.props
        return (
            <Table 
            columns={this.columns}
            data={movies} 
            sortColumn={sortColumn} 
            onSort={onSort}/>
        );
    }
}

export default MoviesTable;


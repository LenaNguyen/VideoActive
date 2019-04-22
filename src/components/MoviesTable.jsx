import React, {Component} from 'react';
import Like from './common/Like';
import TableHeader from './common/TableHeader';

class MoviesTable extends Component {
    columns =[
        {path: 'title', label:'Title'},
        {path: 'genre.name', label:'Genre'},
        {path: 'numberInStock', label:'Stock'},
        {path: 'dailyRentalRate', label:'Rate'},
        {key: 'like'},
        {key: 'delete'}
    ]

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
        const { movies, onDelete, onLike, sortColumn, onSort} = this.props
    return (
        <table className="table">
            <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort}/>
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


import React from 'react';

const ListGroup = (props) => {
    const {genres, currentGenre, onGenreChange} = props;
    return(
        <ul className="list-group" style={{paddingRight:"10px"}}>
            <li className="list-group-item" key="All Genres">All Genres</li>
            {genres.map(genre => {
                return (
                    <li  
                    key={genre._id}
                    className={genre.name === currentGenre ? "list-group-item active" : "list-group-item"}
                    style={{cursor:"pointer"}}
                    onClick={onGenreChange}>
                    {genre.name}
                    </li>
                )
            })}
        </ul>
    )
}

export default ListGroup;
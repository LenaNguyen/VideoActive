import React from 'react';

const ListGroup = (props) => {
    const {items, textProperty, valueProperty, selectedItem, onItemSelect} = props;
    return(
        <ul className="list-group" style={{paddingRight:"10px"}}>
            {/* <li className="list-group-item" 
            key="All Genres" 
            onClick={() => onItemSelect("All Genres")}
            style={{cursor:"pointer"}}>
                All Genres
            </li> */}
            {items.map(item => {
                return (
                    <li  
                    key={item[valueProperty]}
                    className={item === selectedItem ? "list-group-item active" : "list-group-item"}
                    style={{cursor:"pointer"}}
                    onClick={() => onItemSelect(item)}>
                    {item[textProperty]}
                    </li>
                )
            })}
        </ul>
    )
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup;
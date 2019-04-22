import React from 'react';

const ListGroup = (props) => {
    const {items, textProperty, valueProperty, selectedItem, onItemSelect} = props;
    return(
        <ul className="list-group mt-3 " style={{paddingRight:"10px"}}>
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
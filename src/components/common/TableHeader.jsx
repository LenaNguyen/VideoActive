import React, { Component } from 'react';

//columns: array, onSort: function, sortColumn: object
class TableHeader extends Component {
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
        return ( 
            <thead className='thead-dark'>
                <tr>
                    {this.props.columns.map(column => {
                        return (<th key={column.path || column.key} onClick={() => this.raiseSort(column.path)} scope="col">{column.label}</th>)
                    })}
                </tr>
            </thead>
         );
    }
}
 
export default TableHeader;
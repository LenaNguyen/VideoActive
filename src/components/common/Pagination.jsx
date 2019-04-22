import React from 'react';
import PropTypes from 'prop-types';
//import _ from 'lodash';   

const Pagination = (props) => {
    const {itemsCount, pageSize, onPageChange, currentPage} = props;
    let pageNums = [];
    let pageNumMax = Math.ceil(itemsCount / pageSize);
    if(pageNumMax === 1) return null;
    for(let i = 1; i <= pageNumMax; i++){
        pageNums.push(i);
    }

    return (<nav aria-label="Page navigation example">
    <ul className="pagination">
    {
        pageNums.map(num => {
            let classes = "page-item page-link ";
            if(num === currentPage) classes += " active"
            
            return (
            <li key={num} 
            className={classes}
            onClick={() => onPageChange(num)}>
                {num}
            </li>)
        })
    }
    </ul>
    </nav>)
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
}

export default Pagination;

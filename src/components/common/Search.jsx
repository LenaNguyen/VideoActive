import React from 'react';
import '../../index.css';

const Search = ({value, onChange}) => {
    return ( 
            <input  
            class="form-control my-3" 
            type="text"
            name="query" 
            placeholder="Search"
            value={value}
            aria-label="Search"
            onChange={e => onChange(e.currentTarget.value)}/>
     );
}
 
export default Search;
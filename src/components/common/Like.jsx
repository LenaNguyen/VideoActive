import React from 'react';

const Like  = (props) =>{
    const {onLike, active} = props;
    let classes = "fa fa-heart";
    classes += active ? "" : "-o";
    
    return (
        <span className={classes} 
        style={{cursor:"pointer"}} aria-hidden="true" 
        onClick={onLike}></span>
    )
}

export default Like;
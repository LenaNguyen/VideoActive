import React from 'react';

const Like  = (props) =>{
    let classes = "fa fa-heart";
    classes += props.active ? "" : "-o";
    
    return (
        <span className={classes} 
        style={{cursor:"pointer"}} aria-hidden="true" 
        onClick={props.onLike}></span>
    )
}

export default Like;
import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const NavBar = ({title, links}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
            {title}
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                {
                    links.map(link => {
                        return (
                        <li key={link.path} className="nav-item">
                            <NavLink className="nav-link" to={link.path}>{link.name}</NavLink>
                        </li>)
                    })
                }
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
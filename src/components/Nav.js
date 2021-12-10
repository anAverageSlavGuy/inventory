import React from 'react';
import { BrowserRouter as Router, NavLink } from "react-router-dom";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <a className="navbar-brand" href="#">LOGO</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li to="/boxes" className="nav-item">
                            <NavLink to="/boxes" activeClassName="active" className="nav-link" aria-current="page" href="#">Boxes</NavLink>
                        </li>
                        <li to="/products" className="nav-item">
                            <NavLink to="/products" activeClassName="active" className="nav-link" href="#">Products</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav

import React from 'react';
import { Link } from 'react-router-dom'

import './header.css'

import logo from '../assets/logo.jpg'
import camera from '../assets/camera1.png'

function Header() {
    return(
        <header id="main-header">
            <div className="header-content">
                <Link to="/">
                    <img src={logo} alt="Instagram" width="150px"/>
                </Link>
                <Link to="/new">
                    <img src={camera} alt="Enviar publicaçao" width="100px"/>
                </Link>
            </div>
        </header>
    )
}

export default Header;
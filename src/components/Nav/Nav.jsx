import React from 'react';
import firebase from '../../config/firebase';
import './Nav.scss';

function Nav(props) {

    const signOut = () => {

    }

    return (
        <nav className="nav__container">
            <div className="nav__user-name">{props.name}</div>
            <div className="nav__logout" onClick={signOut}>

            </div>
        </nav>
    )
}

export default Nav;
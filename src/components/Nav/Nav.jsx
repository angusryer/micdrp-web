import React from 'react';
import firebase from '../../config/firebase';
import './Nav.scss';

function Nav({ user }) {

    const signOut = () => {
        firebase.auth().signOut().catch(error => {
            alert("Unable to sign you out! Try again! Here's the error we received: \n", error)
        })
    }

    return (
        <nav className="nav__container">
            <div className="nav__title-group">
                <h2 className="nav__title">micdrp</h2>
            </div>
            <div className="nav__user-group">
                <div className="nav__user-name">{user.name}</div>
                <div className="nav__logout" onClick={signOut}>
                    <img src={user.avatar} alt={user.name} className="nav__avatar" />
                </div>
            </div>
        </nav>
    )
}

export default Nav;
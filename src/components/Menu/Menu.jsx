import React from 'react'
import firebase from '../../config/firebase';
import { Link, useParams, useHistory } from 'react-router-dom';
import './Menu.scss';

const Menu = ({ currentPage, isVisible }) => {

    const navParams = useParams();
    const history = useHistory();

    const signOut = () => {
        firebase.auth().signOut()
            .then(_res => {
                history.push("/");
            })
            .catch(error => {
                alert("Unable to sign you out! Try again! Here's the error we received: \n", error)
            })
    }

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="menu__container">
                <ul className="menu__list">
                    {(currentPage === "dash") ? <Link to={`/perform/${navParams.uid}`}><li className="menu__item">Perform</li></Link> : null}
                    {(currentPage === "perform") ? <Link to={`/dashboard/${navParams.uid}`}><li className="menu__item">Dashboard</li></Link> : null}
                    <Link to="/learn"><li className="menu__item">Learn</li></Link>
                    <div onClick={signOut}><li className="menu__item">Logout</li></div>
                </ul>
            </div>
        )
    }
}

export default Menu;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '../';
import './Nav.scss';
import hamburgerMenuIcon from '../../assets/images/menu-outline.svg';

function Nav({ user, currentPage }) {

    console.log(user)

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <nav className="nav__container">
            <div className="nav__menu" onClick={() => toggleMenu()}>
                <img src={hamburgerMenuIcon} alt="Access menu" className="nav__menu-icon" />
                <Menu isVisible={showMenu} currentPage={currentPage} />
            </div>
            <div className="nav__user">
                <div className="nav__avatar-container">
                    {/* <img src={user.avatar} alt={user.name} className="nav__avatar" /> */}
                </div>
                <div className="nav__user-text">
                    {/* <div className="nav__user-name">{user.name}</div> */}
                    <Link to="#"><div className="nav__feature">Share your progress!</div></Link>
                    <Link to="#"><div className="nav__feature">Harmonize!</div></Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
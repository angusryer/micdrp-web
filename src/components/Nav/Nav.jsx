import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '../';
import './Nav.scss';
import hamburgerMenuIcon from '../../assets/images/menu-outline.svg';

function Nav({ user, currentPage }) {

    const [showMenu, setShowMenu] = useState(false);
    const avatarRef = useRef();
    
    const hideMenu = event => {
        if (event.target !== avatarRef.current) {
            setShowMenu(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', hideMenu)
        return () => document.removeEventListener('click', hideMenu)
    }, [])

    return (
        <nav className="nav__container">
            <div className="nav__menu">
                <img src={hamburgerMenuIcon} alt="Access menu" className="nav__menu-icon" onClick={() => setShowMenu(!showMenu)} ref={avatarRef} />
                { showMenu && <Menu currentPage={currentPage} /> }
            </div>
            <div className="nav__user">
                <div className="nav__avatar-container">
                    <img src={user.avatar} alt={user.name} className="nav__avatar" />
                </div>
                <div className="nav__user-text">
                    <div className="nav__user-name">{user.name}</div>
                    <Link to="#"><div className="nav__feature">Share your progress!</div></Link>
                    <Link to="#"><div className="nav__feature">Harmonize!</div></Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
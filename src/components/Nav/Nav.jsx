import React, { useState } from 'react';
import './Nav.scss';
import { Menu } from '../';

function Nav({ user, currentPage }) {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <nav className="nav__container">
            <div className="nav__title-group">
                <h2 className="nav__title">micdrp</h2>
            </div>
            <div className="nav__user-group">
                <div className="nav__user-name">{user.name}</div>
                <div className="nav__logout" onClick={() => toggleMenu()}>
                    <img src={user.avatar} alt={user.name} className="nav__avatar" />
                    <Menu isVisible={showMenu} currentPage={currentPage} />
                </div>
            </div>
        </nav>
    )
}

export default Nav;
import React, { useState } from 'react';
import { Menu } from '..';
import './NavMinimal.scss';
import hamburgMenuIcon from '../../assets/images/menu-outline.svg';
import hamburgMenuIconWhite from '../../assets/images/menu-outline-white.png';

function NavMinimal({ user, currentPage, userVisible }) {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <nav className="navminimal__container">
            {(userVisible) ? (
                <div className="navminimal__user-group">
                    <div className="navminimal__avatar-container">
                        <img src={user.avatar} alt={user.name} className="navminimal__avatar" />
                    </div>
                    <div className="navminimal__user-name">{user.name}</div>
                </div>
            ) : null}
            <div className="navminimal__menu" onClick={() => toggleMenu()}>
                <img src={
                    (currentPage === 'perform') ? hamburgMenuIconWhite : hamburgMenuIcon
                    } alt="Access menu" className="navminimal__menu-icon" />
                <Menu isVisible={showMenu} currentPage={currentPage} />
            </div>
        </nav>
    )
}

export default NavMinimal;
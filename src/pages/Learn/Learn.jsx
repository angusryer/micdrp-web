import React from 'react';
import { useHistory } from 'react-router-dom';
import './Learn.scss';
import loginIcon from '../../assets/images/log-in-outline.svg';
import meImage from "../../assets/images/me.gif";

function Learn() {

    const history = useHistory();

    return (
        <div className="learn__page">
            <div className="learn__container">
                <header className="learn__login-container">
                    <img src={loginIcon} alt="Login" onClick={() => history.goBack()} className="learn__login-icon" />
                </header>
                <section className="learn__about">
                    <div className="learn__image-container">
                        <img src={meImage} alt="The developer" className="learn__image"/>
                    </div>
                    <p className="learn__text">
                        ^^^ That's me. ^^^<br /><br />A construction pro gone some kind of hybrid developer-business-artist. I&nbsp;have more to offer than this!<br /><span className="learn__text-bold">Check out my stuff below:</span>
                    </p>
                    <div className="learn__links-container">
                        <a className="learn__links-item" rel="noopener noreferrer" target="_blank" href="https://linkedin.com/in/angusryer">Connect on LinkedIn</a>
                    </div>
                    <div className="learn__links-container">
                        <a className="learn__links-item" rel="noopener noreferrer" target="_blank" href="https://github.com/angusryer">Peer into my GitHub</a>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Learn

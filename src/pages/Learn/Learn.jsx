import React from 'react';
import { useHistory } from 'react-router-dom';
import './Learn.scss';
import loginIcon from '../../assets/images/log-in-outline.svg';

function Learn() {

    const history = useHistory();

    return (
        <div>
            <div className="learn__login-container">
                <img src={loginIcon} alt="Login" onClick={() => history.goBack()} className="learn__login-icon" />
            </div>
        </div>
    )
}

export default Learn

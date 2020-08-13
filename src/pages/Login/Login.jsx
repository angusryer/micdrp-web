import React from 'react';
import firebase from '../../utilities/firebase';
import './Login.scss';
import googleEmblem from '../../assets/images/Google-01.png';
import micdrpLogo from '../../assets/images/kid-bellowing.png';
import questionMarkImage from '../../assets/images/help-circle-outline.png';
import { useHistory } from 'react-router-dom';

function Login({ setUser }) {

    const history = useHistory();

    const signIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
            // check if new user. If yes, generate default settings and then render AppNavigator
            // If no, then get user, check settings and then render AppNavigator
            const urlName = result.user.displayName.replace(" ", "").toLowerCase();
            const user = {
                uid: result.user.uid,
                name: result.user.displayName,
                avatar: result.user.photoURL,
                urlName: urlName,
            }
            setUser(user);
            // prolly right here?
            history.push(`/${urlName}/dashboard`)
        })
    }

    return (
        <main className="login">
            <div className="login__container">
                <div className="login__signin-group">
                    <div className="login__learn-container">
                        <img src={questionMarkImage} alt="Learn more" onClick={() => history.push('/learn')} className="login__learn-icon" />
                    </div>
                    <h1 className="login__title">micdrp</h1>
                    <img src={micdrpLogo} alt="micdrp Logo" className="login__logo" />
                    <button className="login__button" onClick={signIn}>
                        <img src={googleEmblem} alt="Google emblem" className="login__button-img" />
                        <span>Sign in with Google</span>
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Login
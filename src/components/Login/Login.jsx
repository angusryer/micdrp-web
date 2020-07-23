import React from 'react';
import firebase from '../../config/firebase';
import './Login.scss';
import googleEmblem from '../../assets/images/Google-01.png';
import micdrpLogo from '../../assets/images/kid-bellowing.png'

function Login(props) {

    const signIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
            const user = {
                uid: result.user.uid,
                name: result.user.displayName,
                avatar: result.user.photoURL,
            }
            props.setUserState(user)
            console.log("Login ", user)
        })
    }

    return (
        <div className="login__container">
            <div className="login__signin-group">
                <img src={micdrpLogo} alt="micdrp Logo" className="login__logo" />
                <button className="login__button" onClick={signIn}>
                    <img src={googleEmblem} alt="Google emblem" className="login__button-img" />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    )
}

export default Login

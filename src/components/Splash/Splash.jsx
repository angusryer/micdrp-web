import React, { useEffect } from 'react'
import ReactLoading from 'react-loading';
import firebase from '../../config/firebase';
import { useHistory } from 'react-router-dom';
import './Splash.scss';

const Splash = (props) => {

    const history = useHistory();

    useEffect(() => {
        if (firebase.auth().currentUser) {
            history.push(`/${firebase.auth().currentUser.uid}/dash`, firebase.auth().currentUser)
            const user = {
                uid: firebase.auth().currentUser.uid,
                name: firebase.auth().currentUser.displayName,
                avatar: firebase.auth().currentUser.photoURL,
            }
            props.setUserState(user)
            console.log("existing user called ", user)
        } else {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    const userData = {
                        uid: user.uid,
                        name: user.displayName,
                        avatar: user.photoURL,
                    }
                    props.setUserState(userData)
                    console.log("splash logged in called ", userData)
                    history.push(`/${user.uid}/dash`, userData)
                } else {
                    history.push(`/login`)
                }
            })
        }
    }, [])

    return (
        <div className="splash__container">
            <ReactLoading type={'bubbles'} color={'#B65245'} height={'6rem'} width={'6rem'} />
        </div>
    )
}

export default Splash;

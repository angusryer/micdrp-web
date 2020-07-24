import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../config/firebase';
import { Nav } from '../';

function Dashboard({user, setUser}) {

    const history = useHistory();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
              const userData = {
                uid: user.uid,
                name: user.displayName,
                avatar: user.photoURL,
              }
              setUser(userData)
            }
          })
    }, [])

    return (
        <div>
            <Nav user={user} currentPage="dash" />
            Welcome, {user.name}
        </div>
    )
}

export default Dashboard

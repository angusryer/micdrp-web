import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Switch, Route, useHistory } from 'react-router-dom';
import firebase from '../config/firebase';
import { Dashboard, Perform } from '.';

function Navigator({ user }) {

    const [userData, setUserData] = useState({});
    const history = useHistory();

    const getUserData = async (userProp) => {
        const allUsers = await firebase.firestore().collection('users');
        const currentUser = await allUsers.where('uid', '==', `${userProp.uid}`).get();
        if (currentUser.empty) {
            allUsers.add({
                uid: userProp.uid,
                performanceData: [],
                settings: {
                    defaultPage: 'dashboard'
                }
            })
            history.push(`/${user.urlName}/dashboard`);
        } else {
            if (currentUser.docs.length === 1) {
                currentUser.forEach(userDoc => {
                    const userDocData = userDoc.data();
                    setUserData(userDocData)
                    history.push(`/${userProp.urlName}/${userDocData.settings.defaultPage}`)
                }
                )
            }
        }
    }

    useEffect(() => {
        if (user) {
            getUserData(user);
        }
    }, [])


    if (!userData) {
        return (
            <div className="loading__container">
                <ReactLoading type={'bubbles'} color={'#B65245'} height={'5rem'} width={'5rem'} />
            </div>
        )
    } else {
        return (
            <Switch>
                <Route exact path="/:urlName/dashboard">
                    <Dashboard user={user} userData={userData} />
                </Route>
                <Route exact path="/:urlName/perform">
                    <Perform user={user} userData={userData} />
                </Route>
            </Switch>
        )
    }
}

export default Navigator;
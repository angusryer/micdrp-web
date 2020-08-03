import React, { useState, useEffect } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Cookies from 'universal-cookie';
import firebase from './utilities/firebase';
import usePrevious from './utilities/hooks';
import { Login, Learn, Navigator } from './pages';
import './styles/base.scss';

function App() {

  const history = useHistory();
  const [user, setUser] = useState({});

  const checkForUserCookie = (cookies, user) => {
    for (let userCookie in cookies) {
      if (userCookie === user) {
        return true;
      }
      return false;
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Assemble fresh user Object and set it to state
        const urlName = user.displayName.replace(" ", "").toLowerCase()
        const userObject = {
          uid: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
          urlName: urlName,
        }
        setUser(userObject)
        // Check if a cookie exists. If not, ask user, and if yes, create it
        const cookie = new Cookies();
        const cookies = cookie.getAll();
        if (Object.keys(cookies).length === 0 || !checkForUserCookie(cookies, user.uid)) {
          cookie.set(user.uid, JSON.stringify(userObject), { path: '/' });
        }
        history.push(`/${urlName}`) // AppNavigator
      } else {
        history.push(`/login`)
      }
    })
  }, [])

  if (!user) {
    return (
      <div className="loading__container">
        <ReactLoading type={'bubbles'} color={'#B65245'} height={'5rem'} width={'5rem'} />
      </div>
    )
  } else {
    return (
      <Switch>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/learn">
          <Learn />
        </Route>
        <Route path="/:urlName">
          <Navigator user={user} />
        </Route>
      </Switch>
    )
  }
}

export default App;
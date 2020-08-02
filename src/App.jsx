import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { useHistory, Switch, Route } from 'react-router-dom';
import firebase from './config/firebase';
import { Login, Learn, AppNavigator } from './pages';
import './styles/base.scss';

function App() {

  const history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const urlName = user.displayName.replace(" ", "").toLowerCase()
        setUser({
          uid: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
          urlName: urlName,
        })
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
        <Route >
          <AppNavigator user={user} />
        </Route>
      </Switch>
    )
  }
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './config/firebase';
import { Splash, Login, Learn, Dashboard, Perform } from './components';
import './styles/base.scss';


function App() {

  const [user, setUser] = useState();

  const setUserState = (user, setUser) => {
    if (user) {
      const userData = {
        uid: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
        }
      }
      setUser(userData);
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Splash setUserState={setUserState} />
        </Route>
        <Route path="/login">
          <Login setUserState={setUserState} />
        </Route>
        <Route path="/learn">
          <Learn />
        </Route>
        <Route path="/:uid/dash">
          <Dashboard user={user} />
        </Route>
        <Route path="/:uid/perform">
          <Perform user={user} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
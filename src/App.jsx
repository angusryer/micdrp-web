import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Splash, Login, Learn, Dashboard, Perform } from './pages';
import './styles/base.scss';

const App = () => {

  const [user, setUser] = useState({});

  return (
      <Switch>
        <Route exact path="/">
          <Splash setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/learn">
          <Learn />
        </Route>
        <Route exact path="/dashboard/:uid">
          <Dashboard user={user} setUser={setUser} />
        </Route>
        <Route exact path="/perform/:uid">
          <Perform user={user} setUser={setUser} />
        </Route>
      </Switch>
  )
}

export default App;
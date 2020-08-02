import React, { useEffect } from 'react'
import ReactLoading from 'react-loading';
import { Switch, Route } from 'react-router-dom'
import { Dashboard, Perform } from './'

function AppNavigator({ user }) {

    useEffect(() => {
        // get performance data from firebase, set it to state
        // save user settings to state
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
                <Route exact path="/:urlName/dashboard">
                    <Dashboard />
                </Route>
                <Route exact path="/:urlName/perform">
                    <Perform />
                </Route>
            </Switch>
        )
    }
}

export default AppNavigator;
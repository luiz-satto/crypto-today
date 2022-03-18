import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/Dashboard" exact component={Dashboard} />
        </Switch>
    )
}

export default Routes
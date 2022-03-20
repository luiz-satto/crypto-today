import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Cryptocurrencies from './pages/Cryptocurrencies';
import News from './pages/News';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/Dashboard" exact component={Dashboard} />
            <Route path="/Cryptocurrencies" exact component={Cryptocurrencies} />
            <Route path="/News" exact component={News} />
        </Switch>
    )
}

export default Routes
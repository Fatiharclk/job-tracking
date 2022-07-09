import React from 'react';
import {
    BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import Home from '../pages/Home/Home';

export default function Navigation() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from '../pages/Home/Home';
import Table from '../pages/Table/Table';
export default function Navigation() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/table">
                        <Table />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

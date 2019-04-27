import React from "react";
import {HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "../Routes/Home";
import TV from "../Routes/TV";
import Header from "../Components/Header";
import Search from "../Routes/Search";
import Detail from "../Routes/Detail";
import Private from "../Routes/Private";
import Collections from "../Routes/Collections";

export default () => (
    <Router>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/tv" component={TV} />
                <Route path="/search" component={Search} />
                <Route path="/movie/:id" component={Detail} />
                <Route path="/show/:id" component={Detail} />
                <Route path="/private" component={Private} />
                <Route path="/collections/:id" component={Collections} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    </Router>
)
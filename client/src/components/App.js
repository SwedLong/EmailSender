import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>Surveynew</h2>;
class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                        <Route exact path="/" component={Landing} />
                        </Switch>
                        <Switch>
                        <Route exact path="/surveys" component={Dashboard} />
                        </Switch>
                        <Switch>
                        <Route path="/survey/new" component={SurveyNew} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(
    null,
    actions
)(App);

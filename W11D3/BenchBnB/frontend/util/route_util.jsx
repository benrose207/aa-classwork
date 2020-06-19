import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";


const mapStatetoProps = state => {
    return {
        loggedIn: Boolean(state.session.id)
    };
};

const Auth = ({path, loggedIn, exact, component: Component}) => (
    <Route 
        path={path}
        exact={exact}
        render={props =>
            loggedIn ? <Redirect to="/" /> : <Component {...props} />}
    />
)

const Protected = ({ path, loggedIn, exact, component: Component }) => (
    <Route
        path={path}
        exact={exact}
        render={props =>
            loggedIn ? <Component {...props} /> : <Redirect to="/login" />}
    />
)

export const AuthRoute = withRouter(connect(
    mapStatetoProps,
    null
)(Auth));

export const ProtectedRoute = withRouter(connect(
    mapStatetoProps,
    null
)(Protected));
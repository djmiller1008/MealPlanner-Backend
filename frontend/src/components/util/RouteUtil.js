import React from 'react';
import { useLocalState } from './LocalStorageUtil';
import { Route, Redirect, withRouter } from 'react-router-dom';

export const PrivateRoute = (props) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    return jwt ? (
        <Route {...props} />
    ) : (
        <Redirect to="/login" />
    );
}

export const AuthRoute = ({ component: Component, ...props }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    return jwt ? (
        <Redirect to="/" />
    ) : (
        <Route {...props} />
    );
}

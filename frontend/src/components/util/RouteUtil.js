import React from 'react';
import { useLocalState } from './LocalStorageUtil';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = (props) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    return jwt ? (
        <Route {...props} />
    ) : (
        <Redirect to="/login" />
    );
}

export const AuthRoute = (props) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    return jwt ? (
        <Redirect to="/" />
    ) : (
        <Route {...props} />
    );
}

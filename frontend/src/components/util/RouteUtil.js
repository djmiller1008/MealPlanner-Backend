import React from 'react';
import { useLocalState } from './LocalStorageUtil';
import { Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    return jwt ? <Component /> : <Redirect to="/login" />;
}

export const AuthRoute = ({ component: Component }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    return jwt ? <Redirect to="/" /> : <Component />;
}

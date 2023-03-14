import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { validateJwtToken } from './ApiUtil';

export const PrivateRoute = props => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);

    if (jwt) {
        validateJwtToken(jwt).then(result => {
           setIsValid(result.data);
           setIsLoading(false);
        });
    } else {
        return <Redirect to="/login" />;
    }

    if (isLoading) {
        return <div>Loading...</div>
    } else {
        if (isValid) {
            return <Route {...props} />;
        } else {
            return <Redirect to="/login" />;
        }
    }
}


import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import * as APIUtil from '../util/ApiUtil';
import { useLocalState } from '../util/LocalStorageUtil';

export default function Login() {
    const history = useHistory();

    const [jwt, setJwt] = useLocalState("", "jwt");

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        if (jwt) {
            history.replace("/");
        }
    }, [jwt, history]);


    const handleInput = (e, dataType) => {
        setFormData({ ...formData, [dataType]: e.target.value});
    }

    const handleSubmit = e => {  
        e.preventDefault();
        APIUtil.login(formData).then(response => {
            if (!jwt) {
                setJwt(response.jwtToken);
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input onChange={e => handleInput(e, 'username')} type='text'></input>
                <label htmlFor='password'>Password</label>
                <input onChange={e => handleInput(e, 'password')} type='password'></input>
                <input type='submit' value='Login'></input>
            </form>
        </div>
    )
}

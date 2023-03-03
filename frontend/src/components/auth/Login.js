import React, { useState } from 'react'
import * as APIUtil from '../util/ApiUtil';
import { useLocalState } from '../util/LocalStorageUtil';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [jwt, setJwt] = useLocalState("", "jwt");

    const handleInput = (e, dataType) => {
        setFormData({ ...formData, [dataType]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        APIUtil.login(formData).then(response => {
            if (!jwt) {
                setJwt(response.jwtToken);
            }
        });
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

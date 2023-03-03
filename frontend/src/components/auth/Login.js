import React, { useState } from 'react'

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleInput = (e, dataType) => {
        setFormData({ ...formData, [dataType]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        // TODO
        // hit login endpoint on backend
    }

    return (
        <div>
            <form>
                <label htmlFor='username'>Username</label>
                <input onChange={e => handleInput(e, 'username')} type='text'></input>
                <label htmlFor='password'>Password</label>
                <input onChange={e => handleInput(e, 'password')} type='password'></input>
                <input type='submit' value='Login'></input>
            </form>
        </div>
    )
}

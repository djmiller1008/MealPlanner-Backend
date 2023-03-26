import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as APIUtil from '../util/ApiUtil';
import '../../styles/auth.css';
import { useUser } from '../userProvider/UserProvider';

export default function Login() {
    const history = useHistory();

    const user = useUser();
    const [errorMessage, setErrorMessage] = useState(null);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    }); 

    useEffect(() => {
        if (user.jwt) {
            history.replace("/");
        }
    }, [user]);

    const removeErrorMessage = () => {
        setErrorMessage("");
        const authErrorDiv = document.getElementById('auth-error-div');
        authErrorDiv.style.display = 'none';
    };

    const displayErrorMessage = message => {
        setErrorMessage(message);
        const authErrorDiv = document.getElementById('auth-error-div');
        authErrorDiv.style.display = 'flex';
    };

    const handleInput = (e, dataType) => {
        setFormData({ ...formData, [dataType]: e.target.value});
    };

    const handleSubmit = e => {  
        e.preventDefault();
        APIUtil.login(formData).then(response => {
            if (response.message) {
                displayErrorMessage(response.message);
            }
            if (response.jwtToken) {
                user.setJwt(response.jwtToken);
            }
        })
    };

    return (
        <div className='login-container'>
            <div className='login-title-logo-div'>
                <i className="fa fa-cutlery logo auth-logo" aria-hidden="true"></i>
                <h1 className='login-title'>mealPlanner</h1>
            </div>
            
            <div className='auth-container-big-screen'>
                <div className='auth-form-container'>
                    <div id='auth-error-div' className='auth-error-div'>
                        {errorMessage}
                        <span className='close-error-message' onClick={removeErrorMessage}>&times;</span>
                    </div>
                    <h1 className='auth-form-title'>Log in</h1>
                    <form onSubmit={handleSubmit}>
                        <section className='input-section'>
                            <label className='auth-input-label' htmlFor='username'>Username</label>
                            <input className='input' onChange={e => handleInput(e, 'username')} type='text'></input>
                        </section>
                        <section className='input-section'>
                            <label className='auth-input-label' htmlFor='password'>Password</label>
                            <input className='input' onChange={e => handleInput(e, 'password')} type='password'></input>
                        </section>
                        <section className='auth-button-section'>
                            <input className='nav-button button' type='submit' value='Login'></input>
                        </section>
                        <section className='signup-button-section'>
                            <Link className='signup-button' to={'/register'}>Sign up</Link>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    );
};


import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import * as APIUtil from '../util/ApiUtil';
import { useLocalState } from '../util/LocalStorageUtil';
import '../../styles/auth.css';

export default function Login(props) {
    const history = useHistory();
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    }); 

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    useEffect(() => {
        if (jwt) {
            APIUtil.validateJwtToken(jwt).then(result => {
                if (result.data === true) {
                    history.replace("/");
                }
            })
        }
    });

    const handleInput = (e, dataType) => {
        setFormData({ ...formData, [dataType]: e.target.value});
    }

    const handleSubmit = e => {  
        e.preventDefault();
        APIUtil.login(formData).then(response => {
            setErrorMessage(response.message);
            if (response.jwtToken) {
                setJwt(response.jwtToken);
            }
        })
    }


    if (windowSize < 780) {
        return (
            <div className='login-container'>
                <div className='login-title-logo-div'>
                    <i className="fa fa-cutlery logo auth-logo" aria-hidden="true"></i>
                    <h1 className='login-title'>mealPlanner</h1>
                </div>
                <div>{errorMessage}</div>
                <div className='auth-form-container'>
                    <form onSubmit={handleSubmit}>
                        <section className='auth-input-section'>
                            <label className='auth-input-label' htmlFor='username'>Username</label>
                            <input className='auth-input' onChange={e => handleInput(e, 'username')} type='text'></input>
                        </section>
                        <section className='auth-input-section'>
                            <label className='auth-input-label' htmlFor='password'>Password</label>
                            <input className='auth-input' onChange={e => handleInput(e, 'password')} type='password'></input>
                        </section>
                        <section className='auth-button-section'>
                            <input className='nav-button auth-button' type='submit' value='Login'></input>
                        </section>
                        
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <div className='login-container'>
                <div className='login-title-logo-div'>
                    <i className="fa fa-cutlery logo auth-logo" aria-hidden="true"></i>
                    <h1 className='login-title'>mealPlanner</h1>
                </div>
                <div>{errorMessage}</div>
                <div className='auth-container-big-screen'>
                    <div className='auth-form-container'>
                        <h1 className='auth-form-title'>Log in</h1>
                        <form onSubmit={handleSubmit}>
                            <section className='auth-input-section'>
                                <label className='auth-input-label' htmlFor='username'>Username</label>
                                <input className='auth-input' onChange={e => handleInput(e, 'username')} type='text'></input>
                            </section>
                            <section className='auth-input-section'>
                                <label className='auth-input-label' htmlFor='password'>Password</label>
                                <input className='auth-input' onChange={e => handleInput(e, 'password')} type='password'></input>
                            </section>
                            <section className='auth-button-section'>
                                <input className='nav-button auth-button' type='submit' value='Login'></input>
                            </section>
                            
                        </form>
                    </div>
                </div>
        </div>
        )
    }
}

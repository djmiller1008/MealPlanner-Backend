import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

export default function HamburgerMenu({ user }) {
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        user.setJwt("");
        history.replace("/");
    }

    const renderLogin = () => {
        if (!user.jwt) {
            return <NavLink className="menu-item" to={'/login'}>LOG IN</NavLink>;
        }
        return <NavLink className="menu-item" to={'/'}>DASHBOARD</NavLink>;
    }

    const renderLogout = () => {
        if (user.jwt) {
            return <button onClick={logout} className='menu-item menu-logout'>LOGOUT</button>;
        }
    }

    return (
        <Menu>
            <i className="fa fa-cutlery logo sidebar-logo" aria-hidden="true"></i>
            <NavLink className="menu-item" to={'/search'}>RECIPES</NavLink>
            {renderLogin()}
            {renderLogout()}
        </Menu>
    )
}

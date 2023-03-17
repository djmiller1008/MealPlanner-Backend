import React from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

export default function HamburgerMenu({ loggedIn }) {

    const renderLogin = () => {
        if (!loggedIn) {
            return <NavLink className="menu-item" to={'/login'}>LOG IN</NavLink>;
        }
        return <NavLink className="menu-item" to={'/'}>DASHBOARD</NavLink>;
    }

    return (
        <Menu>
            <i className="fa fa-cutlery logo sidebar-logo" aria-hidden="true"></i>
            <NavLink className="menu-item" to={'/search'}>RECIPES</NavLink>
            {renderLogin()}
        </Menu>
    )
}

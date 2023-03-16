import React from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

export default function HamburgerMenu() {
    return (
        <Menu>
            <i className="fa fa-cutlery logo sidebar-logo" aria-hidden="true"></i>
            <NavLink className="menu-item" to={"/search"}>RECIPES</NavLink>
            <NavLink className="menu-item" to={"/login"}>LOG IN</NavLink>
        </Menu>
    )
}

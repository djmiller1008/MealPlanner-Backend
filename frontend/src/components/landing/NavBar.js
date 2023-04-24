import React, { useEffect, useState, useTransition } from 'react';
import '../../styles/landing.css';
import HamburgerMenu from './HamburgerMenu';
import { NavLink, useHistory } from 'react-router-dom';
import { useUser } from '../userProvider/UserProvider';
import { logout } from '../util/ApiUtil';

export default function NavBar() {
    const history = useHistory();
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const user = useUser();

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    const logoutUser = async (e) => {
      e.preventDefault();
      const response = await logout();
      if (response.status === 200) {
        user.setJwt("");
        history.replace("/home");
      }
    }

    const renderLogin = () => {
      if (!user.jwt) {
        return <NavLink className='nav-button' to={'/login'}>LOG IN</NavLink>;
      }
      return (
        <section className='links-section'>
          <NavLink className='nav-button' to={'/'}>DASHBOARD</NavLink>
          <button onClick={logoutUser} className='nav-button logout'>Logout</button>
        </section>
      )
    }

    if (windowSize < 780) {
      return (
        <div className='outer-container'>
         <HamburgerMenu user={user} pageWrapId={'page-wrap'} outerContainerId={'container'} />
         <div className='page-wrap'>
           <header className='landing-header'>
             <i className="fa fa-cutlery logo logo-small-screen" aria-hidden="true"></i>
             <h1 className='app-title'>mealPlanner</h1>
           </header>
         </div>
        </div>
       )
    }

    return (
      <div className='outer-container'>
        <div className='page-wrap'>
          <header className='landing-header'>
            <section className='title-and-links'>
            <i className="fa fa-cutlery logo logo-big-screen" aria-hidden="true"></i>
              <h1 className='app-title-big-screen'>mealPlanner</h1>
              <NavLink className='title-link' to={"/search"}>RECIPES</NavLink>
            </section>
            <section className='nav-links-section'>
              {renderLogin()}
            </section>
          </header>
        </div>
      </div>
    )
};

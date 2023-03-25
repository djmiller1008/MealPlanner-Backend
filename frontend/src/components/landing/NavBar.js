import React, { useEffect, useState } from 'react';
import '../../styles/landing.css';
import HamburgerMenu from './HamburgerMenu';
import { NavLink } from 'react-router-dom';
import { useUser } from '../userProvider/UserProvider';

export default function NavBar() {
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

    const renderLogin = () => {
      if (!user.jwt) {
        return <NavLink className='nav-button' to={'/login'}>LOG IN</NavLink>;
      }

      return <NavLink className='nav-button' to={'/'}>DASHBOARD</NavLink>;
    }

    if (windowSize < 780) {
      return (
        <div className='outer-container'>
         <HamburgerMenu loggedIn={user.jwt ? true : false} pageWrapId={'page-wrap'} outerContainerId={'container'} />
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

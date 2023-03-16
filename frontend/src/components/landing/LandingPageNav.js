import React, { useEffect, useState } from 'react';
import '../../styles/landing.css';
import HamburgerMenu from './HamburgerMenu';
import { NavLink } from 'react-router-dom';

export default function LandingPageNav() {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    if (windowSize < 780) {
      return (
        <div className='outer-container'>
         <HamburgerMenu pageWrapId={'page-wrap'} outerContainerId={'container'} />
         <div className='page-wrap'>
           <header className='landing-header'>
             <i class="fa fa-cutlery logo logo-small-screen" aria-hidden="true"></i>
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
            <i class="fa fa-cutlery logo logo-big-screen" aria-hidden="true"></i>
              <h1 className='app-title-big-screen'>mealPlanner</h1>
              <NavLink className='title-link' to={"/search"}>RECIPES</NavLink>
            </section>
            <section className='nav-links-section'>
              <NavLink className='login-button' to={"/login"}>LOG IN</NavLink>
            </section>
          </header>
        </div>
      </div>
    )
};

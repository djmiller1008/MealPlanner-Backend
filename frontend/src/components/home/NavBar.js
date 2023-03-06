import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
        <section>
            <h1>MealPlanner</h1>
            <h3>Hello Username!</h3>
        </section>
        <section>
            <Link to={"/search"}>Find Recipes</Link>
            <Link to={"/create"}>Start a New Meal Plan</Link>
        </section>
    </nav>
  )
}

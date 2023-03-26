import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../landing/NavBar';
import { createUserMealPlan } from '../util/ApiUtil';

export default function CreateMealPlan() {
    const history = useHistory();
    const [mealPlanName, setMealPlanName] = useState("");

    const handleInput = (e) => {
      setMealPlanName(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      createUserMealPlan(mealPlanName).then(() => {
        history.replace("/");
      })
    }
    
    return (
      <>
        <NavBar />
        <div className='new-meal-plan-container'>
            <h1 className='mealplans-display-title'>Enter a Name For Your Meal Plan</h1>
            <form className='create-mealplan-form' onSubmit={(e) => handleSubmit(e)}>
              <section className='input-section'>
                <input className='input' onChange={(e) => handleInput(e)} type="text"></input>
              </section>
              <input className='nav-button button' type="submit" value="Create"></input>
            </form>
        </div>
      </>
    )
}

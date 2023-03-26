import React, { useEffect, useState } from 'react'
import { fetchUserMealPlans } from '../util/ApiUtil';
import '../../styles/mealPlan.css';
import MealPlanDisplayItem from './MealPlanDisplayItem';
import { Link, useHistory } from 'react-router-dom';

export default function MealPlansDisplay() {
    const history = useHistory();
    const [mealPlans, setMealPlans] = useState(null);
    
    useEffect(() => {
        fetchUserMealPlans().then(result => {
            setMealPlans(result.data);
        })
    }, []);


  return (
    <div className='mealplans-display-container'>
        <div className='mealplans-content-container'>
            <section className='mealplans-content-header'>
                <h1 className='mealplans-display-title'>My Meal Plans</h1>
                <Link to={'/create'} className='nav-button new-meal-plan-button'>Start a New Meal Plan</Link>
            </section>
            <div className='mealplan-items-container'>
                {mealPlans ? mealPlans.map((mealPlan, idx) => {
                    return (
                        <MealPlanDisplayItem key={idx} mealPlan={mealPlan} />
                    )})
                    : <></>}
            </div>
        </div>
    </div>
  )
}

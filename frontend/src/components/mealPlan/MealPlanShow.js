import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import NavBar from '../landing/NavBar';
import { fetchUserMealPlanMeals } from '../util/ApiUtil';
import MealPlanMealItem from './MealPlanMealItem';

export default function MealPlanShow() {
  const params = useParams();

  const [meals, setMeals] = useState(null);
  const [mealPlan, setMealPlan] = useState("");

  useEffect(() => {
    fetchUserMealPlanMeals(params.id).then(result => {
      setMeals(result.data.userMealsResponse);
      setMealPlan(result.data.userMealPlanResponse);
    })
  }, [])

  const renderName = () => {
    if (mealPlan.name) {
      return mealPlan.name.slice(1, -1);
    }
    return "";
  }

  return (
    <>
      <NavBar />
      <div className='mealplan-show-container'>
          <section className='mealplan-show-title-container'>
            <h1 className='mealplans-display-title'>{renderName()}</h1>
            <Link className='nav-button mealplan-show-button' to={'/search'} >Add New Recipe</Link>
          </section>
          <div className='meals-display-container'>
            {meals ? meals.map((meal, idx) => <MealPlanMealItem mealPlanId={mealPlan.id} key={idx} meal={meal} />) : ""}
          </div>
      </div>
    </>
  )
}
 
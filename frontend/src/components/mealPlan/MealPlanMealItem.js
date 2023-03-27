import React from 'react'
import { useHistory } from 'react-router-dom'

export default function MealPlanMealItem({ meal }) {
  const history = useHistory();

  const handleClick = () => {
    history.replace(`/meal/${meal.spoonacularId}`);
  }

  return (
    <div onClick={handleClick} className='mealplan-item-container'>
        <img className='mealplan-item-image' src={meal.imageUrl} alt={meal.name} />
        <section className='mealplan-item-text-section'>
            <h2>{meal.name}</h2>
        </section>
        
    </div>
  )
}

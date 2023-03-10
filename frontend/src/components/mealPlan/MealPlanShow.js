import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchUserMealPlanMeals } from '../util/ApiUtil';


export default function MealPlanShow(props) {
  const params = useParams();

  const [meals, setMeals] = useState(null);
  const [mealPlanName, setMealPlanName] = useState("");

  useEffect(() => {
    fetchUserMealPlanMeals(params.id).then(result => {
      setMeals(result.data.userMealsResponse);
      setMealPlanName(result.data.userMealPlanResponse.name);
    })
  }, [])

  
  return (
    <div>
        <h1>{mealPlanName}</h1>
        {meals ? meals.map(meal => <div>{meal.name}</div>) : ""}
    </div>
  )
}
 
import React, { useEffect, useState } from 'react'
import { fetchUserMealPlanMeals } from '../util/ApiUtil';
import { useLocalState } from '../util/LocalStorageUtil'

export default function MealPlanShow(props) {
  const [mealPlanData, setMealPlanData] = useLocalState(
      props.location.state.mealPlan,
      `mealPlan${props.location.state.mealPlan.id}`
  );

  const [meals, setMeals] = useState(null);

  useEffect(() => {
    fetchUserMealPlanMeals(mealPlanData.id).then(result => {
      setMeals(result.data);
    })
  }, [])

  
  return (
    <div>
        <h1>{mealPlanData.name}</h1>
        {meals ? meals.map(meal => <div>{meal.name}</div>) : ""}
    </div>
  )
}
 
import React, { useEffect, useState } from 'react'
import { fetchUserMealPlans } from '../util/ApiUtil';

export default function AddToMealPlan({ recipeInfo }) {
    const [mealPlans, setMealPlans] = useState(null);

    useEffect(() => {
        fetchUserMealPlans().then(result => {
            setMealPlans(result.data);
        })
    }, []);


  return (
    <div>
        <h1>Add To Which Meal Plan?</h1>
        <div>
            {mealPlans ? mealPlans.map((mealPlan, idx) => <div>{mealPlan.name}</div>) : <></>}
        </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { fetchUserMealPlans } from '../util/ApiUtil';

export default function MealPlansDisplay() {
    const [mealPlans, setMealPlans] = useState(null);

    useEffect(() => {
        fetchUserMealPlans().then(result => {
            setMealPlans(result.data);
        })
    }, []);

  return (
    <div>
        <h1>My Meal Plans</h1>
        <div>
            {mealPlans ? mealPlans.map((mealPlan, idx) => <div key={idx}>{mealPlan.name}</div>) : <></>}
        </div>
    </div>
  )
}

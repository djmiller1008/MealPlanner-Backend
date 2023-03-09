import React, { useEffect, useState } from 'react'
import { fetchUserMealPlans } from '../util/ApiUtil';
import { Link } from 'react-router-dom';

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
            {mealPlans ? mealPlans.map((mealPlan, idx) => {
                return (
                    <div key={idx}>
                        <Link to={{ pathname: `/mealPlan/${mealPlan.id}`,
                                    state: { mealPlan: mealPlan }}}>
                            {mealPlan.name}
                        </Link>
                    </div>
                )})
                : <></>}
        </div>
    </div>
  )
}

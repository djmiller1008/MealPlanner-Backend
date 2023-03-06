import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
      <div>
          <h1>Enter a Name For Your Meal Plan</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input onChange={(e) => handleInput(e)} type="text"></input>
            <input type="submit" value="Create"></input>
          </form>
      </div>
    )
}

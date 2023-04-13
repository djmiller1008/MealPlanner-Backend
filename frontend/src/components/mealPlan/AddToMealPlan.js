import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { addMealToMealPlan, fetchUserMealPlans, parseRecipeInstructions } from '../util/ApiUtil';
import NavBar from '../landing/NavBar';

export default function AddToMealPlan(props) {
    const history = useHistory();

    const recipeInfo = props.location.state.recipeInfo;
                                                    
    const recipeNutritionInfo = props.location.state.recipeNutritionInfo;
                                                           
    const [mealPlans, setMealPlans] = useState(null);

    useEffect(() => {
        fetchUserMealPlans().then(result => {
            setMealPlans(result.data);
        })
    }, []);

    const handleAddToMealPlan = async (e, mealPlanId) => {
        const mealData = {};
        mealData['name'] = recipeInfo.title;
        mealData['readyInMinutes'] = recipeInfo.readyInMinutes;
        mealData['servings'] = recipeInfo.servings;
        mealData['ingredients'] = {};
        recipeInfo.extendedIngredients.forEach(ingredient => {
            mealData['ingredients'][ingredient.name] = ingredient.aisle
        });
        mealData['mealPlanId'] = mealPlanId;
        mealData['imageUrl'] = recipeInfo.image;
        mealData['spoonacularId'] = recipeInfo.id;
        mealData['calories'] = parseInt(recipeNutritionInfo.calories.slice(0, -1));
        mealData['fat'] = parseInt(recipeNutritionInfo.fat.slice(0, -1));
        mealData['carbohydrates'] = parseInt(recipeNutritionInfo.carbs.slice(0, -1));
        mealData['protein'] = parseInt(recipeNutritionInfo.protein.slice(0, -1));

        const instructions = await parseRecipeInstructions(recipeInfo.id);
        mealData['instructions'] = instructions;
        
        addMealToMealPlan(JSON.stringify(mealData))
            .then(() => history.replace(`/mealPlan/${mealPlanId}`));
    }

  
  return (
    <>
        <NavBar />
        <h1 className='mealplans-display-title'>Add {recipeInfo.title} To Which Meal Plan?</h1>
        <div className='mealplan-items-container'>
            {mealPlans ? mealPlans.map((mealPlan, idx) => {
                return (
                    <div key={idx} onClick={e => handleAddToMealPlan(e, mealPlan.id)} className='mealplan-display-item-container'>
                        <h3>{mealPlan.name.slice(1, -1)}</h3>
                    </div>
                )}) : <></>}
            
        </div>
    </>
  )
}

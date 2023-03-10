import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { addMealToMealPlan, fetchUserMealPlans } from '../util/ApiUtil';
import { useLocalState } from '../util/LocalStorageUtil';

export default function AddToMealPlan(props) {
    const history = useHistory();

    const [recipeInfo, setRecipeInfo] = useLocalState(
                                                    props.location.state.recipeInfo,
                                                    `recipeInfo${props.location.state.recipeInfo.id}`);

    const [recipeNutritionInfo, setRecipeNutritionInfo] = useLocalState(
                                                            props.location.state.recipeNutritionInfo,
                                                            `recipeNutritionInfo${props.location.state.recipeInfo.id}`);


    const [mealPlans, setMealPlans] = useState(null);

    useEffect(() => {
        fetchUserMealPlans().then(result => {
            setMealPlans(result.data);
        })
    }, []);

    const handleAddToMealPlan = (e, mealPlanId) => {
        // TODO add the recipe to a meal plan
        // Need to pass name, readyInMinutes, servings, ingredients, instructions,
        // calories, fat, carbs, protein, img url

        //recipeInfoData.title -- name
        //recipeInfoData.readyInMinutes
        //recipeInfoData.servings 
        //recipeInfoData.extendedIngredients.forEach(ingredient => {
        //  ingredient.name : ingredient.aisle    
        //})

        //recipeInfoData.instructions -- in html 
        //All nutrition has g or k at the end, need to trim, store as int
        //recipeNutritionInfo.calories 
        //recipeNutritionInfo.carbs
        //recipeNutritionInfo.fat
        //recipeNutritionInfo.protein

        const mealData = {};
        mealData['name'] = recipeInfo.title;
        mealData['readyInMinutes'] = recipeInfo.readyInMinutes;
        mealData['servings'] = recipeInfo.servings;
        mealData['ingredients'] = {};
        recipeInfo.extendedIngredients.forEach(ingredient => {
            mealData['ingredients'][ingredient.name] = ingredient.aisle
        });
        mealData['mealPlanId'] = mealPlanId;

        addMealToMealPlan(JSON.stringify(mealData))
            .then(() => history.replace(`/mealPlan/${mealPlanId}`));
    }

  
  return (
    <div>
        <h1>Add To Which Meal Plan?</h1>
        <h2>Recipe: {recipeInfo.id}</h2>
        <div>
            {mealPlans ? mealPlans.map((mealPlan, idx) => {
                return (
                    <div>
                        <span onClick={e => handleAddToMealPlan(e, mealPlan.id)}>{mealPlan.name}</span>
                    </div>
                )}) : <></>}
        </div>
    </div>
  )
}

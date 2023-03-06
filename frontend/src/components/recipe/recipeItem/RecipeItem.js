import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser';
import { fetchRecipeInfo, 
         fetchRecipeNutritionInfo } from '../../util/ApiUtil';

export default function RecipeItem() {
  const params = useParams();
  const [recipeInfo, setRecipeInfo] = useState({});
  const [recipeNutritionInfo, setRecipeNutritionInfo] = useState({});
  
  useEffect(() => {
    async function getRecipeInfo() {
        const recipeInfoResponse = await fetchRecipeInfo(params.id);
        setRecipeInfo(recipeInfoResponse);
    }

    async function getRecipeNutritionInfo() {
      const recipeNutritionInfo = await fetchRecipeNutritionInfo(params.id);
      setRecipeNutritionInfo(recipeNutritionInfo);
    }

    getRecipeInfo();
    getRecipeNutritionInfo();
  }, []);

  if (JSON.stringify(recipeInfo) === '{}') {
    return (   
        <div>Loading...</div>
    )
  } else {
    return (
      <div>
          <h1>{recipeInfo.title}</h1>
          <img src={recipeInfo.image} alt={recipeInfo.title}></img>
          <section>
            <p>Ready in: {recipeInfo.readyInMinutes} minutes</p>
            <p>Servings: {recipeInfo.servings}</p>
            <h3>Ingredients</h3>
            <ul>
              {Object.values(recipeInfo.extendedIngredients).map((ingredient, idx) => <li key={idx}>{ingredient.original}</li>)}
            </ul>
            <h3>Instructions</h3>
            <div>{parse(recipeInfo.instructions)}</div>
          </section>
          <section>
            <h3>Nutrition per Serving</h3>
            <p>Calories: {recipeNutritionInfo.calories}</p>
            <p>Fat: {recipeNutritionInfo.fat}</p>
            <p>Carbohydrates: {recipeNutritionInfo.carbs}</p>
            <p>Protein: {recipeNutritionInfo.protein}</p>
          </section>
      </div>
    )
  } 
}

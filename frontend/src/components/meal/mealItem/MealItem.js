import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchRecipeInfo, 
         fetchRecipeNutritionInfo } from '../../util/ApiUtil';

import NavBar from '../../landing/NavBar';
import MealItemToggleInfo from './MealItemToggleInfo';
import '../../../styles/mealItem.css';

export default function MealItem() {
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
      <div className='loading-container'>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
     
    )
  } else {
    return (
      <>
        <NavBar />
        <div className='meal-item-container'>
          <div className='meal-item-title-div'>
            <a className='back-arrow' href="/search">←</a>
            <h1 className='meal-item-title'>{recipeInfo.title}</h1>
          </div>
          <div className='meal-item-info-div'>
            <div className='meal-item-info-wrapper'>
              <section className='minutes-and-servings'>
                <p className='minutes'>{recipeInfo.readyInMinutes} minutes</p>
                <p>{recipeInfo.servings} servings</p>
              </section>
              <section className='add-to-meal-plan-section'>
                <Link className='nav-button' to={{ pathname: '/addMeal',
                      state: { recipeInfo: recipeInfo,
                               recipeNutritionInfo: recipeNutritionInfo }}}>
                        Add To Meal Plan</Link>
              </section>
            </div>
            <section className='meal-item-image-section'>
              <img className='meal-item-image' src={recipeInfo.image} alt={recipeInfo.title}></img>
            </section>
            <MealItemToggleInfo recipeInfo={recipeInfo} />
          </div>
          
        </div>
      </>
    )
  } 
}

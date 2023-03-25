import React from 'react';
import MealSearchListItem from './MealSearchListItem';

export default function MealSearchList({ recipes }) {

  return (
    <div className='search-results-div'>
        {recipes.map((recipe, idx) => <MealSearchListItem key={idx} recipe={recipe} />)}
    </div>
  )
}

import React from 'react';
import MealSearchListItem from './MealSearchListItem';

export default function MealSearchList({ recipes }) {

  return (
    <div className='search-results-div'>
        {recipes.map(recipe => <MealSearchListItem recipe={recipe} />)}
    </div>
  )
}

import React from 'react';
import MealSearchListItem from './MealSearchListItem';

export default function MealSearchList({ recipes }) {

  return (
    <div>
        {recipes.map(recipe => <li><MealSearchListItem recipe={recipe} /></li>)}
    </div>
  )
}

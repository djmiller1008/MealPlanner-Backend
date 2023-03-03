import React from 'react';
import RecipeSearchListItem from './RecipeSearchListItem';

export default function RecipeSearchList({ recipes }) {

  return (
    <div>
        {recipes.map(recipe => <li><RecipeSearchListItem recipe={recipe} /></li>)}
    </div>
  )
}

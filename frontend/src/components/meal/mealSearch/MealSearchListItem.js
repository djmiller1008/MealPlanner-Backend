import React from 'react'
import { Link } from 'react-router-dom'

export default function MealSearchListItem({ recipe }) {


  return (
    <div>
        <Link to={`meal/${recipe.id}`}><h3>{recipe.title}</h3></Link>
        <img src={recipe.image} alt={recipe.title}></img>
    </div>
  )
}

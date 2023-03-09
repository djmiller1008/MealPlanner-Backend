import React from 'react'
import MealPlansDisplay from '../mealPlan/MealPlansDisplay'
import NavBar from './NavBar'

export default function Dashboard(props) {

  return (
    <>
      <NavBar />
      <MealPlansDisplay />
    </>
  )
}


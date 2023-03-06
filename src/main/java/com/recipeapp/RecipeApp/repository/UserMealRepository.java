package com.recipeapp.RecipeApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.recipeapp.RecipeApp.domain.UserMeal;

public interface UserMealRepository extends JpaRepository<UserMeal, Long> {
    
}

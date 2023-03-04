package com.recipeapp.RecipeApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.recipeapp.RecipeApp.domain.UserRecipe;

public interface UserRecipeRepository extends JpaRepository<UserRecipe, Long> {
    
}

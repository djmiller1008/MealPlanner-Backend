package com.recipeapp.RecipeApp.repository;

import com.recipeapp.RecipeApp.domain.UserMealPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMealPlanRepository extends JpaRepository<UserMealPlan, Long> {
    
}

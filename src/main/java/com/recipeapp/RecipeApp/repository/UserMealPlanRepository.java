package com.recipeapp.RecipeApp.repository;

import com.recipeapp.RecipeApp.domain.User;
import com.recipeapp.RecipeApp.domain.UserMealPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;


public interface UserMealPlanRepository extends JpaRepository<UserMealPlan, Long> {
    
    Set<UserMealPlan> findByUser(User user);
}

package com.recipeapp.RecipeApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipeapp.RecipeApp.domain.UserMeal;
import com.recipeapp.RecipeApp.domain.UserMealPlan;
import com.recipeapp.RecipeApp.repository.UserMealRepository;
import com.recipeapp.RecipeApp.repository.UserMealPlanRepository;

import java.util.Map;

 
@Service
public class UserMealService {

    @Autowired
    private UserMealRepository userMealRepository;

    @Autowired
    private UserMealPlanRepository userMealPlanRepository;
    
    public UserMeal createUserMeal(Map<String, Object> payload) {
        UserMeal userMeal = new UserMeal();

        int readyInMinutes = Integer.valueOf(String.valueOf(payload.get("readyInMinutes")));
        int servings = Integer.valueOf(String.valueOf(payload.get("servings")));
        String ingredients = String.valueOf(payload.get("ingredients"));
        String name = String.valueOf(payload.get("name"));
        Long mealPlanId = Long.valueOf(String.valueOf(payload.get("mealPlanId")));

        UserMealPlan userMealPlan = userMealPlanRepository.findById(mealPlanId).get();

        userMeal.setName(name);
        userMeal.setServings(servings);
        userMeal.setReadyInMinutes(readyInMinutes);
        userMeal.setIngredients(ingredients);
        userMeal.setUserMealPlan(userMealPlan);

        userMealPlan.addMeal(userMeal);

        return userMealRepository.save(userMeal);
    }
}

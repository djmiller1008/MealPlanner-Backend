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

    @Autowired
    private UserMealPlanService userMealPlanService;
    
    public UserMeal createUserMeal(Map<String, Object> payload) {
        UserMeal userMeal = new UserMeal();

        int readyInMinutes = Integer.valueOf(String.valueOf(payload.get("readyInMinutes")));
        int servings = Integer.valueOf(String.valueOf(payload.get("servings")));
        String ingredients = String.valueOf(payload.get("ingredients"));
        String instructions = String.valueOf(payload.get("instructions"));
        String name = String.valueOf(payload.get("name"));
        Long mealPlanId = Long.valueOf(String.valueOf(payload.get("mealPlanId")));
        String imageUrl = String.valueOf(payload.get("imageUrl"));
        int calories = Integer.valueOf(String.valueOf(payload.get("calories")));
        int carbohydrates = Integer.valueOf(String.valueOf(payload.get("carbohydrates")));
        int fat = Integer.valueOf(String.valueOf(payload.get("fat")));
        int protein = Integer.valueOf(String.valueOf(payload.get("protein")));
        int spoonacularId = Integer.valueOf(String.valueOf(payload.get("spoonacularId")));

        UserMealPlan userMealPlan = userMealPlanRepository.findById(mealPlanId).get();

        userMeal.setName(name);
        userMeal.setServings(servings);
        userMeal.setReadyInMinutes(readyInMinutes);
        userMeal.setIngredients(ingredients);
        userMeal.setInstructions(instructions);
        userMeal.setUserMealPlan(userMealPlan);
        userMeal.setImageUrl(imageUrl);
        userMeal.setCalories(calories);
        userMeal.setFat(fat);
        userMeal.setCarbohydrates(carbohydrates);
        userMeal.setProtein(protein);
        userMeal.setSpoonacularId(spoonacularId);

        userMealPlan.addMeal(userMeal);
        userMealPlan.setNumberOfMeals(userMealPlan.getMeals().size());

        return userMealRepository.save(userMeal);
    }

    public void delete(Long mealId, Long mealPlanId) {
        userMealPlanService.deleteMealById(mealPlanId, mealId);
        userMealRepository.deleteById(mealId);
    }
}

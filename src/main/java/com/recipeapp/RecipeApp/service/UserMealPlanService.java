package com.recipeapp.RecipeApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipeapp.RecipeApp.repository.UserMealPlanRepository;
import com.recipeapp.RecipeApp.domain.User;
import com.recipeapp.RecipeApp.domain.UserMealPlan;
import com.recipeapp.RecipeApp.domain.UserMeal;

import java.util.List;
import java.util.Set;

@Service
public class UserMealPlanService {

    @Autowired
    private UserMealPlanRepository userMealPlanRepository;

    public UserMealPlan createUserMealPlan(User user, String name) {
        UserMealPlan userMealPlan = new UserMealPlan();
        userMealPlan.setName(name);
        userMealPlan.setUser(user);
        return userMealPlanRepository.save(userMealPlan);
    }

    public Set<UserMealPlan> findByUser(User user) {
        return userMealPlanRepository.findByUser(user);
    }

    public List<UserMeal> findMealsByMealPlanId(Long mealPlanId) {
        UserMealPlan userMealPlan = userMealPlanRepository.findById(mealPlanId).get();
        return userMealPlan.getMeals();
    }

    public UserMealPlan findById(Long mealPlanId) {
        UserMealPlan userMealPlan = userMealPlanRepository.findById(mealPlanId).get();
        return userMealPlan;
    }
}

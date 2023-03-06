package com.recipeapp.RecipeApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipeapp.RecipeApp.repository.UserMealPlanRepository;
import com.recipeapp.RecipeApp.domain.User;
import com.recipeapp.RecipeApp.domain.UserMealPlan;

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
}

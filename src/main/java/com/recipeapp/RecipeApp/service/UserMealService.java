package com.recipeapp.RecipeApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipeapp.RecipeApp.domain.UserMeal;
import com.recipeapp.RecipeApp.repository.UserMealRepository;
 
@Service
public class UserMealService {

    @Autowired
    private UserMealRepository userMealRepository;
    
    public UserMeal createUserMeal(String name) {
        UserMeal userMeal = new UserMeal();
        userMeal.setName(name);
        return userMealRepository.save(userMeal);
    }
}

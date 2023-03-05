package com.recipeapp.RecipeApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipeapp.RecipeApp.domain.UserRecipe;
import com.recipeapp.RecipeApp.domain.User;
import com.recipeapp.RecipeApp.repository.UserRecipeRepository;

@Service
public class UserRecipeService {

    @Autowired
    private UserRecipeRepository userRecipeRepository;
    
    public UserRecipe createUserRecipe(User user, String name) {
        UserRecipe userRecipe = new UserRecipe();
        userRecipe.setName(name);
        userRecipe.setUser(user);
        return userRecipeRepository.save(userRecipe);
    }
}

package com.recipeapp.RecipeApp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recipeapp.RecipeApp.domain.User;
import com.recipeapp.RecipeApp.domain.UserRecipe;
import com.recipeapp.RecipeApp.service.UserRecipeService;

@RestController
@RequestMapping("/api/user-recipes")
public class UserRecipeController {

    @Autowired
    private UserRecipeService userRecipeService;

    @PostMapping("")
    public ResponseEntity<?> createUserRecipe(@RequestBody String name, @AuthenticationPrincipal User user) {
        UserRecipe newUserRecipe = userRecipeService.createUserRecipe(user, name);
        return ResponseEntity.ok(newUserRecipe);
    }
}

package com.recipeapp.RecipeApp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recipeapp.RecipeApp.domain.UserMeal;
import com.recipeapp.RecipeApp.service.UserMealService;

@RestController
@RequestMapping("/api/user-meals")
public class UserMealController {

    @Autowired
    private UserMealService userMealService;

    @PostMapping("")
    public ResponseEntity<?> createUserMeal(@RequestBody String name) {
        UserMeal newUserMeal = userMealService.createUserMeal( name);
        return ResponseEntity.ok(newUserMeal);
    }
}

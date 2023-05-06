package com.recipeapp.RecipeApp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.recipeapp.RecipeApp.domain.UserMeal;
import com.recipeapp.RecipeApp.service.UserMealService;

import java.util.Map;

@CrossOrigin(origins = "https://mealtime.herokuapp.com/")
@RestController
@RequestMapping("/api/user-meals")
public class UserMealController {

    @Autowired
    private UserMealService userMealService;
 
    @PostMapping("")
    public ResponseEntity<?> createUserMeal(@RequestBody Map<String, Object> payload) {
        UserMeal newUserMeal = userMealService.createUserMeal(payload);
        return ResponseEntity.ok(newUserMeal);
    }

    @DeleteMapping(value = "/{mealPlanId}/{mealId}")
    public ResponseEntity<?> deleteMealFromMealPlan(@PathVariable Long mealId, @PathVariable Long mealPlanId) {
        try {
            userMealService.delete(mealId, mealPlanId);
            return ResponseEntity.ok("Meal Deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

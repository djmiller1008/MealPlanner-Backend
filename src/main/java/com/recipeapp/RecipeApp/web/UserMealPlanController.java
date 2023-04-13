package com.recipeapp.RecipeApp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.recipeapp.RecipeApp.dto.UserMealPlanResponse;
import com.recipeapp.RecipeApp.service.UserMealPlanService;
import com.recipeapp.RecipeApp.domain.User;
import com.recipeapp.RecipeApp.domain.UserMealPlan;

@RestController
@RequestMapping("/api/user-mealplans")
public class UserMealPlanController {
    
    @Autowired
    private UserMealPlanService userMealPlanService;

    @PostMapping("")
    public ResponseEntity<?> createUserMealPlan(@AuthenticationPrincipal User user, @RequestBody String name) {
        UserMealPlan newUserMealPlan = userMealPlanService.createUserMealPlan(user, name);
        return ResponseEntity.ok(newUserMealPlan);
    }

    @GetMapping("")
    public ResponseEntity<?> fetchUserMealPlans(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userMealPlanService.findByUser(user));
    }

    @GetMapping("{mealPlanId}")
    public ResponseEntity<UserMealPlanResponse<?,?>> fetchUserMealPlan(@PathVariable Long mealPlanId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(new UserMealPlanResponse<>(
                        userMealPlanService.findMealsByMealPlanId(mealPlanId),
                        userMealPlanService.findById(mealPlanId))
        );
    }

    @DeleteMapping("{mealPlanId}")
    public ResponseEntity<?> deleteMealPlan(@PathVariable Long mealPlanId) {
        try {
            userMealPlanService.deleteMealPlanById(mealPlanId);
            return ResponseEntity.ok("Meal Plan Deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

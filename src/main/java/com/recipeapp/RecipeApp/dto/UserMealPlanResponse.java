package com.recipeapp.RecipeApp.dto;

public class UserMealPlanResponse<T, K> {
    
    private T userMealsResponse;
    private K userMealPlanResponse;


    public UserMealPlanResponse(T userMealsResponse, K userMealPlanResponse) {
        this.userMealsResponse = userMealsResponse;
        this.userMealPlanResponse = userMealPlanResponse;
    }


    public T getUserMealsResponse() {
        return this.userMealsResponse;
    }

    public void setUserMealsResponse(T userMealsResponse) {
        this.userMealsResponse = userMealsResponse;
    }

    public K getUserMealPlanResponse() {
        return this.userMealPlanResponse;
    }

    public void setUserMealPlanResponse(K userMealPlanResponse) {
        this.userMealPlanResponse = userMealPlanResponse;
    }

}

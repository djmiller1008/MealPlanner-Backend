package com.recipeapp.RecipeApp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;


@Entity 
public class UserMeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int readyInMinutes;
    private int servings;

    @Column(columnDefinition = "text")
    private String ingredients;

    @Column(columnDefinition = "text")
    
    private String instructions;
    private int calories;
    private int fat;
    private int carbohydrates;
    private int protein;
    private int spoonacularId;
    private String imageUrl;

    @ManyToOne
    private UserMealPlan userMealPlan;


    public String getIngredients() {
        return this.ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    public int getSpoonacularId() {
        return this.spoonacularId;
    }

    public void setSpoonacularId(int spoonacularId) {
        this.spoonacularId = spoonacularId;
    }

    public UserMealPlan getUserMealPlan() {
        return this.userMealPlan;
    }

    public void setUserMealPlan(UserMealPlan userMealPlan) {
        this.userMealPlan = userMealPlan;
    }


    public int getReadyInMinutes() {
        return this.readyInMinutes;
    }

    public void setReadyInMinutes(int readyInMinutes) {
        this.readyInMinutes = readyInMinutes;
    }

    public int getServings() {
        return this.servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public String getInstructions() {
        return this.instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public int getCalories() {
        return this.calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public int getFat() {
        return this.fat;
    }

    public void setFat(int fat) {
        this.fat = fat;
    }

    public int getCarbohydrates() {
        return this.carbohydrates;
    }

    public void setCarbohydrates(int carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public int getProtein() {
        return this.protein;
    }

    public void setProtein(int protein) {
        this.protein = protein;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}

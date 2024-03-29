package com.recipeapp.RecipeApp.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GenerationType;

@Entity
public class UserMealPlan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int numberOfMeals;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonBackReference
    private List<UserMeal> meals = new ArrayList<>();

    @ManyToOne
    @JsonIgnore
    private User user;


    public int getNumberOfMeals() {
        this.numberOfMeals = this.meals.size();
        return this.numberOfMeals;
    }

    public void setNumberOfMeals(int numberOfMeals) {
        this.numberOfMeals = numberOfMeals;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public List<UserMeal> getMeals() {
        return this.meals;
    }

    public void setMeals(List<UserMeal> meals) {
        this.meals = meals;
    }

    public void addMeal(UserMeal meal) {
        this.meals.add(meal);
    }
}

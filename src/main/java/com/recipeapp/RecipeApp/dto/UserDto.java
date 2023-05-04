package com.recipeapp.RecipeApp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;

public class UserDto {

    @Column(unique=true)
    @JsonProperty("username")
    @NotBlank(message = "Please Enter a Username")
    private String username;


    @NotBlank(message = "Please Enter a Password")
    @JsonProperty("password")
    private String password;


    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}

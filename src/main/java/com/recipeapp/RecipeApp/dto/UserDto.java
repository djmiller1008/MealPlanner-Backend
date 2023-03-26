package com.recipeapp.RecipeApp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserDto {
    @JsonProperty("username")
    private String username;

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

package com.recipeapp.RecipeApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recipeapp.RecipeApp.domain.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    
}

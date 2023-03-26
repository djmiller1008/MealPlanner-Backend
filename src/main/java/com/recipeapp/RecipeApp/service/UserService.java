package com.recipeapp.RecipeApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.recipeapp.RecipeApp.repository.AuthorityRepository;
import com.recipeapp.RecipeApp.repository.UserRepository;
import com.recipeapp.RecipeApp.domain.Authority;
import com.recipeapp.RecipeApp.domain.User;
import com.recipeapp.RecipeApp.dto.UserDto;

@Service
public class UserService {
    
    @Autowired 
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void createUser(UserDto userDto) {
        User newUser = new User();
        newUser.setUsername(userDto.getUsername());
        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        newUser.setPassword(encodedPassword);
        userRepository.save(newUser);

        Authority authority = new Authority();
        authority.setAuthority("ROLE_USER");
        authority.setUser(newUser);
        authorityRepository.save(authority);
    }
}

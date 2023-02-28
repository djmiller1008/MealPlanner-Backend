package com.recipeapp.RecipeApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.recipeapp.RecipeApp.domain.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // needs to talk to repository, see if user exists
        User user = new User();
        user.setUsername(username);
        user.setPassword((passwordEncoder.encode("password")));
        user.setId(1L);
        return user;
    }
}

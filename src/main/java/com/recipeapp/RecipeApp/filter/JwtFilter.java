package com.recipeapp.RecipeApp.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;

import java.io.IOException;

import com.recipeapp.RecipeApp.repository.UserRepository;
import com.recipeapp.RecipeApp.util.JwtUtil;

import java.util.Optional;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        if (request.getCookies() == null) {
            chain.doFilter(request, response);
            return;
        }
        // Get authorization header and validate
        Optional<Cookie> jwtOpt = Arrays.stream(request.getCookies())
              .filter(cookie -> "jwt".equals(cookie.getName()))
              .findAny();
        
        if (jwtOpt.isEmpty()) {
            chain.doFilter(request, response);
            return;
        }

        String token = jwtOpt.get().getValue();
        UserDetails userDetails = userRepository.findByUsername(jwtUtil.getUsernameFromToken(token))
                                        .orElse(null);
      
        
        // Get jwt token and validate
        if (!jwtUtil.validateToken(token, userDetails)) {
            chain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken
            authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null,
                userDetails == null ?
                    List.of() : userDetails.getAuthorities()
            );

        authentication.setDetails(
            new WebAuthenticationDetailsSource().buildDetails(request)
        );

        // User is valid 
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        chain.doFilter(request, response);
        
    }
}

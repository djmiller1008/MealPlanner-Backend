package com.recipeapp.RecipeApp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recipeapp.RecipeApp.domain.User;
import com.recipeapp.RecipeApp.dto.UserDto;
import com.recipeapp.RecipeApp.service.UserService;
import com.recipeapp.RecipeApp.util.JwtUtil;

import ch.qos.logback.core.util.Duration;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${cookies.domain}")
    private String domain;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    private ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        userService.createUser(userDto);

        try {
            Authentication authenticate = authenticationManager
                .authenticate(
                    new UsernamePasswordAuthenticationToken(
                        userDto.getUsername(), userDto.getPassword()
                    )
                );

                User user = (User) authenticate.getPrincipal();
                user.setPassword(null);
                String token = jwtUtil.generateToken(user);
                ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .domain(domain)
                    .path("/")
                    .maxAge(Duration.buildByDays(365).getMilliseconds())
                    .build();
    
                return ResponseEntity.ok()
                    .header(
                        HttpHeaders.SET_COOKIE,
                        cookie.toString()
                    )
                    .body(
                        token
                    );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

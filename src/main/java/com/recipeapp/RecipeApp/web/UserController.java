package com.recipeapp.RecipeApp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.FieldError;

import com.recipeapp.RecipeApp.domain.User;
import com.recipeapp.RecipeApp.dto.UserDto;
import com.recipeapp.RecipeApp.service.UserService;
import com.recipeapp.RecipeApp.util.JwtUtil;
import org.springframework.web.bind.annotation.CrossOrigin;

import ch.qos.logback.core.util.Duration;
import jakarta.validation.Valid;

import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "https://mealtime.herokuapp.com/")
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
    private ResponseEntity<?> createUser(@Valid @RequestBody UserDto userDto) {
        userService.createUser(userDto);
       
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
        
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
}

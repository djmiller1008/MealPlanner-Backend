package com.recipeapp.RecipeApp.web;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.ExpiredJwtException;

import com.recipeapp.RecipeApp.dto.AuthCredentialsRequest;
import com.recipeapp.RecipeApp.util.JwtUtil;
import com.recipeapp.RecipeApp.domain.User;

import ch.qos.logback.core.util.Duration;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${cookies.domain}")
    private String domain;
    
    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody AuthCredentialsRequest request) {
        try {
            Authentication authenticate = authenticationManager
                .authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
                    
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
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }

    @PostMapping("/demo")
    public ResponseEntity<?> demoLogin() {
        Authentication authenticate = authenticationManager
                .authenticate(
                    new UsernamePasswordAuthenticationToken("demoaccount", "demoaccountpassword")
                    
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

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@CookieValue(name = "jwt") String token, @AuthenticationPrincipal User user) {
        try {
            Boolean validated = jwtUtil.validateToken(token, user);
            return ResponseEntity.ok(validated);
        } catch (ExpiredJwtException e) {
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout () {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .domain(domain)
                .path("/")
                .maxAge(0)
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString()).body("ok");
    }
}

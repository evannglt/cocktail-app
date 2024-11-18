package com.cocktail27.api.controller;

import com.cocktail27.api.dto.AuthRequest;
import com.cocktail27.api.dto.AuthResponse;
import com.cocktail27.api.dto.APIResponse;
import com.cocktail27.api.dto.RegisterRequest;
import com.cocktail27.api.model.User;
import com.cocktail27.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            User newUser = authService.registerUser(registerRequest);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new APIResponse(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            AuthResponse authResponse = authService.login(authRequest);
            return ResponseEntity.ok(authResponse);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(new APIResponse("Invalid username or password"));
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        boolean isValid = authService.validateToken(token);
        return isValid ? ResponseEntity.ok(new APIResponse("Token is valid"))
                : ResponseEntity.badRequest().body(new APIResponse("Invalid token"));
    }
}

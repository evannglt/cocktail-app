package com.cocktail27.api.controller;

import com.cocktail27.api.dto.APIResponse;
import com.cocktail27.api.dto.AuthRequest;
import com.cocktail27.api.dto.AuthResponse;
import com.cocktail27.api.dto.RegisterRequest;
import com.cocktail27.api.service.AuthService;
import com.cocktail27.api.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.MalformedJwtException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private AuthService authService;

        @MockBean
        private UserService userService;

        @Test
        public void testBadLogin() throws Exception {
                AuthRequest authRequest = AuthRequest.builder()
                                .username("wrongUser")
                                .password("wrongPassword")
                                .build();

                when(authService.login(any(AuthRequest.class)))
                                .thenThrow(new BadCredentialsException("Invalid username or password"));

                mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(authRequest)))
                                .andExpect(status().isUnauthorized())
                                .andExpect(content().string(new ObjectMapper()
                                                .writeValueAsString(new APIResponse("Invalid username or password"))));
        }

        @Test
        public void testBadSignupDifferentPasswords() throws Exception {
                RegisterRequest registerRequest = RegisterRequest.builder()
                                .username("testUser")
                                .password("password123")
                                .passwordConfirmation("password456")
                                .name("Test User")
                                .email("test@example.com")
                                .build();

                when(authService.registerUser(any(RegisterRequest.class)))
                                .thenThrow(new RuntimeException("Passwords do not match"));

                mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(registerRequest)))
                                .andExpect(status().isBadRequest())
                                .andExpect(content().string(new ObjectMapper()
                                                .writeValueAsString(new APIResponse("Passwords do not match"))));
        }

        @Test
        public void testBadSignupUsernameTaken() throws Exception {
                RegisterRequest registerRequest = RegisterRequest.builder()
                                .username("existingUser")
                                .password("password123")
                                .passwordConfirmation("password123")
                                .name("Existing User")
                                .email("existing@example.com")
                                .build();

                when(authService.registerUser(any(RegisterRequest.class)))
                                .thenThrow(new RuntimeException("Username already taken"));

                mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(registerRequest)))
                                .andExpect(status().isBadRequest())
                                .andExpect(content().string(new ObjectMapper()
                                                .writeValueAsString(new APIResponse("Username already taken"))));
        }

        @Test
        public void testBadSignupInvalidEmail() throws Exception {
                RegisterRequest registerRequest = RegisterRequest.builder()
                                .username("testUser")
                                .password("password123")
                                .passwordConfirmation("password123")
                                .name("Test User")
                                .email("invalid-email")
                                .build();

                when(authService.registerUser(any(RegisterRequest.class)))
                                .thenThrow(new RuntimeException("Invalid email format"));

                mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(registerRequest)))
                                .andExpect(status().isBadRequest())
                                .andExpect(content().string(new ObjectMapper()
                                                .writeValueAsString(new APIResponse("Invalid email format"))));
        }

        @Test
        public void testGoodLogin() throws Exception {
                AuthRequest authRequest = AuthRequest.builder()
                                .username("testUser")
                                .password("password123")
                                .build();

                when(authService.login(any(AuthRequest.class)))
                                .thenReturn(new AuthResponse("validMockToken"));

                mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(authRequest)))
                                .andExpect(status().isOk())
                                .andExpect(content().string(new ObjectMapper()
                                                .writeValueAsString(new AuthResponse("validMockToken"))));
        }

        @Test
        public void testGoodSignup() throws Exception {
                RegisterRequest registerRequest = RegisterRequest.builder()
                                .username("newUser")
                                .password("password123")
                                .passwordConfirmation("password123")
                                .name("New User")
                                .email("newuser@example.com")
                                .build();

                when(authService.registerUser(any(RegisterRequest.class))).thenReturn(true);

                mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(registerRequest)))
                                .andExpect(status().isOk());
        }

        @Test
        public void testValidateToken() throws Exception {
                String validToken = "validMockToken";

                when(authService.validateToken(validToken)).thenReturn(true);

                mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/validate")
                                .param("token", validToken))
                                .andExpect(status().isOk())
                                .andExpect(content().string(new ObjectMapper()
                                                .writeValueAsString(new APIResponse("Token is valid"))));
        }

        @Test
        public void testInvalidateToken() throws Exception {
                String invalidToken = "invalidMockToken";

                when(authService.validateToken(invalidToken)).thenReturn(false);

                mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/validate")
                                .param("token", invalidToken))
                                .andExpect(status().isBadRequest())
                                .andExpect(content().string(new ObjectMapper()
                                                .writeValueAsString(new APIResponse("Invalid token"))));
        }

        @Test
        public void testProtectedEndpointWithoutToken() throws Exception {
                mockMvc.perform(MockMvcRequestBuilders.get("/api/users"))
                                .andExpect(status().isUnauthorized());
        }

        @Test
        public void testProtectedEndpointWithValidToken() throws Exception {
                String validToken = "validMockToken";
                String username = "testUser";

                when(authService.getUsernameFromToken(any())).thenReturn(username);
                when(authService.validateToken(any())).thenReturn(true);
                when(authService.loadUserByUsername(any()))
                                .thenReturn(new org.springframework.security.core.userdetails.User(username,
                                                "password hash",
                                                new ArrayList<>()));
                when(userService.getAllUsers()).thenReturn(new ArrayList<>());

                mockMvc.perform(MockMvcRequestBuilders.get("/api/users")
                                .header("Authorization", "Bearer " + validToken))
                                .andExpect(status().isOk());
        }

        @Test
        public void testProtectedEndpointWithMalformedToken() throws Exception {
                String invalidToken = "invalidMockToken";

                when(authService.getUsernameFromToken(invalidToken))
                                .thenThrow(new MalformedJwtException("JWT is Malformed"));

                mockMvc.perform(MockMvcRequestBuilders.get("/api/users")
                                .header("Authorization", "Bearer " + invalidToken))
                                .andExpect(status().isUnauthorized());
        }

        @Test
        public void testProtectedEndpointWithExpiredToken() throws Exception {
                String expiredToken = "expiredMockToken";

                when(authService.getUsernameFromToken(any())).thenReturn(expiredToken);
                when(authService.validateToken(expiredToken)).thenReturn(false);

                mockMvc.perform(MockMvcRequestBuilders.get("/api/users")
                                .header("Authorization", "Bearer " + expiredToken))
                                .andExpect(status().isUnauthorized());
        }
}
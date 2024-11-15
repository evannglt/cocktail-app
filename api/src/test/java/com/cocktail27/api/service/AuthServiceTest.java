package com.cocktail27.api.service;

import com.cocktail27.api.dto.AuthRequest;
import com.cocktail27.api.dto.AuthResponse;
import com.cocktail27.api.dto.RegisterRequest;
import com.cocktail27.api.model.User;
import com.cocktail27.api.repository.UserRepository;
import com.cocktail27.api.security.JwtTokenUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private JwtTokenUtil jwtTokenUtil;

    private User testUser;
    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .username("testuser")
                .password("encodedPassword")
                .name("Test User")
                .email("testuser@example.com")
                .role("ROLE_USER")
                .build();

        registerRequest = RegisterRequest.builder()
                .username("testuser")
                .password("password123")
                .passwordConfirmation("password123")
                .name("Test User")
                .email("testuser@example.com")
                .build();
    }

    @Test
    public void testLoadUserByUsername_Success() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));

        UserDetails userDetails = authService.loadUserByUsername("testuser");

        assertEquals("testuser", userDetails.getUsername());
        assertEquals("encodedPassword", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_USER")));
    }

    @Test
    public void testLoadUserByUsername_UserNotFound() {
        when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> authService.loadUserByUsername("unknown"));
    }

    @Test
    public void testRegisterUser_Success() {
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("testuser@example.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        User registeredUser = authService.registerUser(registerRequest);

        assertEquals("testuser", registeredUser.getUsername());
        assertEquals("Test User", registeredUser.getName());
        verify(userRepository).save(any(User.class));
    }

    @Test
    public void testRegisterUser_PasswordsDoNotMatch() {
        registerRequest.setPasswordConfirmation("differentPassword");

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.registerUser(registerRequest));
        assertEquals("Passwords do not match", exception.getMessage());
    }

    @Test
    public void testRegisterUser_UsernameAlreadyTaken() {
        when(userRepository.existsByUsername("testuser")).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.registerUser(registerRequest));
        assertEquals("Username is already taken", exception.getMessage());
    }

    @Test
    public void testRegisterUser_EmailAlreadyInUse() {
        when(userRepository.existsByEmail("testuser@example.com")).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.registerUser(registerRequest));
        assertEquals("Email is already in use", exception.getMessage());
    }

    @Test
    public void testRegisterUser_InvalidEmailFormat() {
        registerRequest.setEmail("invalid-email");

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.registerUser(registerRequest));
        assertEquals("Invalid email format", exception.getMessage());
    }

    @Test
    public void testLogin_Success() {
        AuthRequest authRequest = new AuthRequest("testuser", "password123");
        Authentication authentication = mock(Authentication.class);
        UserDetails userDetails = mock(UserDetails.class);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(jwtTokenUtil.generateToken(userDetails)).thenReturn("mockToken");

        AuthResponse authResponse = authService.login(authRequest);

        assertEquals("mockToken", authResponse.getToken());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    public void testLogin_BadCredentials() {
        AuthRequest authRequest = new AuthRequest("testuser", "wrongPassword");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        assertThrows(BadCredentialsException.class, () -> authService.login(authRequest));
    }

    @Test
    public void testValidateToken_Valid() {
        when(jwtTokenUtil.validateToken("validToken")).thenReturn(true);

        assertTrue(authService.validateToken("validToken"));
    }

    @Test
    public void testValidateToken_Invalid() {
        when(jwtTokenUtil.validateToken("invalidToken")).thenReturn(false);

        assertFalse(authService.validateToken("invalidToken"));
    }

    @Test
    public void testGetUsernameFromToken() {
        when(jwtTokenUtil.getUsernameFromToken("validToken")).thenReturn("testuser");

        String username = authService.getUsernameFromToken("validToken");

        assertEquals("testuser", username);
    }

    @Test
    public void testGetPrincipal() {
        Authentication authentication = mock(Authentication.class);
        UserDetails userDetails = mock(UserDetails.class);

        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("testuser");

        String principal = authService.getPrincipal(authentication);

        assertEquals("testuser", principal);
    }
}

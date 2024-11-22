package com.cocktail27.api.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.cocktail27.api.dto.UserUpdateDTO;
import com.cocktail27.api.model.User;
import com.cocktail27.api.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
@ActiveProfiles("test")
class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private User mockUser;

    @BeforeEach
    void setUp() {
        mockUser = User.builder()
                .id(1L)
                .username("testuser")
                .name("Test User")
                .email("testuser@example.com")
                .password("encodedPassword")
                .build();
    }

    @Test
    void testGetAllUsers() {
        List<User> users = List.of(mockUser);
        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.getAllUsers();

        assertEquals(users, result);
        verify(userRepository).findAll();
    }

    @Test
    void testGetUserById_Found() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        Optional<User> result = userService.getUserById(1L);

        assertTrue(result.isPresent());
        assertEquals(mockUser, result.get());
        verify(userRepository).findById(1L);
    }

    @Test
    void testGetUserById_NotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<User> result = userService.getUserById(1L);

        assertFalse(result.isPresent());
        verify(userRepository).findById(1L);
    }

    @Test
    void testUpdateUser_Success() {
        UserUpdateDTO userUpdateDTO = UserUpdateDTO.builder()
                .username("newUsername")
                .name("New Name")
                .email("newemail@example.com")
                .password("newPassword")
                .passwordConfirmation("newPassword")
                .build();

        when(userRepository.existsByUsername("newUsername")).thenReturn(false);
        when(userRepository.existsByEmail("newemail@example.com")).thenReturn(false);
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");

        User updatedUser = userService.updateUser(mockUser, userUpdateDTO);

        assertEquals("newUsername", updatedUser.getUsername());
        assertEquals("New Name", updatedUser.getName());
        assertEquals("newemail@example.com", updatedUser.getEmail());
        assertEquals("encodedNewPassword", updatedUser.getPassword());
    }

    @Test
    void testUpdateUser_PasswordsDoNotMatch() {
        UserUpdateDTO userUpdateDTO = UserUpdateDTO.builder()
                .password("newPassword")
                .passwordConfirmation("differentPassword")
                .build();

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.updateUser(mockUser, userUpdateDTO));

        assertEquals("Passwords do not match", exception.getMessage());
        verify(passwordEncoder, never()).encode(anyString());
    }

    @Test
    void testUpdateUser_UsernameAlreadyTaken() {
        UserUpdateDTO userUpdateDTO = UserUpdateDTO.builder()
                .username("existingUsername")
                .build();

        when(userRepository.existsByUsername("existingUsername")).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.updateUser(mockUser, userUpdateDTO));

        assertEquals("Username is already taken", exception.getMessage());
    }

    @Test
    void testUpdateUser_EmailAlreadyInUse() {
        UserUpdateDTO userUpdateDTO = UserUpdateDTO.builder()
                .email("existing@example.com")
                .build();

        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.updateUser(mockUser, userUpdateDTO));

        assertEquals("Email is already in use", exception.getMessage());
    }

    @Test
    void testUpdateUser_InvalidEmailFormat() {
        UserUpdateDTO userUpdateDTO = UserUpdateDTO.builder()
                .email("invalid-email")
                .build();

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.updateUser(mockUser, userUpdateDTO));

        assertEquals("Invalid email format", exception.getMessage());
    }

    @Test
    void testDeleteUser_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        assertDoesNotThrow(() -> userService.deleteUser(1L));
        verify(userRepository).deleteById(1L);
    }

    @Test
    void testDeleteUser_NotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.deleteUser(1L));

        assertEquals("User does not exist", exception.getMessage());
        verify(userRepository, never()).deleteById(anyLong());
    }
}

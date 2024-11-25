package com.cocktail27.api.service;

import com.cocktail27.api.dto.UserUpdateDTO;
import com.cocktail27.api.model.User;
import com.cocktail27.api.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class UserServiceIntegrationTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .username("testuser")
                .name("Test User")
                .email("user@user.com")
                .password(passwordEncoder.encode("password"))
                .build();
        userRepository.save(user);
    }

    @Test
    void testGetAllUsers() {
        List<User> users = userService.getAllUsers();
        assertEquals(1, users.size());
        assertEquals("testuser", users.get(0).getUsername());
    }

    @Test
    void testGetUserById() {
        Optional<User> result = userService.getUserById(user.getId());
        assertTrue(result.isPresent());
        assertEquals("testuser", result.get().getUsername());
    }

    @Test
    void testGetUserByUsername() {
        Optional<User> result = userService.getUserByUsername("testuser");
        assertTrue(result.isPresent());
        assertEquals("testuser", result.get().getUsername());
    }

    @Test
    void testUpdateUserWithValidData() {
        UserUpdateDTO updateDTO = UserUpdateDTO.builder()
                .username("newusername")
                .name("New User")
                .email("new@example.com")
                .build();

        User updatedUser = userService.updateUser(user, updateDTO);

        assertEquals("newusername", updatedUser.getUsername());
        assertEquals("New User", updatedUser.getName());
        assertEquals("new@example.com", updatedUser.getEmail());
        assertTrue(updatedUser.getImageUrl().contains("name=New+User"));
    }

    @Test
    void testUpdateUserWithPasswordChange() {
        UserUpdateDTO updateDTO = UserUpdateDTO.builder()
                .username(user.getUsername())
                .name(user.getName())
                .email(user.getEmail())
                .password("newpassword")
                .passwordConfirmation("newpassword")
                .build();

        User updatedUser = userService.updateUser(user, updateDTO);

        assertTrue(passwordEncoder.matches("newpassword",
                updatedUser.getPassword()));
    }

    @Test
    void testUpdateUserWithPasswordMismatch() {
        UserUpdateDTO updateDTO = UserUpdateDTO.builder()
                .username(user.getUsername())
                .name(user.getName())
                .email(user.getEmail())
                .password("newpassword")
                .passwordConfirmation("mismatch")
                .build();

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.updateUser(user, updateDTO));
        assertEquals("Passwords do not match", exception.getMessage());
    }

    @Test
    void testUpdateUserWithDuplicateUsername() {
        User otherUser = User.builder()
                .username("duplicateuser")
                .name("Duplicate User")
                .email("duplicate@example.com")
                .password(passwordEncoder.encode("password"))
                .build();
        userRepository.save(otherUser);

        UserUpdateDTO updateDTO = UserUpdateDTO.builder()
                .username("duplicateuser")
                .name(user.getName())
                .email(user.getEmail())
                .build();

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.updateUser(user, updateDTO));
        assertEquals("Username is already taken", exception.getMessage());
    }

    @Test
    void testUpdateUserWithDuplicateEmail() {
        User otherUser = User.builder()
                .username("anotheruser")
                .name("Another User")
                .email("duplicate@example.com")
                .password(passwordEncoder.encode("password"))
                .build();
        userRepository.save(otherUser);

        UserUpdateDTO updateDTO = UserUpdateDTO.builder()
                .username(user.getUsername())
                .name(user.getName())
                .email("duplicate@example.com")
                .build();

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.updateUser(user, updateDTO));
        assertEquals("Email is already in use", exception.getMessage());
    }

    @Test
    void testUpdateUserWithInvalidEmail() {
        UserUpdateDTO updateDTO = UserUpdateDTO.builder()
                .username(user.getUsername())
                .name(user.getName())
                .email("invalidemail")
                .build();

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.updateUser(user, updateDTO));
        assertEquals("Invalid email format", exception.getMessage());
    }

    @Test
    void testDeleteUserWithValidId() {
        User user = userRepository.findByUsername("testuser").orElseThrow();
        userService.deleteUser(user.getId());

        Optional<User> result = userRepository.findById(user.getId());
        assertFalse(result.isPresent());
    }

    @Test
    void testDeleteUserWithInvalidId() {
        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.deleteUser(999L));
        assertEquals("User does not exist", exception.getMessage());
    }
}

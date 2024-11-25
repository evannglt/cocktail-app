package com.cocktail27.api.controller;

import com.cocktail27.api.dto.APIResponse;
import com.cocktail27.api.dto.UserDTO;
import com.cocktail27.api.dto.UserUpdateDTO;
import com.cocktail27.api.model.User;
import com.cocktail27.api.service.AuthService;
import com.cocktail27.api.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
public class UserControllerTest {

    @Autowired
    private UserController userController;

    @MockBean
    private UserService userService;

    @MockBean
    private AuthService authService;

    private User testUser;
    private User userAfterUpdate;
    private UserUpdateDTO updateDTO;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .username("testuser")
                .name("Test User")
                .email("testuser@example.com")
                .role("ROLE_USER")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        updateDTO = UserUpdateDTO.builder()
                .name("Updated User")
                .email("updated@example.com")
                .username("updateduser")
                .build();

        userAfterUpdate = User.builder()
                .id(1L)
                .username(updateDTO.getUsername())
                .name(updateDTO.getName())
                .email(updateDTO.getEmail())
                .role("ROLE_USER")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    @Test
    void testGetAllUsers_Success() {
        when(userService.getAllUsers()).thenReturn(List.of(testUser));

        ResponseEntity<List<UserDTO>> response = userController.getAllUsers();

        assertEquals(200, response.getStatusCode().value());
        assertEquals(1, response.getBody().size());
        assertEquals("testuser", response.getBody().get(0).getUsername());
    }

    @Test
    void testGetUserById_Found() {
        when(userService.getUserById(1L)).thenReturn(Optional.of(testUser));

        ResponseEntity<?> response = userController.getUserById(1L);

        assertEquals(200, response.getStatusCode().value());
        assertInstanceOf(UserDTO.class, response.getBody());
        assertEquals("testuser", ((UserDTO) response.getBody()).getUsername());
    }

    @Test
    void testGetUserById_NotFound() {
        when(userService.getUserById(1L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = userController.getUserById(1L);

        assertEquals(404, response.getStatusCode().value());
        assertInstanceOf(APIResponse.class, response.getBody());
        assertEquals("User not found", ((APIResponse) response.getBody()).getMessage());
    }

    @Test
    void testUpdateUser_Success() {
        when(userService.getUserById(1L)).thenReturn(Optional.of(testUser));
        when(userService.updateUser(testUser, updateDTO)).thenReturn(userAfterUpdate);

        ResponseEntity<?> response = userController.updateUser(1L, updateDTO);

        assertEquals(200, response.getStatusCode().value());
        assertInstanceOf(UserDTO.class, response.getBody());
        assertEquals("Updated User", ((UserDTO) response.getBody()).getName());
    }

    @Test
    void testUpdateUser_NotFound() {
        when(userService.getUserById(1L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = userController.updateUser(1L, updateDTO);

        assertEquals(404, response.getStatusCode().value());
        assertInstanceOf(APIResponse.class, response.getBody());
        assertEquals("User not found", ((APIResponse) response.getBody()).getMessage());
    }

    @Test
    void testDeleteUser_Success() {
        doNothing().when(userService).deleteUser(1L);

        ResponseEntity<?> response = userController.deleteUser(1L);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("User deleted", ((APIResponse) response.getBody()).getMessage());
    }

    @Test
    void testDeleteUser_NotFound() {
        doThrow(new RuntimeException("User not found")).when(userService).deleteUser(1L);

        ResponseEntity<?> response = userController.deleteUser(1L);

        assertEquals(404, response.getStatusCode().value());
        assertInstanceOf(APIResponse.class, response.getBody());
        assertEquals("User not found", ((APIResponse) response.getBody()).getMessage());
    }

    @Test
    void testUpdateAuthenticatedUser_Success() {
        when(authService.getCurrentUser()).thenReturn(testUser);
        when(userService.updateUser(testUser, updateDTO)).thenReturn(userAfterUpdate);

        ResponseEntity<?> response = userController.updateAuthenticatedUser(updateDTO);

        assertEquals(200, response.getStatusCode().value());
        assertInstanceOf(UserDTO.class, response.getBody());
        assertEquals("Updated User", ((UserDTO) response.getBody()).getName());
    }

    @Test
    void testGetAuthenticatedUser_Success() {
        when(authService.getCurrentUser()).thenReturn(testUser);

        ResponseEntity<UserDTO> response = userController.getAuthenticatedUser();

        assertEquals(200, response.getStatusCode().value());
        assertEquals("testuser", response.getBody().getUsername());
    }

    @Test
    void testDeleteAuthenticatedUser_Success() {
        when(authService.getCurrentUser()).thenReturn(testUser);
        doNothing().when(userService).deleteUser(1L);

        ResponseEntity<?> response = userController.deleteAuthenticatedUser();

        assertEquals(200, response.getStatusCode().value());
    }

    @Test
    void testDeleteAuthenticatedUser_NotFound() {
        when(authService.getCurrentUser()).thenThrow(new RuntimeException("User not found"));

        ResponseEntity<?> response = userController.deleteAuthenticatedUser();

        assertEquals(404, response.getStatusCode().value());
        assertInstanceOf(APIResponse.class, response.getBody());
        assertEquals("User not found", ((APIResponse) response.getBody()).getMessage());
    }
}

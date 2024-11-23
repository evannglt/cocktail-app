package com.cocktail27.api.controller;

import com.cocktail27.api.dto.APIResponse;
import com.cocktail27.api.dto.UserDTO;
import com.cocktail27.api.dto.UserUpdateDTO;
import com.cocktail27.api.mapper.UserMapper;
import com.cocktail27.api.model.User;
import com.cocktail27.api.service.AuthService;
import com.cocktail27.api.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserDTO> userDTOs = users.stream().map(UserMapper::userToDTO).collect(Collectors.toList());
        return new ResponseEntity<>(userDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return new ResponseEntity<>(UserMapper.userToDTO(user.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new APIResponse("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO userUpdateDTO) {
        try {
            User user = userService.getUserById(id).orElseThrow(() -> new RuntimeException("User not found"));
            User updatedUser = userService.updateUser(user, userUpdateDTO);
            return new ResponseEntity<>(UserMapper.userToDTO(updatedUser), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new APIResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateAuthenticatedUser(@RequestBody UserUpdateDTO userUpdateDTO) {
        try {
            User currentUser = authService.getCurrentUser();
            User updatedUser = userService.updateUser(currentUser, userUpdateDTO);
            return new ResponseEntity<>(UserMapper.userToDTO(updatedUser), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new APIResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>(new APIResponse("User deleted"), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new APIResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/me")
    public ResponseEntity<?> deleteAuthenticatedUser() {
        try {
            User user = authService.getCurrentUser();
            userService.deleteUser(user.getId());
            return new ResponseEntity<>(new APIResponse("User deleted"), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new APIResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getAuthenticatedUser() {
        User user = authService.getCurrentUser();
        return new ResponseEntity<>(UserMapper.userToDTO(user), HttpStatus.OK);
    }
}

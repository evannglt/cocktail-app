package com.cocktail27.api.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cocktail27.api.dto.UserUpdateDTO;
import com.cocktail27.api.model.Cocktail;
import com.cocktail27.api.model.User;
import com.cocktail27.api.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User updateUser(User currentUser, UserUpdateDTO userUpdateDTO) throws RuntimeException {
        if (userUpdateDTO.getPassword() != null) {
            if (!userUpdateDTO.getPassword().equals(userUpdateDTO.getPasswordConfirmation())) {
                throw new RuntimeException("Passwords do not match");
            } else {
                currentUser.setPassword(passwordEncoder.encode(userUpdateDTO.getPassword()));
            }
        }
        if (!currentUser.getUsername().equals(userUpdateDTO.getUsername())
                && userRepository.existsByUsername(userUpdateDTO.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }
        if (!currentUser.getEmail().equals(userUpdateDTO.getEmail())
                && userRepository.existsByEmail(userUpdateDTO.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }
        if (!userUpdateDTO.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new RuntimeException("Invalid email format");
        }
        currentUser.setUsername(userUpdateDTO.getUsername());
        currentUser.setName(userUpdateDTO.getName());
        currentUser.setEmail(userUpdateDTO.getEmail());
        currentUser.setImageUrl(PfpService.getPfpURL(userUpdateDTO.getName()));
        return currentUser;
    }

    public void deleteUser(Long id) throws RuntimeException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User does not exist"));

        for (Cocktail cocktail : user.getMyCocktails()) {
            List<User> favoriteBy = cocktail.getFavoriteBy();
            favoriteBy.stream().map(User::getFavoriteCocktails)
                    .forEach(favoriteCocktails -> favoriteCocktails.remove(cocktail));
            favoriteBy.clear();
        }

        userRepository.delete(user);
    }
}
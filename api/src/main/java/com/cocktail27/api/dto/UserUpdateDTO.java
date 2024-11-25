package com.cocktail27.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserUpdateDTO {
    private String name;
    private String email;
    private String username;
    private String password;
    private String passwordConfirmation;
}

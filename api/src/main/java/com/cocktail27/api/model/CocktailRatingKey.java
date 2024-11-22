package com.cocktail27.api.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
@Data
public class CocktailRatingKey implements Serializable {

    @Column(name = "user_id")
    Long userId;

    @Column(name = "cocktail_id")
    Long cocktailId;

}
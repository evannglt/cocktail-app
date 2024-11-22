package com.cocktail27.api.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.cocktail27.api.converter.StringListConverter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "cocktails")
public class Cocktail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<CocktailRating> ratings = new HashSet<>();

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User createdBy;

    @Convert(converter = StringListConverter.class)
    @Column(name = "steps", nullable = false, length = 1000)
    @Builder.Default
    private List<String> steps = new ArrayList<>();

    @OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @ToString.Exclude
    private List<Ingredient> ingredients = new ArrayList<>();

    @ManyToMany(mappedBy = "favoriteCocktails")
    @Builder.Default
    private List<User> favoriteBy = new ArrayList<>();

    @Convert(converter = StringListConverter.class)
    @Column(name = "tags", nullable = false)
    @Builder.Default
    private List<String> tags = new ArrayList<>();

    private String glass;

    private Boolean isAlcoholic;

    private Long cocktailDBId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof Cocktail))
            return false;
        Cocktail cocktail = (Cocktail) o;
        return getId().equals(cocktail.getId()) && getName().equals(cocktail.getName());
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}

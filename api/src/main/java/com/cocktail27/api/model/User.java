package com.cocktail27.api.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    private String role;

    private String imageUrl;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("name")
    @Builder.Default
    private List<Cocktail> myCocktails = new ArrayList<>();

    @ManyToMany
    @OrderBy("name")
    @JoinTable(name = "favorite_cocktails", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "cocktail_id"))
    @Builder.Default
    private List<Cocktail> favoriteCocktails = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<CocktailRating> ratings = new HashSet<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        User user = (User) o;

        return getId().equals(user.getId()) && getUsername().equals(user.getUsername());
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
package com.back.back.V1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class CategoriaGasto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cor;

    @ManyToOne
    @JoinColumn(name = "user_app_id")
    @JsonIgnore
    private UserApp user;
}

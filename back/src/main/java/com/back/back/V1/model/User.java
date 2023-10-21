package com.back.back.V1.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "user_app")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String username;
    private String senha;
}

package com.back.back.V1.model.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String usernameOrEmail;
    private String senha;
}

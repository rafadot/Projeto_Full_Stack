package com.back.back.V1.model.dto;

import lombok.Data;

@Data
public class RecuperarSenhaDTO {
    private Long userId;
    private String senha;
    private Integer code;
}

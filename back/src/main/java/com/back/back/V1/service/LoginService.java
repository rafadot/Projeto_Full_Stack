package com.back.back.V1.service;

import com.back.back.V1.model.RecuperarSenha;
import com.back.back.V1.model.User;
import com.back.back.V1.model.dto.LoginDTO;
import com.back.back.V1.repository.RecuperarSenhaRepository;
import com.back.back.V1.repository.UserRepository;
import com.back.back.exceptions.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public Map<String, String> login(LoginDTO loginDTO){
        User user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(()-> new BadRequestException("Nome de usuário inválido"));

        if(!encoder.matches(loginDTO.getSenha(),user.getSenha()))
            throw new BadRequestException("Senha incorreta");

        Map<String,String> response = new HashMap<>();
        response.put("message","Logado com sucesso");
        return response;
    }

}
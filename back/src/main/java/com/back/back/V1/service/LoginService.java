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
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final SendEmailService sendEmailService;
    private final RecuperarSenhaRepository recuperarSenhaRepository;

    public Map<String, String> login(LoginDTO loginDTO){
        User user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(()-> new BadRequestException("Nome de usuário inválido"));

        if(!encoder.matches(loginDTO.getSenha(),user.getSenha()))
            throw new BadRequestException("Senha incorreta");

        Map<String,String> response = new HashMap<>();
        response.put("message","Logado com sucesso");
        return response;
    }

    public void solicitaNovaSenha(String userOrEmail){
        User user = userRepository.findByUsername(userOrEmail).orElse(null);

        if(user == null){
            user = userRepository.findByEmail(userOrEmail).orElseThrow(()-> new BadRequestException("Usuário ou email não cadastrados"));
        }

        Random r = new Random();
        int cod = r.nextInt(999999 - 100000) + 100000;

        RecuperarSenha recuperarSenha = recuperarSenhaRepository.findByUserId(user.getId()).orElse(new RecuperarSenha());

        recuperarSenha.setCod(cod);
        recuperarSenha.setUser(user);
        recuperarSenha.setDestinatario(user.getEmail());
        recuperarSenha.setExpircao(LocalDateTime.now().plusMinutes(5));

        recuperarSenhaRepository.save(recuperarSenha);
        sendEmailService.solicitaRecuperarSenha(user.getEmail(),cod);
    }
}
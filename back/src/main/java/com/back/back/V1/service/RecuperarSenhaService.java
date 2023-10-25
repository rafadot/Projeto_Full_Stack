package com.back.back.V1.service;

import com.back.back.V1.model.RecuperarSenha;
import com.back.back.V1.model.User;
import com.back.back.V1.repository.RecuperarSenhaRepository;
import com.back.back.V1.repository.UserRepository;
import com.back.back.exceptions.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class RecuperarSenhaService {
    private final UserRepository userRepository;
    private final SendEmailService sendEmailService;
    private final RecuperarSenhaRepository recuperarSenhaRepository;

    public Long solicitaNovaSenha(String userOrEmail){
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

        return user.getId();
    }

    public Boolean codigoValido(Long userId, Integer code){
        RecuperarSenha recuperarSenha = recuperarSenhaRepository.findByUserId(userId)
                .orElseThrow(()-> new BadRequestException("Usuário não existe"));

        if(ChronoUnit.MINUTES.between(recuperarSenha.getExpircao() , LocalDateTime.now()) > 5){
            throw new BadRequestException("Este código já expirou");
        }

        if(!code.equals(recuperarSenha.getCod())){
            throw new BadRequestException("Código inválido");
        }

        return true;
    }

    public Long retornaIdPeloNome(String userOrEmail){
        User user = userRepository.findByUsername(userOrEmail).orElse(null);

        if(user == null){
            user = userRepository.findByEmail(userOrEmail).orElseThrow(()-> new BadRequestException("Usuário ou email não cadastrados"));
        }

        return user.getId();
    }
}

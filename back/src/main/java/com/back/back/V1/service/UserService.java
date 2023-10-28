package com.back.back.V1.service;

import com.back.back.V1.model.dto.RecuperarSenhaDTO;
import com.back.back.V1.model.dto.UserAppResponse;
import com.back.back.V1.repository.RecuperarSenhaRepository;
import com.back.back.V1.repository.UserRepository;
import com.back.back.exceptions.BadRequestException;
import com.back.back.V1.model.UserApp;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final RecuperarSenhaRepository recuperarSenhaRepository;

    @Transactional
    public UserAppResponse createUser(UserApp userRequest){
        if(userRepository.findByUsername(userRequest.getUsername()).isPresent())
            throw new BadRequestException("Username já cadastrado!");

        if(userRepository.findByEmail(userRequest.getEmail()).isPresent())
            throw new BadRequestException("Email já cadastrado");

        userRequest.setSenha(encoder.encode(userRequest.getSenha()));
        UserApp user = userRepository.save(userRequest);

        UserAppResponse response = new UserAppResponse();
        BeanUtils.copyProperties(user,response);

        return response;
    }

    public void trocarSenha(RecuperarSenhaDTO dto){
        UserApp user = userRepository.findById(dto.getUserId())
                .orElseThrow(()-> new BadRequestException("Usuário não existe"));

        user.setSenha(encoder.encode(dto.getSenha()));
        userRepository.save(user);
    }

    public UserApp buscaPorUserEmail(String userEmail){
        UserApp user = userRepository.findByUsername(userEmail).orElse(null);

        if(user == null)
            user = userRepository.findByEmail(userEmail).orElseThrow(()->new BadRequestException("Usuário ou email não cadastrados"));

        return user;
    }
}

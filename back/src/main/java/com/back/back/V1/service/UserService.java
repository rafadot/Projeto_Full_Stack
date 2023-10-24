package com.back.back.V1.service;

import com.back.back.V1.model.RecuperarSenha;
import com.back.back.V1.model.dto.LoginDTO;
import com.back.back.V1.model.dto.UserResponse;
import com.back.back.V1.repository.RecuperarSenhaRepository;
import com.back.back.V1.repository.UserRepository;
import com.back.back.exceptions.BadRequestException;
import com.back.back.V1.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final RecuperarSenhaRepository recuperarSenhaRepository;

    @Transactional
    public UserResponse createUser(User userRequest){
        if(userRepository.findByUsername(userRequest.getUsername()).isPresent())
            throw new BadRequestException("Username já cadastrado!");

        if(userRepository.findByEmail(userRequest.getEmail()).isPresent())
            throw new BadRequestException("Email já cadastrado");

        userRequest.setSenha(encoder.encode(userRequest.getSenha()));
        User user = userRepository.save(userRequest);

        UserResponse response = new UserResponse();
        BeanUtils.copyProperties(user,response);

        return response;
    }
}

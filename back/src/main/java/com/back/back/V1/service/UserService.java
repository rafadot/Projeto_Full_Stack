package com.back.back.V1.service;

import com.back.back.V1.model.User;
import com.back.back.V1.model.dto.LoginDTO;
import com.back.back.V1.model.dto.UserResponse;
import com.back.back.V1.repository.UserRepository;
import com.back.back.exceptions.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

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

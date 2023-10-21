package com.back.back.V1.service;

import com.back.back.V1.model.User;
import com.back.back.V1.model.dto.UserResponse;
import com.back.back.V1.repository.UserRepository;
import com.back.back.exceptions.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserResponse createUser(User userRequest){
        if(userRepository.findByNome(userRequest.getUsername()).isPresent())
            throw new BadRequestException("Username já cadastrado!");

        userRequest.setSenha(encoder.encode(userRequest.getSenha()));
        User user = userRepository.save(userRequest);

        UserResponse response = new UserResponse();
        BeanUtils.copyProperties(user,response);

        return response;
    }
}

package com.back.back.V1.service;

import com.back.back.V1.model.UserApp;
import com.back.back.V1.model.dto.LoginDTO;
import com.back.back.V1.repository.UserRepository;
import com.back.back.exceptions.BadRequestException;
import com.back.back.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class LoginService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    public Map<String,String> login(LoginDTO loginDTO){
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.getUsernameOrEmail());

        if(!encoder.matches(loginDTO.getSenha(),userDetails.getPassword()))
            throw new BadRequestException("Senha incorreta");

        UserApp user = new UserApp();
        user.setUsername(userDetails.getUsername());
        user.setSenha(userDetails.getPassword());

        Map<String,String> response = new HashMap<>();
        response.put("message", "Login realizado com sucesso");
        response.put("token", jwtService.generateToken(user));
        return response;
    }

}
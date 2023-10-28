package com.back.back.security;

import com.back.back.V1.model.UserApp;
import com.back.back.V1.repository.UserRepository;
import com.back.back.V1.service.UserService;
import com.back.back.exceptions.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceDetail implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userOuEmail) throws UsernameNotFoundException {
        UserApp user = userRepository.findByUsername(userOuEmail).orElse(null);

        if(user == null)
            user = userRepository.findByEmail(userOuEmail).orElseThrow(()-> new BadRequestException("Usuário ou email não cadastrado"));

        return User.builder()
                .username(user.getUsername())
                .password(user.getSenha())
                .roles("")
                .build();
    }
}

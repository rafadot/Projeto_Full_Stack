package com.back.back.V1.service;

import com.back.back.V1.dto.UserResponse;
import com.back.back.V1.model.User;
import com.back.back.V1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public UserResponse createUser(User model){
        User user = userRepository.save(model);

        UserResponse response = new UserResponse();
        BeanUtils.copyProperties(user, response);

        return response;
    }
}

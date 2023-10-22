package com.back.back.V1.controller;

import com.back.back.V1.model.User;
import com.back.back.V1.model.dto.UserResponse;
import com.back.back.V1.repository.UserRepository;
import com.back.back.V1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<UserResponse> create(@RequestBody User userRequest){
        return new ResponseEntity<>(userService.createUser(userRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<User>> teste(){
        return new ResponseEntity<>(userRepository.findAll(),HttpStatus.OK);
    }
}
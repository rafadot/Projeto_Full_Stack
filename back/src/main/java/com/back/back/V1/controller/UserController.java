package com.back.back.V1.controller;

import com.back.back.V1.model.dto.RecuperarSenhaDTO;
import com.back.back.V1.model.dto.UserAppResponse;
import com.back.back.V1.model.UserApp;
import com.back.back.V1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserAppResponse> create(@RequestBody UserApp userRequest){
        return new ResponseEntity<>(userService.createUser(userRequest), HttpStatus.CREATED);
    }

    @PutMapping("/senha")
    public ResponseEntity<Void> alteraSenha(@RequestBody RecuperarSenhaDTO dto){
        userService.trocarSenha(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

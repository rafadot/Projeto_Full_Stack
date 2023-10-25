package com.back.back.V1.controller;

import com.back.back.V1.service.LoginService;
import com.back.back.V1.service.SendEmailService;
import com.back.back.V1.model.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    @PostMapping
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDTO loginDTO){
        return new ResponseEntity<>(loginService.login(loginDTO), HttpStatus.OK);
    }
}

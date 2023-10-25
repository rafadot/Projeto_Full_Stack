package com.back.back.V1.controller;

import com.back.back.V1.service.RecuperarSenhaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recuperar-senha")
@RequiredArgsConstructor
public class RecuperarSenhaController {
    private final RecuperarSenhaService recuperarSenhaService;

    @GetMapping("/solicita-senha")
    public ResponseEntity<Long> solicitaNovaSenha(@RequestParam String userOrEmail){
        return new ResponseEntity<>(recuperarSenhaService.solicitaNovaSenha(userOrEmail), HttpStatus.OK);
    }

    @GetMapping("/valida-codigo")
    public ResponseEntity<Boolean> solicitaNovaSenha(@RequestParam Long userId, @RequestParam Integer code){
        return new ResponseEntity<>(recuperarSenhaService.codigoValido(userId,code), HttpStatus.OK);
    }

    @GetMapping("/retorna-id")
    public ResponseEntity<Long> retornaIdPeloNome(@RequestParam String userOrEmail){
        return new ResponseEntity<>(recuperarSenhaService.retornaIdPeloNome(userOrEmail), HttpStatus.OK);
    }
}

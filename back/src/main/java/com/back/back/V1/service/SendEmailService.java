package com.back.back.V1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SendEmailService {
    private final JavaMailSender javaMailSender;

    public void solicitaRecuperarSenha(String email, int cod){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Recuperação de senha");
        message.setTo(email);
        message.setText("Utilize esse código para recuperação de senha : " + cod);
        javaMailSender.send(message);
    }
}

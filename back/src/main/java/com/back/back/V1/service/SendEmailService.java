package com.back.back.V1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SendEmailService {
    private final JavaMailSender javaMailSender;

    public void teste(){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("aaa");
        message.setTo("rafaelamcpxd@outlook.com");
        message.setText("blablablalba");
        javaMailSender.send(message);
    }
}

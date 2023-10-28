package com.back.back.security;

import com.back.back.V1.model.UserApp;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${security.jwt.expiration}")
    private String expiracao;
    @Value("${security.jwt.key}")
    private String key;

    public String generateToken(UserApp userApp){
        long tempoString = Long.parseLong(expiracao);
        LocalDateTime tempoExpiracao = LocalDateTime.now().plusMinutes(tempoString);
        Date date = Date.from(tempoExpiracao.atZone(ZoneId.systemDefault()).toInstant());

        return Jwts
                .builder()
                .setSubject(userApp.getUsername())
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512,key)
                .compact();
    }

    private Claims getClaims(String token) throws ExpiredJwtException{
        return Jwts
                .parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean tokenValido(String token){
        try{
            Claims claims = getClaims(token);
            Date dataExpiracao = claims.getExpiration();
            LocalDateTime localDateTime = dataExpiracao.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            return !LocalDateTime.now().isAfter(localDateTime);
        }catch (Exception e){
            return false;
        }
    }

    public String getUsername(String token) throws ExpiredJwtException{
        return getClaims(token).getSubject();
    }

}

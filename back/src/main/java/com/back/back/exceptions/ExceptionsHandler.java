package com.back.back.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;

@RestControllerAdvice
public class ExceptionsHandler {
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<BodyError> badRequest(BadRequestException e, HttpServletRequest request){
        return ResponseEntity.badRequest().body(
                BodyError.builder()
                        .timestamp(Instant.now())
                        .message(e.getMessage())
                        .error("Bad Request")
                        .path(request.getRequestURI())
                        .status(HttpStatus.BAD_REQUEST.value())
                        .build()
        );

    }
}

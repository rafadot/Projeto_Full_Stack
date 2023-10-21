package com.back.back.exceptions;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class BodyError {
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "America/Fortaleza")
    private Instant timestamp;
    private Integer status;
    private String error;
    private String message;
    private String path;
}

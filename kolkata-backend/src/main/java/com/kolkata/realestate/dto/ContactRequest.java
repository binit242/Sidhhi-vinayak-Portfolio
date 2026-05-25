package com.kolkata.realestate.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ContactRequest {
    @NotBlank private String fullName;
    private String email;
    private String phone;
    private String subject;
    private String message;
    private Long   projectId;
    private String sourcePage;
}

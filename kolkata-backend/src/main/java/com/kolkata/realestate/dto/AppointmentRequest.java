package com.kolkata.realestate.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AppointmentRequest {
    @NotBlank private String fullName;
    private String email;
    @NotBlank private String phone;
    private String preferredDate;
    private String preferredTime;
    private Long   projectId;
    private String visitType;
    private String message;
}

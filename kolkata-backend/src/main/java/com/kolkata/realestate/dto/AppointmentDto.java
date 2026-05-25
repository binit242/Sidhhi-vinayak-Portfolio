package com.kolkata.realestate.dto;

import lombok.Data;

@Data
public class AppointmentDto {
    private Long   id;
    private String fullName;
    private String email;
    private String phone;
    private String preferredDate;
    private String preferredTime;
    private Long   projectId;
    private String projectName;
    private String visitType;
    private String message;
    private String status;
    private String adminNotes;
    private String ipAddress;
    private String createdAt;
    private String updatedAt;
}

package com.kolkata.realestate.dto;

import lombok.Data;

@Data
public class EnquiryDto {
    private Long   id;
    private String fullName;
    private String email;
    private String phone;
    private String subject;
    private String message;
    private Long   projectId;
    private String projectName;
    private String sourcePage;
    private String status;
    private String adminNotes;
    private String ipAddress;
    private String createdAt;
    private String updatedAt;
}

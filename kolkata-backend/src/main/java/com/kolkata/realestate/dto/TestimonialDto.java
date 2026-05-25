package com.kolkata.realestate.dto;

import lombok.Data;

@Data
public class TestimonialDto {
    private Long    id;
    private String  clientName;
    private String  clientTitle;
    private String  avatarUrl;
    private int     rating;
    private String  review;
    private Long    projectId;
    private String  projectName;
    private boolean featured;
    private boolean visible;
    private int     displayOrder;
    private String  createdAt;
}

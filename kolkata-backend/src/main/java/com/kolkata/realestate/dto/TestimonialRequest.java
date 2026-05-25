package com.kolkata.realestate.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class TestimonialRequest {
    @NotBlank private String clientName;
    private String  clientTitle;
    private String  avatarUrl;
    @Min(1) @Max(5) private int rating = 5;
    @NotBlank private String review;
    private Long    projectId;
    private boolean featured     = false;
    private boolean visible      = true;
    private int     displayOrder = 0;
}

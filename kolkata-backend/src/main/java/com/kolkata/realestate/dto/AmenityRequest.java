package com.kolkata.realestate.dto;
import lombok.Data;

@Data
public class AmenityRequest {
    private String name;
    private String icon;
    private String category;
    private String description;
    private int    displayOrder;
}

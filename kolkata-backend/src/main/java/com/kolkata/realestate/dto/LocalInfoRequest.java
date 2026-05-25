package com.kolkata.realestate.dto;
import lombok.Data;

@Data
public class LocalInfoRequest {
    private String category;
    private String name;
    private String distance;
    private String description;
    private int    displayOrder;
}

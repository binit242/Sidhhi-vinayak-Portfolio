package com.kolkata.realestate.dto;
import lombok.Data;

@Data
public class FacilityRequest {
    private String name;
    private String icon;
    private String value;
    private String description;
    private int    displayOrder;
}

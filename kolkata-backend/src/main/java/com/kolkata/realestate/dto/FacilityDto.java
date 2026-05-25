package com.kolkata.realestate.dto;
import lombok.Data;

@Data
public class FacilityDto {
    private Long   id;
    private String name;
    private String icon;
    private String value;
    private String description;
    private int    displayOrder;
}

package com.kolkata.realestate.dto;
import lombok.Data;

@Data
public class SpecificationDto {
    private Long    id;
    private String  unitType;
    private String  carpetArea;
    private String  builtUpArea;
    private String  superArea;
    private Integer floorCount;
    private Integer bathrooms;
    private Integer balconies;
    private Integer parking;
    private String  price;
    private String  description;
    private int     displayOrder;
}

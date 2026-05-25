package com.kolkata.realestate.dto;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class SpecificationRequest {
    private String     unitType;
    private BigDecimal carpetArea;
    private BigDecimal builtUpArea;
    private BigDecimal superArea;
    private Integer    floorCount;
    private Integer    bathrooms;
    private Integer    balconies;
    private Integer    parking;
    private BigDecimal price;
    private String     description;
    private int        displayOrder;
}

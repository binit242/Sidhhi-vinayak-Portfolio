package com.kolkata.realestate.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProjectRequest {
    @NotBlank private String name;
    private String     slug;
    private String     tagline;
    private String     description;
    private String     location;
    private String     city;
    private String     state;
    private String     pincode;
    @NotNull private String status;
    @NotNull private String propertyType;
    private Integer    totalUnits;
    private Integer    availableUnits;
    private BigDecimal priceMin;
    private BigDecimal priceMax;
    private String     priceUnit;
    private BigDecimal areaMin;
    private BigDecimal areaMax;
    private String     possessionDate;
    private String     reraNumber;
    private String     developerName;
    private String     websiteUrl;
    private BigDecimal mapLatitude;
    private BigDecimal mapLongitude;
    private boolean    featured     = false;
    private boolean    visible      = true;
    private int        displayOrder = 0;
}

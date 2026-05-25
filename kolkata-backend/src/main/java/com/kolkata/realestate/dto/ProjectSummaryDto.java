package com.kolkata.realestate.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProjectSummaryDto {
    private Long    id;
    private String  name;
    private String  slug;
    private String  tagline;
    private String  location;
    private String  city;
    private String  status;
    private String  propertyType;
    private String  priceMin;
    private String  priceMax;
    private String  priceUnit;
    private boolean featured;
    private boolean visible;
    private int     displayOrder;
    private String  heroImageUrl;
    private List<String> images;
    private int     photoCount;
}

package com.kolkata.realestate.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProjectDetailDto {
    private Long    id;
    private String  name;
    private String  slug;
    private String  tagline;
    private String  description;
    private String  location;
    private String  city;
    private String  state;
    private String  pincode;
    private String  status;
    private String  propertyType;
    private Integer totalUnits;
    private Integer availableUnits;
    private String  priceMin;
    private String  priceMax;
    private String  priceUnit;
    private String  areaMin;
    private String  areaMax;
    private String  possessionDate;
    private String  reraNumber;
    private String  developerName;
    private String  websiteUrl;
    private String  mapLatitude;
    private String  mapLongitude;
    private boolean featured;
    private boolean visible;
    private int     displayOrder;
    private String  createdAt;
    private List<PhotoDto>          photos;
    private List<AmenityDto>        amenities;
    private List<FacilityDto>       facilities;
    private List<LocalInfoDto>      localInfos;
    private List<SpecificationDto>  specifications;
}

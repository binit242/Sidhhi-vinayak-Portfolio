package com.kolkata.realestate.dto;
import lombok.Data;

@Data
public class PhotoDto {
    private Long   id;
    private String url;
    private String caption;
    private String photoType;
    private int    displayOrder;
}

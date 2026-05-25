package com.kolkata.realestate.dto;
import lombok.Data;

@Data
public class PhotoRequest {
    private String url;
    private String caption;
    private String photoType;
    private int    displayOrder;
}

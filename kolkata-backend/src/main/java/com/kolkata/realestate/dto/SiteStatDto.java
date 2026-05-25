package com.kolkata.realestate.dto;

import lombok.Data;

@Data
public class SiteStatDto {
    private Long    id;
    private String  statKey;
    private String  statLabel;
    private String  statValue;
    private int     displayOrder;
    private boolean visible;
}

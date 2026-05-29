package com.kolkata.realestate.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name = "projects")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Project {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    private String tagline;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;
    private String city;
    private String state;
    private String pincode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Status status = Status.ONGOING;

    @Enumerated(EnumType.STRING)
    @Column(name = "property_type", nullable = false)
    @Builder.Default
    private PropertyType propertyType = PropertyType.RESIDENTIAL;

    @Column(name = "total_units")    private Integer totalUnits;
    @Column(name = "available_units") private Integer availableUnits;

    @Column(name = "price_min", precision = 15, scale = 2)
    private BigDecimal priceMin;
    @Column(name = "price_max", precision = 15, scale = 2)
    private BigDecimal priceMax;
    @Column(name = "price_unit", length = 50)
    @Builder.Default
    private String priceUnit = "per unit";

    @Column(name = "area_min", precision = 10, scale = 2)
    private BigDecimal areaMin;
    @Column(name = "area_max", precision = 10, scale = 2)
    private BigDecimal areaMax;

    @Column(name = "possession_date")
    private LocalDate possessionDate;

    @Column(name = "rera_number", length = 100)
    private String reraNumber;

    @Column(name = "developer_name")
    private String developerName;

    @Column(name = "website_url", length = 500)
    private String websiteUrl;

    @Column(name = "map_latitude",  precision = 10, scale = 8)
    private BigDecimal mapLatitude;
    @Column(name = "map_longitude", precision = 11, scale = 8)
    private BigDecimal mapLongitude;

    @Builder.Default
    private boolean featured    = false;
    @Builder.Default
    private boolean visible     = true;

    @Column(name = "display_order")
    @Builder.Default
    private int displayOrder = 0;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ---- Relationships ----
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    @Builder.Default
    private List<ProjectPhoto> photos = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    @Builder.Default
    private List<ProjectAmenity> amenities = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    @Builder.Default
    private List<ProjectFacility> facilities = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    @Builder.Default
    private List<ProjectLocalInfo> localInfos = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    @Builder.Default
    private List<ProjectSpecification> specifications = new ArrayList<>();

    @PrePersist  void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate   void onUpdate() { updatedAt = LocalDateTime.now(); }

    public enum Status       { UPCOMING, ONGOING, COMPLETED, SOLD_OUT }
    public enum PropertyType { RESIDENTIAL, COMMERCIAL, MIXED, VILLA, APARTMENT, PLOT }
}

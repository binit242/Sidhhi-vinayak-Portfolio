package com.kolkata.realestate.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "project_specifications")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ProjectSpecification {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "unit_type", length = 100)
    private String unitType;

    @Column(name = "carpet_area",   precision = 10, scale = 2) private BigDecimal carpetArea;
    @Column(name = "built_up_area", precision = 10, scale = 2) private BigDecimal builtUpArea;
    @Column(name = "super_area",    precision = 10, scale = 2) private BigDecimal superArea;

    @Column(name = "floor_count")
    private Integer floorCount;
    private Integer bathrooms;
    private Integer balconies;
    private Integer parking;

    @Column(precision = 15, scale = 2)
    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "display_order")
    private int displayOrder = 0;
}

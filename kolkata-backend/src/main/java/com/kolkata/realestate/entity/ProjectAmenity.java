package com.kolkata.realestate.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "project_amenities")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ProjectAmenity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false)
    private String name;

    @Column(length = 100)
    private String icon;

    @Column(length = 100)
    private String category;

    @Column(length = 500)
    private String description;

    @Column(name = "display_order")
    private int displayOrder = 0;
}

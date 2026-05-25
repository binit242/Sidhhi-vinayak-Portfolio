package com.kolkata.realestate.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "project_local_info")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ProjectLocalInfo {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Enumerated(EnumType.STRING)
    private Category category = Category.OTHER;

    @Column(nullable = false)
    private String name;

    @Column(length = 100)
    private String distance;

    @Column(length = 500)
    private String description;

    @Column(name = "display_order")
    private int displayOrder = 0;

    public enum Category {
        SCHOOL, HOSPITAL, MALL, METRO, AIRPORT, RAILWAY, HIGHWAY, PARK, RESTAURANT, BANK, OTHER
    }
}

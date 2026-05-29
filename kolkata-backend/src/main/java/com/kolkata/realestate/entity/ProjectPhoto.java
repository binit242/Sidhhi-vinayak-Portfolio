package com.kolkata.realestate.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "project_photos")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ProjectPhoto {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false, length = 1000)
    private String url;

    @Column(length = 500)
    private String caption;

    @Enumerated(EnumType.STRING)
    @Column(name = "photo_type")
    @Builder.Default
    private PhotoType photoType = PhotoType.GALLERY;

    @Column(name = "display_order")
    @Builder.Default
    private int displayOrder = 0;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() { createdAt = LocalDateTime.now(); }

    public enum PhotoType { HERO, GALLERY, FLOOR_PLAN, AMENITY, LOCATION_MAP, BROCHURE }
}

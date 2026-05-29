package com.kolkata.realestate.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "testimonials")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Testimonial {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_name", nullable = false)
    private String clientName;

    @Column(name = "client_title", length = 255)
    private String clientTitle;

    @Column(name = "avatar_url", length = 1000)
    private String avatarUrl;

    @Builder.Default
    private int rating = 5;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String review;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

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

    @PrePersist  void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate   void onUpdate() { updatedAt = LocalDateTime.now(); }
}

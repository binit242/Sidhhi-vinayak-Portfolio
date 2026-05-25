package com.kolkata.realestate.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "site_stats")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class SiteStat {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "stat_key", nullable = false, unique = true, length = 100)
    private String statKey;

    @Column(name = "stat_label", nullable = false, length = 200)
    private String statLabel;

    @Column(name = "stat_value", nullable = false, length = 100)
    private String statValue;

    @Column(name = "display_order")
    private int displayOrder = 0;

    private boolean visible = true;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    void onSave() { updatedAt = LocalDateTime.now(); }
}

package com.kolkata.realestate.repository;

import com.kolkata.realestate.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findBySlug(String slug);
    Optional<Project> findBySlugAndVisibleTrue(String slug);
    List<Project> findByVisibleTrueOrderByDisplayOrderAsc();
    List<Project> findByFeaturedTrueAndVisibleTrueOrderByDisplayOrderAsc();
    List<Project> findByStatusAndVisibleTrue(Project.Status status);
    boolean existsBySlug(String slug);

    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.photos WHERE p.visible = true ORDER BY p.displayOrder ASC")
    List<Project> findAllVisibleWithPhotos();
}

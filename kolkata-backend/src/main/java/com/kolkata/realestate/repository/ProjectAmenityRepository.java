package com.kolkata.realestate.repository;

import com.kolkata.realestate.entity.ProjectAmenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectAmenityRepository extends JpaRepository<ProjectAmenity, Long> {
    List<ProjectAmenity> findByProjectIdOrderByDisplayOrderAsc(Long projectId);
    void deleteByProjectId(Long projectId);
}

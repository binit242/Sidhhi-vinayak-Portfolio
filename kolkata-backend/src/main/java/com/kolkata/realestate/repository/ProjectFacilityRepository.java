package com.kolkata.realestate.repository;

import com.kolkata.realestate.entity.ProjectFacility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectFacilityRepository extends JpaRepository<ProjectFacility, Long> {
    List<ProjectFacility> findByProjectIdOrderByDisplayOrderAsc(Long projectId);
    void deleteByProjectId(Long projectId);
}

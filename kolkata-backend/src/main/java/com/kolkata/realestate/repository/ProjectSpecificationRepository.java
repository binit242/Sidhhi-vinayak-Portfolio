package com.kolkata.realestate.repository;

import com.kolkata.realestate.entity.ProjectSpecification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectSpecificationRepository extends JpaRepository<ProjectSpecification, Long> {
    List<ProjectSpecification> findByProjectIdOrderByDisplayOrderAsc(Long projectId);
    void deleteByProjectId(Long projectId);
}

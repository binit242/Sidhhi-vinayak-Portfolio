package com.kolkata.realestate.repository;

import com.kolkata.realestate.entity.ProjectPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectPhotoRepository extends JpaRepository<ProjectPhoto, Long> {
    List<ProjectPhoto> findByProjectIdOrderByDisplayOrderAsc(Long projectId);
    void deleteByProjectId(Long projectId);
}

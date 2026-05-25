package com.kolkata.realestate.repository;

import com.kolkata.realestate.entity.ProjectLocalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectLocalInfoRepository extends JpaRepository<ProjectLocalInfo, Long> {
    List<ProjectLocalInfo> findByProjectIdOrderByDisplayOrderAsc(Long projectId);
    void deleteByProjectId(Long projectId);
}

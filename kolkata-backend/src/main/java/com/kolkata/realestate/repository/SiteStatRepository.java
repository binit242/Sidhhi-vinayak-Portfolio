package com.kolkata.realestate.repository;

import com.kolkata.realestate.entity.SiteStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SiteStatRepository extends JpaRepository<SiteStat, Long> {
    List<SiteStat> findByVisibleTrueOrderByDisplayOrderAsc();
    Optional<SiteStat> findByStatKey(String statKey);
}

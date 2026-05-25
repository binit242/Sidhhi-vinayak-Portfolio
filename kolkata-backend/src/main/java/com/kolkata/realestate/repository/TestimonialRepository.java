package com.kolkata.realestate.repository;

import com.kolkata.realestate.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
    List<Testimonial> findByVisibleTrueOrderByDisplayOrderAsc();
    List<Testimonial> findByFeaturedTrueAndVisibleTrueOrderByDisplayOrderAsc();
}

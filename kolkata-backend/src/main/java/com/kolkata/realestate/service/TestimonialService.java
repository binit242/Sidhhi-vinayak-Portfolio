package com.kolkata.realestate.service;

import com.kolkata.realestate.dto.*;
import com.kolkata.realestate.entity.*;
import com.kolkata.realestate.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TestimonialService {

    private final TestimonialRepository testimonialRepo;
    private final ProjectRepository     projectRepo;

    @Transactional(readOnly = true)
    public List<TestimonialDto> getVisible() {
        return testimonialRepo.findByVisibleTrueOrderByDisplayOrderAsc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TestimonialDto> getAll() {
        return testimonialRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TestimonialDto getById(Long id) {
        return toDto(testimonialRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Testimonial not found")));
    }

    public TestimonialDto create(TestimonialRequest req) {
        return toDto(testimonialRepo.save(buildTestimonial(new Testimonial(), req)));
    }

    public TestimonialDto update(Long id, TestimonialRequest req) {
        Testimonial t = testimonialRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Testimonial not found"));
        return toDto(testimonialRepo.save(buildTestimonial(t, req)));
    }

    public void delete(Long id) { testimonialRepo.deleteById(id); }

    private Testimonial buildTestimonial(Testimonial t, TestimonialRequest req) {
        t.setClientName(req.getClientName()); t.setClientTitle(req.getClientTitle());
        t.setAvatarUrl(req.getAvatarUrl()); t.setRating(req.getRating());
        t.setReview(req.getReview()); t.setFeatured(req.isFeatured());
        t.setVisible(req.isVisible()); t.setDisplayOrder(req.getDisplayOrder());
        if (req.getProjectId() != null)
            t.setProject(projectRepo.findById(req.getProjectId()).orElse(null));
        else t.setProject(null);
        return t;
    }

    private TestimonialDto toDto(Testimonial t) {
        TestimonialDto d = new TestimonialDto();
        d.setId(t.getId()); d.setClientName(t.getClientName());
        d.setClientTitle(t.getClientTitle()); d.setAvatarUrl(t.getAvatarUrl());
        d.setRating(t.getRating()); d.setReview(t.getReview());
        d.setFeatured(t.isFeatured()); d.setVisible(t.isVisible());
        d.setDisplayOrder(t.getDisplayOrder());
        d.setCreatedAt(t.getCreatedAt() != null ? t.getCreatedAt().toString() : null);
        if (t.getProject() != null) {
            d.setProjectId(t.getProject().getId());
            d.setProjectName(t.getProject().getName());
        }
        return d;
    }
}

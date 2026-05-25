package com.kolkata.realestate.controller;

import com.kolkata.realestate.dto.*;
import com.kolkata.realestate.repository.*;
import com.kolkata.realestate.service.EnquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final ProjectRepository     projectRepo;
    private final TestimonialRepository testimonialRepo;
    private final ContactEnquiryRepository enquiryRepo;
    private final AppointmentRequestRepository appointmentRepo;
    private final EnquiryService        enquiryService;

    @GetMapping({"", "/summary"})
    public ResponseEntity<ApiResponse<DashboardSummaryDto>> summary() {
        DashboardSummaryDto d = new DashboardSummaryDto();
        d.setTotalProjects(projectRepo.count());
        d.setVisibleProjects(projectRepo.findByVisibleTrueOrderByDisplayOrderAsc().size());
        d.setFeaturedProjects(projectRepo.findByFeaturedTrueAndVisibleTrueOrderByDisplayOrderAsc().size());
        d.setTotalTestimonials(testimonialRepo.count());
        d.setNewEnquiries(enquiryService.countNewEnquiries());
        d.setTotalEnquiries(enquiryRepo.count());
        d.setTotalAppointments(appointmentRepo.count());
        try {
            d.setPendingAppointments(enquiryService.countPendingAppointments());
        } catch (Exception e) {
            d.setPendingAppointments(0);
        }
        try {
            d.setRecentEnquiries(enquiryService.getEnquiries(0, 5, null).getContent());
        } catch (Exception e) {
            d.setRecentEnquiries(java.util.List.of());
        }
        try {
            d.setRecentAppointments(enquiryService.getAppointments(0, 5, null).getContent());
        } catch (Exception e) {
            d.setRecentAppointments(java.util.List.of());
        }
        return ResponseEntity.ok(ApiResponse.ok(d));
    }
}

package com.kolkata.realestate.controller;

import com.kolkata.realestate.dto.*;
import com.kolkata.realestate.service.EnquiryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class EnquiryController {
    private final EnquiryService enquiryService;

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<EnquiryDto>> contact(
            @Valid @RequestBody ContactRequest req, HttpServletRequest httpReq) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(
                "Message sent! We'll be in touch soon.",
                enquiryService.submitEnquiry(req, httpReq.getRemoteAddr(), httpReq.getHeader("User-Agent"))));
    }

    @PostMapping("/appointments")
    public ResponseEntity<ApiResponse<AppointmentDto>> book(
            @Valid @RequestBody AppointmentRequest req, HttpServletRequest httpReq) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(
                "Appointment request submitted!",
                enquiryService.submitAppointment(req, httpReq.getRemoteAddr())));
    }

    @GetMapping("/admin/enquiries")
    public ResponseEntity<ApiResponse<PageResponse<EnquiryDto>>> listEnquiries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(ApiResponse.ok(enquiryService.getEnquiries(page, size, status)));
    }

    @PatchMapping("/admin/enquiries/{id}")
    public ResponseEntity<ApiResponse<EnquiryDto>> updateEnquiry(
            @PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.ok("Updated",
                enquiryService.updateEnquiryStatus(id, body.get("status"), body.get("notes"))));
    }

    @DeleteMapping("/admin/enquiries/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEnquiry(@PathVariable Long id) {
        enquiryService.deleteEnquiry(id);
        return ResponseEntity.ok(ApiResponse.ok("Enquiry deleted", null));
    }

    @GetMapping("/admin/appointments")
    public ResponseEntity<ApiResponse<PageResponse<AppointmentDto>>> listAppointments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(ApiResponse.ok(enquiryService.getAppointments(page, size, status)));
    }

    @PatchMapping("/admin/appointments/{id}")
    public ResponseEntity<ApiResponse<AppointmentDto>> updateAppointment(
            @PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.ok("Updated",
                enquiryService.updateAppointmentStatus(id, body.get("status"), body.get("notes"))));
    }

    @DeleteMapping("/admin/appointments/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAppointment(@PathVariable Long id) {
        enquiryService.deleteAppointment(id);
        return ResponseEntity.ok(ApiResponse.ok("Appointment deleted", null));
    }
}

package com.kolkata.realestate.service;

import com.kolkata.realestate.dto.AppointmentDto;
import com.kolkata.realestate.dto.ContactRequest;
import com.kolkata.realestate.dto.EnquiryDto;
import com.kolkata.realestate.dto.PageResponse;
import com.kolkata.realestate.entity.ContactEnquiry;
import com.kolkata.realestate.repository.AppointmentRequestRepository;
import com.kolkata.realestate.repository.ContactEnquiryRepository;
import com.kolkata.realestate.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
public class EnquiryService {

    private final ContactEnquiryRepository     enquiryRepo;
    private final AppointmentRequestRepository appointmentRepo;
    private final ProjectRepository            projectRepo;

    // ── Contact Enquiries ────────────────────────────────────────────────
    public EnquiryDto submitEnquiry(ContactRequest req, String ip, String ua) {
        ContactEnquiry e = ContactEnquiry.builder()
                .fullName(req.getFullName()).email(req.getEmail())
                .phone(req.getPhone()).subject(req.getSubject())
                .message(req.getMessage()).sourcePage(req.getSourcePage())
                .ipAddress(ip).userAgent(ua)
                .status(ContactEnquiry.Status.NEW).build();
        if (req.getProjectId() != null)
            e.setProject(projectRepo.findById(req.getProjectId()).orElse(null));
        return toEnquiryDto(enquiryRepo.save(e));
    }

    @Transactional(readOnly = true)
    public PageResponse<EnquiryDto> getEnquiries(int page, int size, String status) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactEnquiry> result = (status != null && !status.isBlank())
                ? enquiryRepo.findByStatusOrderByCreatedAtDesc(
                    ContactEnquiry.Status.valueOf(status), pageable)
                : enquiryRepo.findAllByOrderByCreatedAtDesc(pageable);
        return toPage(result.map(this::toEnquiryDto));
    }

    public EnquiryDto updateEnquiryStatus(Long id, String status, String notes) {
        ContactEnquiry e = enquiryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Enquiry not found"));
        if (status != null && !status.isBlank()) e.setStatus(ContactEnquiry.Status.valueOf(status));
        if (notes  != null) e.setAdminNotes(notes);
        return toEnquiryDto(enquiryRepo.save(e));
    }

    public void deleteEnquiry(Long id) { enquiryRepo.deleteById(id); }

    // ── Appointments ─────────────────────────────────────────────────────
    public AppointmentDto submitAppointment(com.kolkata.realestate.dto.AppointmentRequest req, String ip) {
        com.kolkata.realestate.entity.AppointmentRequest a = com.kolkata.realestate.entity.AppointmentRequest.builder()
                .fullName(req.getFullName()).email(req.getEmail())
                .phone(req.getPhone())
                .preferredDate(req.getPreferredDate() != null && !req.getPreferredDate().isBlank()
                    ? LocalDate.parse(req.getPreferredDate()) : null)
                .preferredTime(req.getPreferredTime())
                .visitType(safeVisitType(req.getVisitType()))
                .message(req.getMessage())
                .ipAddress(ip)
                .status(com.kolkata.realestate.entity.AppointmentRequest.Status.PENDING)
                .build();
        if (req.getProjectId() != null)
            a.setProject(projectRepo.findById(req.getProjectId()).orElse(null));
        return toAppointmentDto(appointmentRepo.save(a));
    }

    @Transactional(readOnly = true)
    public PageResponse<AppointmentDto> getAppointments(int page, int size, String status) {
        Pageable pageable = PageRequest.of(page, size);
        Page<com.kolkata.realestate.entity.AppointmentRequest> result = (status != null && !status.isBlank())
            ? appointmentRepo.findByStatusOrderByCreatedAtDesc(
                com.kolkata.realestate.entity.AppointmentRequest.Status.valueOf(status), pageable)
            : appointmentRepo.findAllByOrderByCreatedAtDesc(pageable);
        return toPage(result.map(this::toAppointmentDto));
    }

    public AppointmentDto updateAppointmentStatus(Long id, String status, String notes) {
    com.kolkata.realestate.entity.AppointmentRequest a = appointmentRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
        if (status != null && !status.isBlank())
            a.setStatus(com.kolkata.realestate.entity.AppointmentRequest.Status.valueOf(status));
        if (notes != null) a.setAdminNotes(notes);
        return toAppointmentDto(appointmentRepo.save(a));
    }

    public void deleteAppointment(Long id) { appointmentRepo.deleteById(id); }

    // ── Counts ───────────────────────────────────────────────────────────
    @Transactional(readOnly = true)
    public long countNewEnquiries() {
        return enquiryRepo.countByStatus(ContactEnquiry.Status.NEW);
    }

    @Transactional(readOnly = true)
    public long countPendingAppointments() {
        return appointmentRepo.countByStatus(com.kolkata.realestate.entity.AppointmentRequest.Status.PENDING);
    }

    // ── Mappers ──────────────────────────────────────────────────────────
    private EnquiryDto toEnquiryDto(ContactEnquiry e) {
        EnquiryDto d = new EnquiryDto();
        d.setId(e.getId()); d.setFullName(e.getFullName()); d.setEmail(e.getEmail());
        d.setPhone(e.getPhone()); d.setSubject(e.getSubject()); d.setMessage(e.getMessage());
        d.setSourcePage(e.getSourcePage()); d.setStatus(e.getStatus().name());
        d.setAdminNotes(e.getAdminNotes()); d.setIpAddress(e.getIpAddress());
        d.setCreatedAt(e.getCreatedAt() != null ? e.getCreatedAt().toString() : null);
        d.setUpdatedAt(e.getUpdatedAt() != null ? e.getUpdatedAt().toString() : null);
        if (e.getProject() != null) {
            d.setProjectId(e.getProject().getId());
            d.setProjectName(e.getProject().getName());
        }
        return d;
    }

    private AppointmentDto toAppointmentDto(com.kolkata.realestate.entity.AppointmentRequest a) {
        AppointmentDto d = new AppointmentDto();
        d.setId(a.getId()); d.setFullName(a.getFullName()); d.setEmail(a.getEmail());
        d.setPhone(a.getPhone());
        d.setPreferredDate(a.getPreferredDate() != null ? a.getPreferredDate().toString() : null);
        d.setPreferredTime(a.getPreferredTime());
        d.setVisitType(a.getVisitType() != null ? a.getVisitType().name() : null);
        d.setMessage(a.getMessage()); d.setStatus(a.getStatus().name());
        d.setAdminNotes(a.getAdminNotes()); d.setIpAddress(a.getIpAddress());
        d.setCreatedAt(a.getCreatedAt() != null ? a.getCreatedAt().toString() : null);
        d.setUpdatedAt(a.getUpdatedAt() != null ? a.getUpdatedAt().toString() : null);
        if (a.getProject() != null) {
            d.setProjectId(a.getProject().getId());
            d.setProjectName(a.getProject().getName());
        }
        return d;
    }

    private com.kolkata.realestate.entity.AppointmentRequest.VisitType safeVisitType(String s) {
        try { return com.kolkata.realestate.entity.AppointmentRequest.VisitType.valueOf(s); }
        catch (Exception e) { return com.kolkata.realestate.entity.AppointmentRequest.VisitType.SITE_VISIT; }
    }

    private <T> PageResponse<T> toPage(Page<T> page) {
        PageResponse<T> r = new PageResponse<>();
        r.setContent(page.getContent()); r.setPage(page.getNumber());
        r.setSize(page.getSize()); r.setTotalElements(page.getTotalElements());
        r.setTotalPages(page.getTotalPages()); r.setLast(page.isLast());
        return r;
    }
}

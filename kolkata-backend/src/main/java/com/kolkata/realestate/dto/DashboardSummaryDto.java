package com.kolkata.realestate.dto;

import lombok.Data;
import java.util.List;

@Data
public class DashboardSummaryDto {
    private long totalProjects;
    private long visibleProjects;
    private long featuredProjects;
    private long totalTestimonials;
    private long newEnquiries;
    private long totalEnquiries;
    private long pendingAppointments;
    private long totalAppointments;
    private List<EnquiryDto>     recentEnquiries;
    private List<AppointmentDto> recentAppointments;
}

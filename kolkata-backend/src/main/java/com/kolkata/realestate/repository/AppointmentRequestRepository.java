package com.kolkata.realestate.repository;

import com.kolkata.realestate.entity.AppointmentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRequestRepository extends JpaRepository<AppointmentRequest, Long> {
    Page<AppointmentRequest> findByStatusOrderByCreatedAtDesc(AppointmentRequest.Status status, Pageable pageable);
    Page<AppointmentRequest> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatus(AppointmentRequest.Status status);
}

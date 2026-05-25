package com.kolkata.realestate.repository;

import com.kolkata.realestate.entity.ContactEnquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactEnquiryRepository extends JpaRepository<ContactEnquiry, Long> {
    Page<ContactEnquiry> findByStatusOrderByCreatedAtDesc(ContactEnquiry.Status status, Pageable pageable);
    Page<ContactEnquiry> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatus(ContactEnquiry.Status status);
}

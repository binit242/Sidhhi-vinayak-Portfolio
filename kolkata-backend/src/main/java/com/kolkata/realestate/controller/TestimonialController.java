package com.kolkata.realestate.controller;

import com.kolkata.realestate.dto.*;
import com.kolkata.realestate.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class TestimonialController {
    private final TestimonialService testimonialService;
    private final FileUploadService  uploadService;

    @GetMapping("/testimonials")
    public ResponseEntity<ApiResponse<List<TestimonialDto>>> getPublic() {
        return ResponseEntity.ok(ApiResponse.ok(testimonialService.getAll()));
    }

    @GetMapping("/admin/testimonials")
    public ResponseEntity<ApiResponse<List<TestimonialDto>>> adminGetAll() {
        return ResponseEntity.ok(ApiResponse.ok(testimonialService.getAll()));
    }

    @GetMapping("/admin/testimonials/{id}")
    public ResponseEntity<ApiResponse<TestimonialDto>> adminGet(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(testimonialService.getById(id)));
    }

    @PostMapping("/admin/testimonials")
    public ResponseEntity<ApiResponse<TestimonialDto>> create(@Valid @RequestBody TestimonialRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Testimonial created", testimonialService.create(req)));
    }

    @PutMapping("/admin/testimonials/{id}")
    public ResponseEntity<ApiResponse<TestimonialDto>> update(
            @PathVariable Long id, @Valid @RequestBody TestimonialRequest req) {
        return ResponseEntity.ok(ApiResponse.ok("Testimonial updated", testimonialService.update(id, req)));
    }

    @DeleteMapping("/admin/testimonials/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        testimonialService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Testimonial deleted", null));
    }

    @PostMapping("/admin/testimonials/upload-avatar")
    public ResponseEntity<ApiResponse<String>> uploadAvatar(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(ApiResponse.ok("Uploaded", uploadService.uploadImage(file, "avatars")));
    }
}

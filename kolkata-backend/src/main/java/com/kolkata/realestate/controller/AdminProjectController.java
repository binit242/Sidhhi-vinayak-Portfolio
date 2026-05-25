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
@RequestMapping("/admin/projects")
@RequiredArgsConstructor
public class AdminProjectController {

    private final ProjectService    projectService;
    private final FileUploadService uploadService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectSummaryDto>>> list() {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDetailDto>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectDetailDto>> create(@Valid @RequestBody ProjectRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Project created", projectService.create(req)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDetailDto>> update(
            @PathVariable Long id, @Valid @RequestBody ProjectRequest req) {
        return ResponseEntity.ok(ApiResponse.ok("Project updated", projectService.update(id, req)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        projectService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Project deleted", null));
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<ApiResponse<String>> uploadPhoto(
            @PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        String url = uploadService.uploadImage(file, "projects/" + id);
        return ResponseEntity.ok(ApiResponse.ok("Uploaded", url));
    }

    @PostMapping("/{id}/photos")
    public ResponseEntity<ApiResponse<PhotoDto>> addPhoto(@PathVariable Long id, @RequestBody PhotoRequest req) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.addPhoto(id, req)));
    }
    @PutMapping("/photos/{photoId}")
    public ResponseEntity<ApiResponse<PhotoDto>> updatePhoto(@PathVariable Long photoId, @RequestBody PhotoRequest req) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.updatePhoto(photoId, req)));
    }
    @DeleteMapping("/photos/{photoId}")
    public ResponseEntity<ApiResponse<Void>> deletePhoto(@PathVariable Long photoId) {
        projectService.deletePhoto(photoId);
        return ResponseEntity.ok(ApiResponse.ok("Photo deleted", null));
    }

    @PostMapping("/{id}/amenities")
    public ResponseEntity<ApiResponse<AmenityDto>> addAmenity(@PathVariable Long id, @RequestBody AmenityRequest req) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.addAmenity(id, req)));
    }
    @PutMapping("/amenities/{amenityId}")
    public ResponseEntity<ApiResponse<AmenityDto>> updateAmenity(@PathVariable Long amenityId, @RequestBody AmenityRequest req) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.updateAmenity(amenityId, req)));
    }
    @DeleteMapping("/amenities/{amenityId}")
    public ResponseEntity<ApiResponse<Void>> deleteAmenity(@PathVariable Long amenityId) {
        projectService.deleteAmenity(amenityId);
        return ResponseEntity.ok(ApiResponse.ok("Amenity deleted", null));
    }

    @PostMapping("/{id}/facilities")
    public ResponseEntity<ApiResponse<FacilityDto>> addFacility(@PathVariable Long id, @RequestBody FacilityRequest req) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.addFacility(id, req)));
    }
    @PutMapping("/facilities/{facilityId}")
    public ResponseEntity<ApiResponse<FacilityDto>> updateFacility(@PathVariable Long facilityId, @RequestBody FacilityRequest req) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.updateFacility(facilityId, req)));
    }
    @DeleteMapping("/facilities/{facilityId}")
    public ResponseEntity<ApiResponse<Void>> deleteFacility(@PathVariable Long facilityId) {
        projectService.deleteFacility(facilityId);
        return ResponseEntity.ok(ApiResponse.ok("Facility deleted", null));
    }

    @PostMapping("/{id}/local-info")
    public ResponseEntity<ApiResponse<LocalInfoDto>> addLocalInfo(@PathVariable Long id, @RequestBody LocalInfoRequest req) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.addLocalInfo(id, req)));
    }
    @PutMapping("/local-info/{infoId}")
    public ResponseEntity<ApiResponse<LocalInfoDto>> updateLocalInfo(@PathVariable Long infoId, @RequestBody LocalInfoRequest req) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.updateLocalInfo(infoId, req)));
    }
    @DeleteMapping("/local-info/{infoId}")
    public ResponseEntity<ApiResponse<Void>> deleteLocalInfo(@PathVariable Long infoId) {
        projectService.deleteLocalInfo(infoId);
        return ResponseEntity.ok(ApiResponse.ok("Local info deleted", null));
    }

    @PostMapping("/{id}/specifications")
    public ResponseEntity<ApiResponse<SpecificationDto>> addSpec(@PathVariable Long id, @RequestBody SpecificationRequest req) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.addSpec(id, req)));
    }
    @PutMapping("/specifications/{specId}")
    public ResponseEntity<ApiResponse<SpecificationDto>> updateSpec(@PathVariable Long specId, @RequestBody SpecificationRequest req) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.updateSpec(specId, req)));
    }
    @DeleteMapping("/specifications/{specId}")
    public ResponseEntity<ApiResponse<Void>> deleteSpec(@PathVariable Long specId) {
        projectService.deleteSpec(specId);
        return ResponseEntity.ok(ApiResponse.ok("Specification deleted", null));
    }
}

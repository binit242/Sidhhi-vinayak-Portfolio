package com.kolkata.realestate.controller;

import com.kolkata.realestate.dto.*;
import com.kolkata.realestate.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class PublicProjectController {
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectSummaryDto>>> list() {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getAllVisible()));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProjectSummaryDto>>> featured() {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getFeatured()));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<ProjectDetailDto>> detail(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getBySlug(slug)));
    }
}

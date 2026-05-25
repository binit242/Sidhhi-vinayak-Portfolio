package com.kolkata.realestate.controller;

import com.kolkata.realestate.dto.*;
import com.kolkata.realestate.service.SiteStatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class StatsController {
    private final SiteStatService statService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<List<SiteStatDto>>> getPublicStats() {
        return ResponseEntity.ok(ApiResponse.ok(statService.getVisible()));
    }

    @GetMapping("/admin/stats")
    public ResponseEntity<ApiResponse<List<SiteStatDto>>> adminGetAll() {
        return ResponseEntity.ok(ApiResponse.ok(statService.getAll()));
    }

    @PostMapping("/admin/stats")
    public ResponseEntity<ApiResponse<SiteStatDto>> create(@RequestBody SiteStatDto req) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Stat created", statService.create(req)));
    }

    @PutMapping("/admin/stats/{id}")
    public ResponseEntity<ApiResponse<SiteStatDto>> update(@PathVariable Long id, @RequestBody SiteStatDto req) {
        return ResponseEntity.ok(ApiResponse.ok("Stat updated", statService.update(id, req)));
    }

    @DeleteMapping("/admin/stats/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        statService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Stat deleted", null));
    }
}

package com.kolkata.realestate.controller;

import com.kolkata.realestate.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("timestamp", System.currentTimeMillis());
        status.put("application", "Kolkata Real Estate Backend");
        return ResponseEntity.ok(ApiResponse.ok(status));
    }

    @GetMapping("/api/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> apiHealth() {
        return health();
    }
}

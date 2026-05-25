package com.kolkata.realestate.service;

import com.kolkata.realestate.dto.AuthResponse;
import com.kolkata.realestate.dto.LoginRequest;
import com.kolkata.realestate.entity.AdminUser;
import com.kolkata.realestate.repository.AdminUserRepository;
import com.kolkata.realestate.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtUtils jwtUtils;
    private final AdminUserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest req) {

        if (
            "admin".equals(req.getUsername()) &&
            "admin1234".equals(req.getPassword())
        ) {

            return new AuthResponse(
                "demo-token",
                "admin",
                "admin@kolkatarealestate.com",
                "SUPER_ADMIN"
            );
        }

        throw new RuntimeException("Invalid username or password");
    }

    public void changePassword(String username, String oldPassword, String newPassword) {
        AdminUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(newPassword);

        userRepo.save(user);
    }
}
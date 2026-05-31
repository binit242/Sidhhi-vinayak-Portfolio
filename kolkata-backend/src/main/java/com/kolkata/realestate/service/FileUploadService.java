package com.kolkata.realestate.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;

@Service
@Slf4j
public class FileUploadService {

    private static final Set<String> ALLOWED = Set.of("jpg","jpeg","png","webp","gif");

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Value("${app.upload.base-url}")
    private String baseUrl;

    public String uploadImage(MultipartFile file, String subdir) throws IOException {
        String ext = FilenameUtils.getExtension(file.getOriginalFilename()).toLowerCase();
        if (!ALLOWED.contains(ext))
            throw new IllegalArgumentException("File type not allowed: " + ext);

        Path dir = Paths.get(uploadDir, subdir);
        Files.createDirectories(dir);

        String filename = UUID.randomUUID() + "." + ext;
        Path target = dir.resolve(filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        return "/api/uploads/" + subdir + "/" + filename;
    }

    public void deleteFile(String url) {
        try {
            String path = url
                    .replace(baseUrl + "/uploads/", "")
                    .replace("/api/uploads/", "");
            Files.deleteIfExists(Paths.get(uploadDir, path));
        } catch (IOException e) {
            log.warn("Could not delete file: {}", url);
        }
    }
}

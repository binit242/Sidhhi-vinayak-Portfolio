package com.kolkata.realestate.service;

import com.kolkata.realestate.dto.*;
import com.kolkata.realestate.entity.*;
import com.kolkata.realestate.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectService {

    private final ProjectRepository             projectRepo;
    private final ProjectPhotoRepository        photoRepo;
    private final ProjectAmenityRepository      amenityRepo;
    private final ProjectFacilityRepository     facilityRepo;
    private final ProjectLocalInfoRepository    localInfoRepo;
    private final ProjectSpecificationRepository specRepo;

    // ── Public ──────────────────────────────────────────────────────────
    @Transactional(readOnly = true)
    public List<ProjectSummaryDto> getAllVisible() {
        return projectRepo.findAllVisibleWithPhotos()
                .stream().map(this::toSummary).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProjectSummaryDto> getFeatured() {
        return projectRepo.findByFeaturedTrueAndVisibleTrueOrderByDisplayOrderAsc()
                .stream().map(this::toSummary).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDetailDto getBySlug(String slug) {
        Project p = projectRepo.findBySlugAndVisibleTrue(slug)
                .orElseGet(() -> findVisibleByNumericId(slug));
        return toDetail(p);
    }

    // ── Admin ────────────────────────────────────────────────────────────
    @Transactional(readOnly = true)
    public List<ProjectSummaryDto> getAll() {
        return projectRepo.findAll().stream().map(this::toSummary).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDetailDto getById(Long id) {
        Project p = projectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));
        return toDetail(p);
    }

    public ProjectDetailDto create(ProjectRequest req) {
        String slug = resolveSlug(req.getSlug(), req.getName());
        if (projectRepo.existsBySlug(slug))
            throw new RuntimeException("Slug already exists: " + slug);
        return toDetail(projectRepo.save(buildProject(new Project(), req, slug)));
    }

    public ProjectDetailDto update(Long id, ProjectRequest req) {
        Project p = projectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));
        String slug = resolveSlug(req.getSlug(), req.getName());
        if (!slug.equals(p.getSlug()) && projectRepo.existsBySlug(slug))
            throw new RuntimeException("Slug already exists: " + slug);
        return toDetail(projectRepo.save(buildProject(p, req, slug)));
    }

    public void delete(Long id) {
        if (!projectRepo.existsById(id)) throw new RuntimeException("Project not found: " + id);
        projectRepo.deleteById(id);
    }

    // ── Photos ───────────────────────────────────────────────────────────
    public PhotoDto addPhoto(Long projectId, PhotoRequest req) {
        Project p = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        ProjectPhoto photo = ProjectPhoto.builder()
                .project(p).url(req.getUrl()).caption(req.getCaption())
                .photoType(safePhotoType(req.getPhotoType()))
                .displayOrder(req.getDisplayOrder()).build();
        return toPhotoDto(photoRepo.save(photo));
    }

    public PhotoDto updatePhoto(Long photoId, PhotoRequest req) {
        ProjectPhoto photo = photoRepo.findById(photoId)
                .orElseThrow(() -> new RuntimeException("Photo not found"));
        photo.setUrl(req.getUrl()); photo.setCaption(req.getCaption());
        photo.setPhotoType(safePhotoType(req.getPhotoType()));
        photo.setDisplayOrder(req.getDisplayOrder());
        return toPhotoDto(photoRepo.save(photo));
    }

    public void deletePhoto(Long photoId) { photoRepo.deleteById(photoId); }

    // ── Amenities ────────────────────────────────────────────────────────
    public AmenityDto addAmenity(Long projectId, AmenityRequest req) {
        Project p = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        ProjectAmenity a = ProjectAmenity.builder()
                .project(p).name(req.getName()).icon(req.getIcon())
                .category(req.getCategory()).description(req.getDescription())
                .displayOrder(req.getDisplayOrder()).build();
        return toAmenityDto(amenityRepo.save(a));
    }

    public AmenityDto updateAmenity(Long id, AmenityRequest req) {
        ProjectAmenity a = amenityRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Amenity not found"));
        a.setName(req.getName()); a.setIcon(req.getIcon());
        a.setCategory(req.getCategory()); a.setDescription(req.getDescription());
        a.setDisplayOrder(req.getDisplayOrder());
        return toAmenityDto(amenityRepo.save(a));
    }

    public void deleteAmenity(Long id) { amenityRepo.deleteById(id); }

    // ── Facilities ───────────────────────────────────────────────────────
    public FacilityDto addFacility(Long projectId, FacilityRequest req) {
        Project p = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        ProjectFacility f = ProjectFacility.builder()
                .project(p).name(req.getName()).icon(req.getIcon())
                .value(req.getValue()).description(req.getDescription())
                .displayOrder(req.getDisplayOrder()).build();
        return toFacilityDto(facilityRepo.save(f));
    }

    public FacilityDto updateFacility(Long id, FacilityRequest req) {
        ProjectFacility f = facilityRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Facility not found"));
        f.setName(req.getName()); f.setIcon(req.getIcon());
        f.setValue(req.getValue()); f.setDescription(req.getDescription());
        f.setDisplayOrder(req.getDisplayOrder());
        return toFacilityDto(facilityRepo.save(f));
    }

    public void deleteFacility(Long id) { facilityRepo.deleteById(id); }

    // ── LocalInfo ────────────────────────────────────────────────────────
    public LocalInfoDto addLocalInfo(Long projectId, LocalInfoRequest req) {
        Project p = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        ProjectLocalInfo li = ProjectLocalInfo.builder()
                .project(p).category(safeLocalCategory(req.getCategory()))
                .name(req.getName()).distance(req.getDistance())
                .description(req.getDescription()).displayOrder(req.getDisplayOrder()).build();
        return toLocalInfoDto(localInfoRepo.save(li));
    }

    public LocalInfoDto updateLocalInfo(Long id, LocalInfoRequest req) {
        ProjectLocalInfo li = localInfoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("LocalInfo not found"));
        li.setCategory(safeLocalCategory(req.getCategory()));
        li.setName(req.getName()); li.setDistance(req.getDistance());
        li.setDescription(req.getDescription()); li.setDisplayOrder(req.getDisplayOrder());
        return toLocalInfoDto(localInfoRepo.save(li));
    }

    public void deleteLocalInfo(Long id) { localInfoRepo.deleteById(id); }

    // ── Specifications ───────────────────────────────────────────────────
    public SpecificationDto addSpec(Long projectId, SpecificationRequest req) {
        Project p = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        ProjectSpecification s = ProjectSpecification.builder()
                .project(p).unitType(req.getUnitType())
                .carpetArea(req.getCarpetArea()).builtUpArea(req.getBuiltUpArea())
                .superArea(req.getSuperArea()).floorCount(req.getFloorCount())
                .bathrooms(req.getBathrooms()).balconies(req.getBalconies())
                .parking(req.getParking()).price(req.getPrice())
                .description(req.getDescription()).displayOrder(req.getDisplayOrder()).build();
        return toSpecDto(specRepo.save(s));
    }

    public SpecificationDto updateSpec(Long id, SpecificationRequest req) {
        ProjectSpecification s = specRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Specification not found"));
        s.setUnitType(req.getUnitType()); s.setCarpetArea(req.getCarpetArea());
        s.setBuiltUpArea(req.getBuiltUpArea()); s.setSuperArea(req.getSuperArea());
        s.setFloorCount(req.getFloorCount()); s.setBathrooms(req.getBathrooms());
        s.setBalconies(req.getBalconies()); s.setParking(req.getParking());
        s.setPrice(req.getPrice()); s.setDescription(req.getDescription());
        s.setDisplayOrder(req.getDisplayOrder());
        return toSpecDto(specRepo.save(s));
    }

    public void deleteSpec(Long id) { specRepo.deleteById(id); }

    // ── Private helpers ──────────────────────────────────────────────────
    private String resolveSlug(String slug, String name) {
        if (slug != null && !slug.isBlank()) return slug.trim().toLowerCase();
        return name.trim().toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");
    }

    private Project buildProject(Project p, ProjectRequest req, String slug) {
        p.setName(req.getName()); p.setSlug(slug); p.setTagline(req.getTagline());
        p.setDescription(req.getDescription()); p.setLocation(req.getLocation());
        p.setCity(req.getCity()); p.setState(req.getState()); p.setPincode(req.getPincode());
        p.setStatus(Project.Status.valueOf(req.getStatus()));
        p.setPropertyType(Project.PropertyType.valueOf(req.getPropertyType()));
        p.setTotalUnits(req.getTotalUnits()); p.setAvailableUnits(req.getAvailableUnits());
        p.setPriceMin(req.getPriceMin()); p.setPriceMax(req.getPriceMax());
        p.setPriceUnit(req.getPriceUnit());
        p.setAreaMin(req.getAreaMin()); p.setAreaMax(req.getAreaMax());
        if (req.getPossessionDate() != null && !req.getPossessionDate().isBlank())
            p.setPossessionDate(LocalDate.parse(req.getPossessionDate()));
        p.setReraNumber(req.getReraNumber()); p.setDeveloperName(req.getDeveloperName());
        p.setWebsiteUrl(req.getWebsiteUrl());
        p.setMapLatitude(req.getMapLatitude()); p.setMapLongitude(req.getMapLongitude());
        p.setFeatured(req.isFeatured()); p.setVisible(req.isVisible());
        p.setDisplayOrder(req.getDisplayOrder());
        return p;
    }

    private ProjectPhoto.PhotoType safePhotoType(String s) {
        try { return ProjectPhoto.PhotoType.valueOf(s); }
        catch (Exception e) { return ProjectPhoto.PhotoType.GALLERY; }
    }

    private ProjectLocalInfo.Category safeLocalCategory(String s) {
        try { return ProjectLocalInfo.Category.valueOf(s); }
        catch (Exception e) { return ProjectLocalInfo.Category.OTHER; }
    }

    private Project findVisibleByNumericId(String value) {
        try {
            Long id = Long.valueOf(value);
            return projectRepo.findById(id)
                    .filter(Project::isVisible)
                    .orElseThrow(() -> new RuntimeException("Project not found: " + value));
        } catch (NumberFormatException e) {
            throw new RuntimeException("Project not found: " + value);
        }
    }

    // ── Mappers ──────────────────────────────────────────────────────────
    private ProjectSummaryDto toSummary(Project p) {
        ProjectSummaryDto d = new ProjectSummaryDto();
        d.setId(p.getId()); d.setName(p.getName()); d.setSlug(p.getSlug());
        d.setTagline(p.getTagline()); d.setLocation(p.getLocation()); d.setCity(p.getCity());
        d.setStatus(p.getStatus().name()); d.setPropertyType(p.getPropertyType().name());
        d.setPriceMin(p.getPriceMin() != null ? p.getPriceMin().toPlainString() : null);
        d.setPriceMax(p.getPriceMax() != null ? p.getPriceMax().toPlainString() : null);
        d.setPriceUnit(p.getPriceUnit()); d.setFeatured(p.isFeatured());
        d.setVisible(p.isVisible()); d.setDisplayOrder(p.getDisplayOrder());
        if (p.getPhotos() != null && !p.getPhotos().isEmpty()) {
            d.setImages(p.getPhotos().stream().map(ProjectPhoto::getUrl).collect(Collectors.toList()));
            p.getPhotos().stream()
                .filter(ph -> ph.getPhotoType() == ProjectPhoto.PhotoType.HERO)
                .findFirst()
                .ifPresentOrElse(
                    ph -> d.setHeroImageUrl(ph.getUrl()),
                    ()  -> d.setHeroImageUrl(p.getPhotos().get(0).getUrl()));
            d.setPhotoCount(p.getPhotos().size());
        }
        return d;
    }

    private ProjectDetailDto toDetail(Project p) {
        ProjectDetailDto d = new ProjectDetailDto();
        d.setId(p.getId()); d.setName(p.getName()); d.setSlug(p.getSlug());
        d.setTagline(p.getTagline()); d.setDescription(p.getDescription());
        d.setLocation(p.getLocation()); d.setCity(p.getCity()); d.setState(p.getState());
        d.setPincode(p.getPincode()); d.setStatus(p.getStatus().name());
        d.setPropertyType(p.getPropertyType().name());
        d.setTotalUnits(p.getTotalUnits()); d.setAvailableUnits(p.getAvailableUnits());
        d.setPriceMin(p.getPriceMin()  != null ? p.getPriceMin().toPlainString()  : null);
        d.setPriceMax(p.getPriceMax()  != null ? p.getPriceMax().toPlainString()  : null);
        d.setPriceUnit(p.getPriceUnit());
        d.setAreaMin(p.getAreaMin()    != null ? p.getAreaMin().toPlainString()   : null);
        d.setAreaMax(p.getAreaMax()    != null ? p.getAreaMax().toPlainString()   : null);
        d.setPossessionDate(p.getPossessionDate() != null ? p.getPossessionDate().toString() : null);
        d.setReraNumber(p.getReraNumber()); d.setDeveloperName(p.getDeveloperName());
        d.setWebsiteUrl(p.getWebsiteUrl());
        d.setMapLatitude(p.getMapLatitude()   != null ? p.getMapLatitude().toPlainString()  : null);
        d.setMapLongitude(p.getMapLongitude() != null ? p.getMapLongitude().toPlainString() : null);
        d.setFeatured(p.isFeatured()); d.setVisible(p.isVisible());
        d.setDisplayOrder(p.getDisplayOrder());
        d.setCreatedAt(p.getCreatedAt() != null ? p.getCreatedAt().toString() : null);
        d.setPhotos(p.getPhotos()         != null ? p.getPhotos().stream().map(this::toPhotoDto).collect(Collectors.toList())         : List.of());
        d.setAmenities(p.getAmenities()   != null ? p.getAmenities().stream().map(this::toAmenityDto).collect(Collectors.toList())   : List.of());
        d.setFacilities(p.getFacilities() != null ? p.getFacilities().stream().map(this::toFacilityDto).collect(Collectors.toList()) : List.of());
        d.setLocalInfos(p.getLocalInfos() != null ? p.getLocalInfos().stream().map(this::toLocalInfoDto).collect(Collectors.toList()): List.of());
        d.setSpecifications(p.getSpecifications() != null ? p.getSpecifications().stream().map(this::toSpecDto).collect(Collectors.toList()) : List.of());
        return d;
    }

    PhotoDto toPhotoDto(ProjectPhoto ph) {
        PhotoDto d = new PhotoDto();
        d.setId(ph.getId()); d.setUrl(ph.getUrl()); d.setCaption(ph.getCaption());
        d.setPhotoType(ph.getPhotoType().name()); d.setDisplayOrder(ph.getDisplayOrder());
        return d;
    }
    AmenityDto toAmenityDto(ProjectAmenity a) {
        AmenityDto d = new AmenityDto();
        d.setId(a.getId()); d.setName(a.getName()); d.setIcon(a.getIcon());
        d.setCategory(a.getCategory()); d.setDescription(a.getDescription());
        d.setDisplayOrder(a.getDisplayOrder()); return d;
    }
    FacilityDto toFacilityDto(ProjectFacility f) {
        FacilityDto d = new FacilityDto();
        d.setId(f.getId()); d.setName(f.getName()); d.setIcon(f.getIcon());
        d.setValue(f.getValue()); d.setDescription(f.getDescription());
        d.setDisplayOrder(f.getDisplayOrder()); return d;
    }
    LocalInfoDto toLocalInfoDto(ProjectLocalInfo li) {
        LocalInfoDto d = new LocalInfoDto();
        d.setId(li.getId()); d.setCategory(li.getCategory().name());
        d.setName(li.getName()); d.setDistance(li.getDistance());
        d.setDescription(li.getDescription()); d.setDisplayOrder(li.getDisplayOrder()); return d;
    }
    SpecificationDto toSpecDto(ProjectSpecification s) {
        SpecificationDto d = new SpecificationDto();
        d.setId(s.getId()); d.setUnitType(s.getUnitType());
        d.setCarpetArea(s.getCarpetArea()   != null ? s.getCarpetArea().toPlainString()   : null);
        d.setBuiltUpArea(s.getBuiltUpArea() != null ? s.getBuiltUpArea().toPlainString()  : null);
        d.setSuperArea(s.getSuperArea()     != null ? s.getSuperArea().toPlainString()    : null);
        d.setFloorCount(s.getFloorCount()); d.setBathrooms(s.getBathrooms());
        d.setBalconies(s.getBalconies()); d.setParking(s.getParking());
        d.setPrice(s.getPrice() != null ? s.getPrice().toPlainString() : null);
        d.setDescription(s.getDescription()); d.setDisplayOrder(s.getDisplayOrder()); return d;
    }
}

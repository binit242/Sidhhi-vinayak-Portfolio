package com.kolkata.realestate.service;

import com.kolkata.realestate.dto.SiteStatDto;
import com.kolkata.realestate.entity.SiteStat;
import com.kolkata.realestate.repository.SiteStatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SiteStatService {

    private final SiteStatRepository repo;

    @Transactional(readOnly = true)
    public List<SiteStatDto> getVisible() {
        return repo.findByVisibleTrueOrderByDisplayOrderAsc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SiteStatDto> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public SiteStatDto create(SiteStatDto req) {
        SiteStat s = SiteStat.builder()
                .statKey(req.getStatKey()).statLabel(req.getStatLabel())
                .statValue(req.getStatValue()).displayOrder(req.getDisplayOrder())
                .visible(req.isVisible()).build();
        return toDto(repo.save(s));
    }

    public SiteStatDto update(Long id, SiteStatDto req) {
        SiteStat s = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Stat not found"));
        s.setStatLabel(req.getStatLabel());
        s.setStatValue(req.getStatValue());
        s.setDisplayOrder(req.getDisplayOrder());
        s.setVisible(req.isVisible());
        return toDto(repo.save(s));
    }

    public void delete(Long id) { repo.deleteById(id); }

    private SiteStatDto toDto(SiteStat s) {
        SiteStatDto d = new SiteStatDto();
        d.setId(s.getId()); d.setStatKey(s.getStatKey());
        d.setStatLabel(s.getStatLabel()); d.setStatValue(s.getStatValue());
        d.setDisplayOrder(s.getDisplayOrder()); d.setVisible(s.isVisible());
        return d;
    }
}

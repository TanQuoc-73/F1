package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.Season;
import congngheweb.f1.formula1.repository.SeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeasonService {

    @Autowired
    private SeasonRepository seasonRepository;

    public List<Season> getAllSeasons() {
        return seasonRepository.findAll();
    }

    public Optional<Season> getById(Long id) {
        return seasonRepository.findById(id);
    }

    public Season create(Season season) {
        return seasonRepository.save(season);
    }

    public void delete(Long id) {
        seasonRepository.deleteById(id);
    }

    public Season getCurrentSeason() {
        return seasonRepository.findTopByOrderByYearDesc()
                .orElseThrow(() -> new RuntimeException("No season found"));
    }

    public List<Integer> getAllSeasonYears() {
        return seasonRepository.findAll().stream()
                .map(Season::getYear)
                .sorted((a, b) -> b.compareTo(a)) // Descending order
                .toList();
    }
}
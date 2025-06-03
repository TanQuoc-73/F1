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

    public Optional<Season> getSeasonById(Long id) {
        return seasonRepository.findById(id);
    }

    public Season createSeason(Season season) {
        if (seasonRepository.existsByYear(season.getYear())) {
            throw new IllegalArgumentException("Season with year already exists");
        }
        return seasonRepository.save(season);
    }

    public void deleteSeason(Long id) {
        seasonRepository.deleteById(id);
    }
}

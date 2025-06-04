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

    // Lấy tất cả seasons
    public List<Season> getAllSeasons() {
        return seasonRepository.findAll();
    }

    // Lấy season theo ID
    public Optional<Season> getById(Long id) {
        return seasonRepository.findById(id);
    }

    // Thêm mới season
    public Season createSeason(Season season) {
        return seasonRepository.save(season);
    }

    // Xoá season
    public void deleteSeason(Long id) {
        seasonRepository.deleteById(id);
    }

    // Có thể thêm cập nhật nếu cần
    public Season updateSeason(Long id, Season seasonData) {
        Optional<Season> optionalSeason = seasonRepository.findById(id);
        if (optionalSeason.isPresent()) {
            Season existing = optionalSeason.get();
            existing.setYear(seasonData.getYear());
            existing.setChampionDriver(seasonData.getChampionDriver());
            existing.setChampionTeam(seasonData.getChampionTeam());
            return seasonRepository.save(existing);
        } else {
            throw new RuntimeException("Season not found with ID: " + id);
        }
    }
}

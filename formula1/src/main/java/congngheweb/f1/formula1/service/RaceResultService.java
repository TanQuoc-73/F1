package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.RaceResult;
import congngheweb.f1.formula1.repository.RaceResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class RaceResultService {

    @Autowired
    private RaceResultRepository raceResultRepository;

    @Autowired
    private PointsCalculationService pointsCalculationService;

    @Autowired
    private StandingsUpdateService standingsUpdateService;

    public List<RaceResult> getAllRaceResults() {
        return raceResultRepository.findAll();
    }

    public Optional<RaceResult> getRaceResultById(@NonNull Long id) {
        return raceResultRepository.findById(id);
    }

    /**
     * Tạo race result mới với tính điểm tự động
     * 
     * @param raceResult Race result cần tạo (position và fastestLap phải được set)
     * @return Race result đã được lưu với điểm số
     */
    @Transactional
    public RaceResult createRaceResult(@NonNull RaceResult raceResult) {
        // Validate position
        if (!pointsCalculationService.isValidPosition(raceResult.getPosition())) {
            throw new IllegalArgumentException("Invalid position: " + raceResult.getPosition());
        }

        // Tính điểm tự động
        BigDecimal points = pointsCalculationService.calculateTotalPoints(
                raceResult.getPosition(),
                raceResult.isFastestLap());
        raceResult.setPoints(points);

        // Lưu race result
        RaceResult savedResult = raceResultRepository.save(raceResult);

        // Cập nhật standings
        standingsUpdateService.updateStandingsAfterRaceResult(savedResult);

        return savedResult;
    }

    /**
     * Update race result với tính điểm tự động
     * 
     * @param id            ID của race result cần update
     * @param updatedResult Thông tin mới
     * @return Race result đã được update
     */
    @Transactional
    public RaceResult updateRaceResult(@NonNull Long id, @NonNull RaceResult updatedResult) {
        return raceResultRepository.findById(id).map(existing -> {
            // Validate position
            if (!pointsCalculationService.isValidPosition(updatedResult.getPosition())) {
                throw new IllegalArgumentException("Invalid position: " + updatedResult.getPosition());
            }

            // Update thông tin
            existing.setRace(updatedResult.getRace());
            existing.setDriver(updatedResult.getDriver());
            existing.setTeam(updatedResult.getTeam());
            existing.setPosition(updatedResult.getPosition());
            existing.setTime(updatedResult.getTime());
            existing.setFastestLap(updatedResult.isFastestLap());

            // Tính lại điểm
            BigDecimal points = pointsCalculationService.calculateTotalPoints(
                    existing.getPosition(),
                    existing.isFastestLap());
            existing.setPoints(points);

            // Lưu
            RaceResult saved = raceResultRepository.save(existing);

            // Recalculate standings cho season này
            standingsUpdateService.recalculateSeasonStandings(saved.getRace().getSeason());

            return saved;
        }).orElseThrow(() -> new RuntimeException("RaceResult not found with id: " + id));
    }

    /**
     * Xóa race result và recalculate standings
     */
    @Transactional
    public void deleteRaceResult(@NonNull Long id) {
        RaceResult raceResult = raceResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RaceResult not found with id: " + id));

        var season = raceResult.getRace().getSeason();

        raceResultRepository.deleteById(id);

        // Recalculate standings sau khi xóa
        standingsUpdateService.recalculateSeasonStandings(season);
    }
}

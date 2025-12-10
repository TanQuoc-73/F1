package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.DriverStanding;
import congngheweb.f1.formula1.model.RaceResult;
import congngheweb.f1.formula1.model.Season;
import congngheweb.f1.formula1.model.TeamStanding;
import congngheweb.f1.formula1.repository.DriverStandingRepository;
import congngheweb.f1.formula1.repository.RaceResultRepository;
import congngheweb.f1.formula1.repository.TeamStandingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * Service để cập nhật bảng xếp hạng tự động
 */
@Service
public class StandingsUpdateService {

    @Autowired
    private DriverStandingRepository driverStandingRepository;

    @Autowired
    private TeamStandingRepository teamStandingRepository;

    @Autowired
    private RaceResultRepository raceResultRepository;

    /**
     * Cập nhật standings sau khi có race result mới
     * 
     * @param raceResult Kết quả đua mới
     */
    @Transactional
    public void updateStandingsAfterRaceResult(RaceResult raceResult) {
        Season season = raceResult.getRace().getSeason();

        // Cập nhật driver standing
        updateDriverStanding(raceResult, season);

        // Cập nhật team standing
        updateTeamStanding(raceResult, season);
    }

    /**
     * Cập nhật driver standing
     */
    private void updateDriverStanding(RaceResult raceResult, Season season) {
        // Tìm hoặc tạo driver standing
        DriverStanding standing = driverStandingRepository
                .findBySeasonAndDriver(season, raceResult.getDriver())
                .orElse(new DriverStanding());

        if (standing.getId() == null) {
            standing.setSeason(season);
            standing.setDriver(raceResult.getDriver());
            standing.setPoints(BigDecimal.ZERO);
        }

        // Tính tổng điểm từ tất cả races
        BigDecimal totalPoints = calculateDriverTotalPoints(season, raceResult.getDriver());
        standing.setPoints(totalPoints);

        driverStandingRepository.save(standing);

        // Cập nhật positions cho tất cả drivers trong season
        updateDriverPositions(season);
    }

    /**
     * Cập nhật team standing
     */
    private void updateTeamStanding(RaceResult raceResult, Season season) {
        // Tìm hoặc tạo team standing
        TeamStanding standing = teamStandingRepository
                .findBySeasonAndTeam(season, raceResult.getTeam())
                .orElse(new TeamStanding());

        if (standing.getId() == null) {
            standing.setSeason(season);
            standing.setTeam(raceResult.getTeam());
            standing.setPoints(BigDecimal.ZERO);
        }

        // Tính tổng điểm từ tất cả races
        BigDecimal totalPoints = calculateTeamTotalPoints(season, raceResult.getTeam());
        standing.setPoints(totalPoints);

        teamStandingRepository.save(standing);

        // Cập nhật positions cho tất cả teams trong season
        updateTeamPositions(season);
    }

    /**
     * Tính tổng điểm của driver trong season
     */
    private BigDecimal calculateDriverTotalPoints(Season season, congngheweb.f1.formula1.model.Driver driver) {
        List<RaceResult> results = raceResultRepository.findByRaceSeasonAndDriver(season, driver);
        return results.stream()
                .map(RaceResult::getPoints)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Tính tổng điểm của team trong season
     */
    private BigDecimal calculateTeamTotalPoints(Season season, congngheweb.f1.formula1.model.Team team) {
        List<RaceResult> results = raceResultRepository.findByRaceSeasonAndTeam(season, team);
        return results.stream()
                .map(RaceResult::getPoints)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Cập nhật positions cho tất cả drivers dựa trên điểm
     */
    private void updateDriverPositions(Season season) {
        List<DriverStanding> standings = driverStandingRepository.findBySeason(season);

        // Sắp xếp theo điểm giảm dần
        standings.sort((a, b) -> b.getPoints().compareTo(a.getPoints()));

        // Cập nhật position
        for (int i = 0; i < standings.size(); i++) {
            standings.get(i).setPosition(i + 1);
        }

        driverStandingRepository.saveAll(standings);
    }

    /**
     * Cập nhật positions cho tất cả teams dựa trên điểm
     */
    private void updateTeamPositions(Season season) {
        List<TeamStanding> standings = teamStandingRepository.findBySeason(season);

        // Sắp xếp theo điểm giảm dần
        standings.sort((a, b) -> b.getPoints().compareTo(a.getPoints()));

        // Cập nhật position
        for (int i = 0; i < standings.size(); i++) {
            standings.get(i).setPosition(i + 1);
        }

        teamStandingRepository.saveAll(standings);
    }

    /**
     * Tính lại toàn bộ standings cho một season
     * Sử dụng khi cần recalculate hoặc fix data
     */
    @Transactional
    public void recalculateSeasonStandings(Season season) {
        List<RaceResult> allResults = raceResultRepository.findByRaceSeason(season);

        // Xóa standings cũ
        driverStandingRepository.deleteBySeason(season);
        teamStandingRepository.deleteBySeason(season);

        // Tạo lại standings từ race results
        for (RaceResult result : allResults) {
            updateStandingsAfterRaceResult(result);
        }
    }
}

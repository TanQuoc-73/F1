package congngheweb.f1.formula1.repository;

import congngheweb.f1.formula1.model.Season;
import congngheweb.f1.formula1.model.Team;
import congngheweb.f1.formula1.model.TeamStanding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamStandingRepository extends JpaRepository<TeamStanding, Long> {

    /**
     * Tìm team standing theo season và team
     */
    Optional<TeamStanding> findBySeasonAndTeam(Season season, Team team);

    /**
     * Tìm tất cả team standings trong một season
     */
    List<TeamStanding> findBySeason(Season season);

    /**
     * Xóa tất cả team standings trong một season
     */
    void deleteBySeason(Season season);
}

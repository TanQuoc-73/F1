package congngheweb.f1.formula1.repository;

import congngheweb.f1.formula1.model.Driver;
import congngheweb.f1.formula1.model.DriverStanding;
import congngheweb.f1.formula1.model.Season;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DriverStandingRepository extends JpaRepository<DriverStanding, Long> {

    /**
     * Tìm driver standing theo season và driver
     */
    Optional<DriverStanding> findBySeasonAndDriver(Season season, Driver driver);

    /**
     * Tìm tất cả driver standings trong một season
     */
    List<DriverStanding> findBySeason(Season season);

    /**
     * Xóa tất cả driver standings trong một season
     */
    void deleteBySeason(Season season);
}

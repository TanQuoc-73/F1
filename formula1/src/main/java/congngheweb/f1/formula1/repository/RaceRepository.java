package congngheweb.f1.formula1.repository;

import congngheweb.f1.formula1.model.Race;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RaceRepository extends JpaRepository<Race, Long> {
    @Query("SELECT r FROM Race r WHERE r.raceDate >= :currentDate ORDER BY r.raceDate ASC")
    List<Race> findUpcomingRaces(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT r FROM Race r WHERE r.raceDate >= :currentDate ORDER BY r.raceDate ASC LIMIT :limit")
    List<Race> findUpcomingRacesWithLimit(@Param("currentDate") LocalDate currentDate, @Param("limit") int limit);
}

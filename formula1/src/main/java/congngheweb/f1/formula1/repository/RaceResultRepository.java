package congngheweb.f1.formula1.repository;

import congngheweb.f1.formula1.model.Driver;
import congngheweb.f1.formula1.model.RaceResult;
import congngheweb.f1.formula1.model.Season;
import congngheweb.f1.formula1.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RaceResultRepository extends JpaRepository<RaceResult, Long> {

    /**
     * Tìm tất cả race results của một driver trong một season
     */
    @Query("SELECT rr FROM RaceResult rr WHERE rr.race.season = :season AND rr.driver = :driver")
    List<RaceResult> findByRaceSeasonAndDriver(@Param("season") Season season, @Param("driver") Driver driver);

    /**
     * Tìm tất cả race results của một team trong một season
     */
    @Query("SELECT rr FROM RaceResult rr WHERE rr.race.season = :season AND rr.team = :team")
    List<RaceResult> findByRaceSeasonAndTeam(@Param("season") Season season, @Param("team") Team team);

    /**
     * Tìm tất cả race results trong một season
     */
    @Query("SELECT rr FROM RaceResult rr WHERE rr.race.season = :season")
    List<RaceResult> findByRaceSeason(@Param("season") Season season);
}

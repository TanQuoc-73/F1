package congngheweb.f1.formula1.repository;

import congngheweb.f1.formula1.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {

    @Query("SELECT d FROM Driver d WHERE (:teamName IS NULL OR d.team.name = :teamName) AND (:nationality IS NULL OR d.nationality = :nationality)")
    List<Driver> findByTeamNameAndNationality(@Param("teamName") String teamName, @Param("nationality") String nationality);
    
    @Query("SELECT DISTINCT d.team.name FROM Driver d")
    List<String> findDistinctTeamNames();
    
    @Query("SELECT DISTINCT d.nationality FROM Driver d")
    List<String> findDistinctNationalities();
}


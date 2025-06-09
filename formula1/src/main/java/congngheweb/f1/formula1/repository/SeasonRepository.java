package congngheweb.f1.formula1.repository;

import congngheweb.f1.formula1.model.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Long> {
    boolean existsByYear(int year);
    Optional<Season> findTopByOrderByYearDesc();
}

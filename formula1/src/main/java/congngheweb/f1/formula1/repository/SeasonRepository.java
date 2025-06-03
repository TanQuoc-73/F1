package congngheweb.f1.formula1.repository;

import congngheweb.f1.formula1.model.Season;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeasonRepository extends JpaRepository<Season, Long> {
    boolean existsByYear(int year);
}

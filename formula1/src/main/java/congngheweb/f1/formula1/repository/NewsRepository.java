package congngheweb.f1.formula1.repository;

import congngheweb.f1.formula1.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}

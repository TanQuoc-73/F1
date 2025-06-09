package congngheweb.f1.formula1.repository;

import congngheweb.f1.formula1.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    @Query("SELECT n FROM News n ORDER BY n.publishedAt DESC LIMIT :limit")
    List<News> findTopByOrderByPublishedAtDesc(@Param("limit") int limit);
}

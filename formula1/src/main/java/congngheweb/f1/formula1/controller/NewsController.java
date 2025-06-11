package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.News;
import congngheweb.f1.formula1.model.User;
import congngheweb.f1.formula1.service.NewsService;
import congngheweb.f1.formula1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/news")
@CrossOrigin(origins = "*")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/latest")
    public List<News> getLatestNews(@RequestParam(defaultValue = "3") int limit) {
        return newsService.getLatestNews(limit);
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Long id) {
        return newsService.getNewsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createNews(@RequestBody Map<String, Object> payload) {
        try {
            String title = (String) payload.get("title");
            String content = (String) payload.get("content");
            String imageUrl = (String) payload.get("imageUrl");
            Integer authorId = (Integer) payload.get("authorId");

            if (title == null || content == null || authorId == null) {
                return ResponseEntity.badRequest().body("Title, content and authorId are required");
            }

            Optional<User> authorOpt = userService.getUserById(authorId.longValue());
            if (authorOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Author not found");
            }

            News news = new News(title, content, imageUrl, authorOpt.get());
            return ResponseEntity.ok(newsService.createNews(news));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating news: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNews(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        try {
            Optional<News> existingNewsOpt = newsService.getNewsById(id);
            if (existingNewsOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            News existingNews = existingNewsOpt.get();
            String title = (String) payload.get("title");
            String content = (String) payload.get("content");
            String imageUrl = (String) payload.get("imageUrl");

            if (title == null || content == null) {
                return ResponseEntity.badRequest().body("Title and content are required");
            }

            existingNews.setTitle(title);
            existingNews.setContent(content);
            if (imageUrl != null) {
                existingNews.setImageUrl(imageUrl);
            }

            return ResponseEntity.ok(newsService.createNews(existingNews));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating news: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        try {
            newsService.deleteNews(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting news: " + e.getMessage());
        }
    }
}

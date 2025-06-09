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
        String title = (String) payload.get("title");
        String content = (String) payload.get("content");
        String imageUrl = (String) payload.get("imageUrl");
        Integer authorId = (Integer) payload.get("authorId");

        Optional<User> authorOpt = userService.getUserById(Long.valueOf(authorId));
        if (authorOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Author not found");
        }

        News news = new News(title, content, imageUrl, authorOpt.get());
        return ResponseEntity.ok(newsService.createNews(news));
    }

    @DeleteMapping("/{id}")
    public void deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
    }
}

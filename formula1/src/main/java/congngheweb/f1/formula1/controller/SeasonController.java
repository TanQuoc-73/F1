package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.Season;
import congngheweb.f1.formula1.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seasons")
@CrossOrigin(origins = "*")
public class SeasonController {

    @Autowired
    private SeasonService seasonService;

    @GetMapping
    public List<Season> getAll() {
        return seasonService.getAllSeasons();
    }

    @GetMapping("/current")
    public ResponseEntity<Season> getCurrentSeason() {
        try {
            return ResponseEntity.ok(seasonService.getCurrentSeason());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Season> getById(@PathVariable Long id) {
        return seasonService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Season create(@RequestBody Season season) {
        return seasonService.create(season);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        seasonService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

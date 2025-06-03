package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.Season;
import congngheweb.f1.formula1.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/seasons")
@CrossOrigin(origins = "*")
public class SeasonController {

    @Autowired
    private SeasonService seasonService;

    @GetMapping
    public List<Season> getAllSeasons() {
        return seasonService.getAllSeasons();
    }

    @GetMapping("/{id}")
    public Optional<Season> getSeasonById(@PathVariable Long id) {
        return seasonService.getSeasonById(id);
    }

    @PostMapping
    public Season createSeason(@RequestBody Season season) {
        return seasonService.createSeason(season);
    }

    @DeleteMapping("/{id}")
    public void deleteSeason(@PathVariable Long id) {
        seasonService.deleteSeason(id);
    }
}

package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.Race;
import congngheweb.f1.formula1.service.RaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/races")
@CrossOrigin(origins = "*")
public class RaceController {

    @Autowired
    private RaceService raceService;

    @GetMapping
    public List<Race> getAllRaces() {
        return raceService.getAllRaces();
    }

    @GetMapping("/{id}")
    public Optional<Race> getRaceById(@PathVariable Long id) {
        return raceService.getRaceById(id);
    }

    @PostMapping
    public Race createRace(@RequestBody Race race) {
        return raceService.createRace(race);
    }

    @DeleteMapping("/{id}")
    public void deleteRace(@PathVariable Long id) {
        raceService.deleteRace(id);
    }
}

package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.Race;
import congngheweb.f1.formula1.service.RaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/upcoming")
    public List<Race> getUpcomingRaces(@RequestParam(required = false) Integer limit) {
        if (limit != null) {
            return raceService.getUpcomingRacesWithLimit(limit);
        }
        return raceService.getUpcomingRaces();
    }

    @GetMapping("/{id}")
    public Optional<Race> getRaceById(@PathVariable Long id) {
        return raceService.getRaceById(id);
    }

    @PostMapping
    public Race createRace(@RequestBody Race race) {
        return raceService.createRace(race);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Race> updateRace(@PathVariable Long id, @RequestBody Race race) {
        try {
            Race updatedRace = raceService.updateRace(id, race);
            return ResponseEntity.ok(updatedRace);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteRace(@PathVariable Long id) {
        raceService.deleteRace(id);
    }
}

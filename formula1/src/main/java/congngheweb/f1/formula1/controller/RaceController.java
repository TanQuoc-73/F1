package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.Race;
import congngheweb.f1.formula1.service.RaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/races")
@CrossOrigin(origins = "*")
public class RaceController {

    @Autowired
    private RaceService raceService;

    @Autowired
    private congngheweb.f1.formula1.dto.DTOMapper dtoMapper;

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

    @GetMapping("/summary")
    public ResponseEntity<List<congngheweb.f1.formula1.dto.RaceDTO>> getRacesSummary() {
        List<Race> races = raceService.getAllRaces();
        return ResponseEntity.ok(dtoMapper.toRaceDTOList(races));
    }

    @GetMapping("/{id}")
    public Optional<Race> getRaceById(@PathVariable @NonNull Long id) {
        return raceService.getRaceById(id);
    }

    @PostMapping
    public Race createRace(@RequestBody @NonNull Race race) {
        return raceService.createRace(race);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Race> updateRace(@PathVariable @NonNull Long id, @RequestBody @NonNull Race race) {
        try {
            Race updatedRace = raceService.updateRace(id, race);
            return ResponseEntity.ok(updatedRace);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteRace(@PathVariable @NonNull Long id) {
        raceService.deleteRace(id);
    }
}

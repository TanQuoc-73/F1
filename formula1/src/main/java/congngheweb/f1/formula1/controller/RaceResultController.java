package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.RaceResult;
import congngheweb.f1.formula1.service.RaceResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/race-results")
@CrossOrigin(origins = "*")
public class RaceResultController {

    @Autowired
    private RaceResultService raceResultService;

    @GetMapping
    public List<RaceResult> getAllRaceResults() {
        return raceResultService.getAllRaceResults();
    }

    @GetMapping("/{id}")
    public Optional<RaceResult> getRaceResultById(@PathVariable @NonNull Long id) {
        return raceResultService.getRaceResultById(id);
    }

    @PostMapping
    public RaceResult createRaceResult(@RequestBody @NonNull RaceResult raceResult) {
        return raceResultService.createRaceResult(raceResult);
    }

    @DeleteMapping("/{id}")
    public void deleteRaceResult(@PathVariable @NonNull Long id) {
        raceResultService.deleteRaceResult(id);
    }
}

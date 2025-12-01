package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.TeamStanding;
import congngheweb.f1.formula1.service.TeamStandingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/team-standings")
@CrossOrigin(origins = "*")
public class TeamStandingController {

    @Autowired
    private TeamStandingService teamStandingService;

    @GetMapping
    public List<TeamStanding> getAll() {
        return teamStandingService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamStanding> getById(@PathVariable @NonNull Long id) {
        return teamStandingService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TeamStanding create(@RequestBody @NonNull TeamStanding teamStanding) {
        return teamStandingService.create(teamStanding);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable @NonNull Long id) {
        teamStandingService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamStanding> update(@PathVariable @NonNull Long id,
            @RequestBody @NonNull TeamStanding teamStanding) {
        try {
            return ResponseEntity.ok(teamStandingService.update(id, teamStanding));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}

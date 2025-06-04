package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.TeamStanding;
import congngheweb.f1.formula1.service.TeamStandingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<TeamStanding> getById(@PathVariable Long id) {
        return teamStandingService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TeamStanding create(@RequestBody TeamStanding teamStanding) {
        return teamStandingService.create(teamStanding);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        teamStandingService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

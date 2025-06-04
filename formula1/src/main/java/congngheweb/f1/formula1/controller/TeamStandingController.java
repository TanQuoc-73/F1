package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.Season;
import congngheweb.f1.formula1.model.Team;
import congngheweb.f1.formula1.model.TeamStanding;
import congngheweb.f1.formula1.service.SeasonService;
import congngheweb.f1.formula1.service.TeamService;
import congngheweb.f1.formula1.service.TeamStandingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/team-standings")
@CrossOrigin(origins = "*")
public class TeamStandingController {

    @Autowired
    private TeamStandingService service;

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private TeamService teamService;

    @GetMapping
    public List<TeamStanding> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamStanding> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> payload) {
        Long seasonId = Long.valueOf(payload.get("seasonId").toString());
        Long teamId = Long.valueOf(payload.get("teamId").toString());
        Double points = Double.valueOf(payload.get("points").toString());
        int position = (int) payload.get("position");

        Optional<Season> seasonOpt = seasonService.getById(seasonId);
        Optional<Team> teamOpt = teamService.getTeamById(teamId);

        if (seasonOpt.isEmpty() || teamOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid season or team ID");
        }

        TeamStanding standing = new TeamStanding(seasonOpt.get(), teamOpt.get(), points, position);
        return ResponseEntity.ok(service.create(standing));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

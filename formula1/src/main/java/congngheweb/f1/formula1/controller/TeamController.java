package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.Team;
import congngheweb.f1.formula1.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teams")
@CrossOrigin(origins = "*") 
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/{id}")
    public Optional<Team> getTeamById(@PathVariable Long id) {
        return teamService.getTeamById(id);
    }

    @PostMapping
    public Team createTeam(@RequestBody Team team) {
        return teamService.createTeam(team);
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
    }
    @PutMapping("/{id}")
    public Team updateTeam(@PathVariable Long id, @RequestBody Team updatedTeam) {
        return teamService.getTeamById(id)
            .map(team -> {
                team.setName(updatedTeam.getName());
                team.setBaseCountry(updatedTeam.getBaseCountry());
                team.setLogoUrl(updatedTeam.getLogoUrl());
                team.setPrincipal(updatedTeam.getPrincipal());
                team.setPowerUnit(updatedTeam.getPowerUnit());
                return teamService.createTeam(team); // dùng save()
            })
            .orElseThrow(() -> new RuntimeException("Team not found with id: " + id));
    }

}

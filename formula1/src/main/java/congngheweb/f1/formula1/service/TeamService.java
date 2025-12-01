package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.Team;
import congngheweb.f1.formula1.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Optional<Team> getTeamById(@NonNull Long id) {
        return teamRepository.findById(id);
    }

    public Team createTeam(@NonNull Team team) {
        return teamRepository.save(team);
    }

    public void deleteTeam(@NonNull Long id) {
        teamRepository.deleteById(id);
    }
}

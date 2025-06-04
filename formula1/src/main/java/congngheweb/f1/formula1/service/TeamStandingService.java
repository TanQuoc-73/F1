package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.TeamStanding;
import congngheweb.f1.formula1.repository.TeamStandingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamStandingService {

    @Autowired
    private TeamStandingRepository teamStandingRepository;

    public List<TeamStanding> getAll() {
        return teamStandingRepository.findAll();
    }

    public Optional<TeamStanding> getById(Long id) {
        return teamStandingRepository.findById(id);
    }

    public TeamStanding create(TeamStanding teamStanding) {
        return teamStandingRepository.save(teamStanding);
    }

    public void delete(Long id) {
        teamStandingRepository.deleteById(id);
    }
}
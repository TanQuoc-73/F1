package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.TeamStanding;
import congngheweb.f1.formula1.repository.TeamStandingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
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

    public Optional<TeamStanding> getById(@NonNull Long id) {
        return teamStandingRepository.findById(id);
    }

    public TeamStanding create(@NonNull TeamStanding teamStanding) {
        return teamStandingRepository.save(teamStanding);
    }

    public void delete(@NonNull Long id) {
        teamStandingRepository.deleteById(id);
    }

    public TeamStanding update(@NonNull Long id, @NonNull TeamStanding updated) {
        return teamStandingRepository.findById(id).map(existing -> {
            existing.setSeason(updated.getSeason());
            existing.setTeam(updated.getTeam());
            existing.setPoints(updated.getPoints());
            existing.setPosition(updated.getPosition());
            return teamStandingRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("TeamStanding not found"));
    }

}
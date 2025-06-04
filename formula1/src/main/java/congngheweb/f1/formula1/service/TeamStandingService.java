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
    private TeamStandingRepository repository;

    public List<TeamStanding> getAll() {
        return repository.findAll();
    }

    public Optional<TeamStanding> getById(Long id) {
        return repository.findById(id);
    }

    public TeamStanding create(TeamStanding standing) {
        return repository.save(standing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

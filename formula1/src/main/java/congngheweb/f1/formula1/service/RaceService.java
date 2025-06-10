package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.Race;
import congngheweb.f1.formula1.repository.RaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RaceService {

    @Autowired
    private RaceRepository raceRepository;

    public List<Race> getAllRaces() {
        return raceRepository.findAll();
    }

    public Optional<Race> getRaceById(Long id) {
        return raceRepository.findById(id);
    }

    public Race createRace(Race race) {
        return raceRepository.save(race);
    }

    public void deleteRace(Long id) {
        raceRepository.deleteById(id);
    }

    public List<Race> getUpcomingRaces() {
        return raceRepository.findUpcomingRaces(LocalDate.now());
    }

    public List<Race> getUpcomingRacesWithLimit(int limit) {
        List<Race> races = raceRepository.findUpcomingRacesWithLimit(LocalDate.now(), limit);
        return races.stream().limit(limit).toList();
    }
}

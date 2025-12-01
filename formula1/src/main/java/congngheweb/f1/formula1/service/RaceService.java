package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.Race;
import congngheweb.f1.formula1.repository.RaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
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

    public Optional<Race> getRaceById(@NonNull Long id) {
        return raceRepository.findById(id);
    }

    public Race createRace(@NonNull Race race) {
        return raceRepository.save(race);
    }

    public Race updateRace(@NonNull Long id, @NonNull Race race) {
        Race existingRace = raceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Race not found"));

        existingRace.setRaceName(race.getRaceName());
        existingRace.setRaceDate(race.getRaceDate());
        existingRace.setRoundNumber(race.getRoundNumber());
        existingRace.setSeason(race.getSeason());
        existingRace.setCircuit(race.getCircuit());

        return raceRepository.save(existingRace);
    }

    public void deleteRace(@NonNull Long id) {
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

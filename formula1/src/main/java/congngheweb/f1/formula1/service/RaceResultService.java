package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.RaceResult;
import congngheweb.f1.formula1.repository.RaceResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RaceResultService {

    @Autowired
    private RaceResultRepository raceResultRepository;

    public List<RaceResult> getAllRaceResults() {
        return raceResultRepository.findAll();
    }

    public Optional<RaceResult> getRaceResultById(Long id) {
        return raceResultRepository.findById(id);
    }

    public RaceResult createRaceResult(RaceResult raceResult) {
        return raceResultRepository.save(raceResult);
    }

    public void deleteRaceResult(Long id) {
        raceResultRepository.deleteById(id);
    }
}

package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.DriverStanding;
import congngheweb.f1.formula1.repository.DriverStandingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverStandingService {

    @Autowired
    private DriverStandingRepository driverStandingRepository;

    public List<DriverStanding> getAllDriverStandings() {
        return driverStandingRepository.findAll();
    }

    public Optional<DriverStanding> getDriverStandingById(Long id) {
        return driverStandingRepository.findById(id);
    }

    public DriverStanding createDriverStanding(DriverStanding standing) {
        return driverStandingRepository.save(standing);
    }

    public void deleteDriverStanding(Long id) {
        driverStandingRepository.deleteById(id);
    }
}

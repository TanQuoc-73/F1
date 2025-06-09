package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.Driver;
import congngheweb.f1.formula1.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Optional<Driver> getDriverById(Long id) {
        return driverRepository.findById(id);
    }

    public Driver createDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }

    public List<Driver> filterDrivers(String team, String nationality) {
        if (team != null && team.trim().isEmpty()) {
            team = null;
        }
        if (nationality != null && nationality.trim().isEmpty()) {
            nationality = null;
        }
        return driverRepository.findByTeamNameAndNationality(team, nationality);
    }


    public List<String> getAllTeamNames() {
        return driverRepository.findAll()
                .stream()
                .map(d -> d.getTeam().getName())
                .distinct()
                .collect(Collectors.toList());
    }

    public List<String> getAllNationalities() {
        return driverRepository.findAll()
                .stream()
                .map(Driver::getNationality)
                .distinct()
                .collect(Collectors.toList());
    }
}

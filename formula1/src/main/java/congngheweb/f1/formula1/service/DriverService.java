package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.Driver;
import congngheweb.f1.formula1.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
// import java.util.stream.Collectors;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Optional<Driver> getDriverById(@NonNull Long id) {
        return driverRepository.findById(id);
    }

    public Driver createDriver(@NonNull Driver driver) {
        return driverRepository.save(driver);
    }

    public Driver updateDriver(@NonNull Long id, @NonNull Driver updatedDriver) {
        return driverRepository.findById(id)
                .map(driver -> {
                    driver.setFirstName(updatedDriver.getFirstName());
                    driver.setLastName(updatedDriver.getLastName());
                    driver.setNationality(updatedDriver.getNationality());
                    driver.setTeam(updatedDriver.getTeam());
                    driver.setNumber(updatedDriver.getNumber());
                    driver.setDateOfBirth(updatedDriver.getDateOfBirth());
                    driver.setImageUrl(updatedDriver.getImageUrl());
                    return driverRepository.save(driver);
                })
                .orElseThrow(() -> new RuntimeException("Driver not found with id: " + id));
    }

    public void deleteDriver(@NonNull Long id) {
        driverRepository.deleteById(id);
    }

    public List<Driver> filterDrivers(String team, String nationality) {
        return driverRepository.findByTeamNameAndNationality(team, nationality);
    }

    public List<String> getAllTeamNames() {
        return driverRepository.findDistinctTeamNames();
    }

    public List<String> getAllNationalities() {
        return driverRepository.findDistinctNationalities();
    }
}

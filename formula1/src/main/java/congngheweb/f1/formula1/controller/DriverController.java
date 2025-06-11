package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.Driver;
import congngheweb.f1.formula1.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/drivers")
@CrossOrigin(origins = "*")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping
    public List<Driver> getAllDrivers() {
        return driverService.getAllDrivers();
    }

    @GetMapping("/{id}")
    public Optional<Driver> getDriverById(@PathVariable Long id) {
        return driverService.getDriverById(id);
    }

    @PostMapping
    public Driver createDriver(@RequestBody Driver driver) {
        return driverService.createDriver(driver);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable Long id, @RequestBody Driver driver) {
        try {
            Driver updatedDriver = driverService.updateDriver(id, driver);
            return ResponseEntity.ok(updatedDriver);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteDriver(@PathVariable Long id) {
        driverService.deleteDriver(id);
    }

    @GetMapping("/filter")
    public List<Driver> getDrivers(
        @RequestParam(required = false) String team,
        @RequestParam(required = false) String nationality
    ) {
        return driverService.filterDrivers(team, nationality);
    }

    @GetMapping("/teams")
    public ResponseEntity<List<String>> getAllTeams() {
        return ResponseEntity.ok(driverService.getAllTeamNames());
    }

    @GetMapping("/nationalities")
    public ResponseEntity<List<String>> getAllNationalities() {
        return ResponseEntity.ok(driverService.getAllNationalities());
    }
}

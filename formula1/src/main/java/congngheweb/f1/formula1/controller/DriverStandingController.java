package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.DriverStanding;
import congngheweb.f1.formula1.service.DriverStandingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/driver-standings")
@CrossOrigin(origins = "*")
public class DriverStandingController {

    @Autowired
    private DriverStandingService driverStandingService;

    @GetMapping
    public List<DriverStanding> getAllDriverStandings() {
        return driverStandingService.getAllDriverStandings();
    }

    @GetMapping("/{id}")
    public Optional<DriverStanding> getDriverStandingById(@PathVariable @NonNull Long id) {
        return driverStandingService.getDriverStandingById(id);
    }

    @PostMapping
    public DriverStanding createDriverStanding(@RequestBody @NonNull DriverStanding standing) {
        return driverStandingService.createDriverStanding(standing);
    }

    @DeleteMapping("/{id}")
    public void deleteDriverStanding(@PathVariable @NonNull Long id) {
        driverStandingService.deleteDriverStanding(id);
    }
}

package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.dto.FilterOptionsDTO;
import congngheweb.f1.formula1.service.DriverService;
import congngheweb.f1.formula1.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/filters")
@CrossOrigin(origins = "*")
public class FilterController {

    @Autowired
    private DriverService driverService;

    @Autowired
    private SeasonService seasonService;

    @GetMapping("/options")
    public ResponseEntity<FilterOptionsDTO> getFilterOptions() {
        FilterOptionsDTO options = new FilterOptionsDTO();
        options.setTeams(driverService.getAllTeamNames());
        options.setNationalities(driverService.getAllNationalities());
        options.setSeasons(seasonService.getAllSeasonYears());
        return ResponseEntity.ok(options);
    }
}

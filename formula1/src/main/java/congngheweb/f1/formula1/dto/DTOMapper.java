package congngheweb.f1.formula1.dto;

import congngheweb.f1.formula1.model.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DTOMapper {

    public DriverDTO toDriverDTO(Driver driver) {
        DriverDTO dto = new DriverDTO();
        dto.setId(driver.getId());
        dto.setFirstName(driver.getFirstName());
        dto.setLastName(driver.getLastName());
        dto.setFullName(driver.getFirstName() + " " + driver.getLastName());
        dto.setNationality(driver.getNationality());
        dto.setDateOfBirth(driver.getDateOfBirth());
        dto.setNumber(driver.getNumber());
        dto.setImageUrl(driver.getImageUrl());

        if (driver.getTeam() != null) {
            dto.setTeam(toTeamSummaryDTO(driver.getTeam()));
        }

        return dto;
    }

    public List<DriverDTO> toDriverDTOList(List<Driver> drivers) {
        return drivers.stream()
                .map(this::toDriverDTO)
                .collect(Collectors.toList());
    }

    public TeamSummaryDTO toTeamSummaryDTO(Team team) {
        return new TeamSummaryDTO(
                team.getId(),
                team.getName(),
                team.getLogoUrl());
    }

    public TeamDTO toTeamDTO(Team team, int driverCount) {
        TeamDTO dto = new TeamDTO();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setBaseCountry(team.getBaseCountry());
        dto.setLogoUrl(team.getLogoUrl());
        dto.setPrincipal(team.getPrincipal());
        dto.setPowerUnit(team.getPowerUnit());
        dto.setDriverCount(driverCount);
        return dto;
    }

    public CircuitSummaryDTO toCircuitSummaryDTO(Circuit circuit) {
        return new CircuitSummaryDTO(
                circuit.getId(),
                circuit.getName(),
                circuit.getLocation(),
                circuit.getCountry(),
                circuit.getImageUrl());
    }

    public RaceDTO toRaceDTO(Race race) {
        RaceDTO dto = new RaceDTO();
        dto.setId(race.getId());
        dto.setRaceName(race.getRaceName());
        dto.setRaceDate(race.getRaceDate());
        dto.setRoundNumber(race.getRoundNumber());

        if (race.getCircuit() != null) {
            dto.setCircuit(toCircuitSummaryDTO(race.getCircuit()));
        }

        if (race.getSeason() != null) {
            dto.setSeasonYear(race.getSeason().getYear());
        }

        return dto;
    }

    public List<RaceDTO> toRaceDTOList(List<Race> races) {
        return races.stream()
                .map(this::toRaceDTO)
                .collect(Collectors.toList());
    }
}

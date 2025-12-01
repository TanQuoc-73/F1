package congngheweb.f1.formula1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RaceDTO {
    private Long id;
    private String raceName;
    private LocalDate raceDate;
    private Integer roundNumber;
    private CircuitSummaryDTO circuit;
    private Integer seasonYear;
}

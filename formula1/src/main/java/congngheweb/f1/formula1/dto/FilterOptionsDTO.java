package congngheweb.f1.formula1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterOptionsDTO {
    private List<String> teams;
    private List<String> nationalities;
    private List<Integer> seasons;
}

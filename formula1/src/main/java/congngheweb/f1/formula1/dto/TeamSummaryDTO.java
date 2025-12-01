package congngheweb.f1.formula1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamSummaryDTO {
    private Long id;
    private String name;
    private String logoUrl;
}

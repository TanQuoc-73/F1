package congngheweb.f1.formula1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CircuitSummaryDTO {
    private Long id;
    private String name;
    private String location;
    private String country;
    private String imageUrl;
}

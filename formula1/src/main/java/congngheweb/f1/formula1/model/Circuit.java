package congngheweb.f1.formula1.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "circuits")
public class Circuit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String name;

    @Column(length = 100)
    private String location;

    @Column(length = 100)
    private String country;

    @Column(name = "length_km", precision = 5, scale = 2)
    private BigDecimal lengthKm;

    private int laps;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    // Constructors
    public Circuit() {}

    public Circuit(String name, String location, String country, BigDecimal lengthKm, int laps, String imageUrl) {
        this.name = name;
        this.location = location;
        this.country = country;
        this.lengthKm = lengthKm;
        this.laps = laps;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public BigDecimal getLengthKm() {
        return lengthKm;
    }

    public void setLengthKm(BigDecimal lengthKm) {
        this.lengthKm = lengthKm;
    }

    public int getLaps() {
        return laps;
    }

    public void setLaps(int laps) {
        this.laps = laps;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}

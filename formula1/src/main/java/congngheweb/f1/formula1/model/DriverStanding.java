package congngheweb.f1.formula1.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "driver_standings")
public class DriverStanding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "season_id")
    private Season season;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @Column(precision = 5, scale = 1)
    private BigDecimal points;

    private int position;

    // Constructors
    public DriverStanding() {}

    public DriverStanding(Season season, Driver driver, BigDecimal points, int position) {
        this.season = season;
        this.driver = driver;
        this.points = points;
        this.position = position;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public BigDecimal getPoints() {
        return points;
    }

    public void setPoints(BigDecimal points) {
        this.points = points;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}

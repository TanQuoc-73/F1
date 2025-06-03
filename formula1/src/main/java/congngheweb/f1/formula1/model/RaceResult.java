package congngheweb.f1.formula1.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "race_results")
public class RaceResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "race_id")
    private Race race;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    private int position;

    @Column(precision = 4, scale = 1)
    private BigDecimal points;

    @Column(length = 50)
    private String time;

    @Column(name = "fastest_lap")
    private boolean fastestLap;

    // Constructors
    public RaceResult() {}

    public RaceResult(Race race, Driver driver, Team team, int position, BigDecimal points, String time, boolean fastestLap) {
        this.race = race;
        this.driver = driver;
        this.team = team;
        this.position = position;
        this.points = points;
        this.time = time;
        this.fastestLap = fastestLap;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Race getRace() {
        return race;
    }

    public void setRace(Race race) {
        this.race = race;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public BigDecimal getPoints() {
        return points;
    }

    public void setPoints(BigDecimal points) {
        this.points = points;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public boolean isFastestLap() {
        return fastestLap;
    }

    public void setFastestLap(boolean fastestLap) {
        this.fastestLap = fastestLap;
    }
}

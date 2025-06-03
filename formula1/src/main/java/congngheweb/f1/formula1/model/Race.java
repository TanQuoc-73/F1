package congngheweb.f1.formula1.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "races")
public class Race {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "season_id")
    private Season season;

    @ManyToOne
    @JoinColumn(name = "circuit_id")
    private Circuit circuit;

    @Column(name = "race_name", length = 100)
    private String raceName;

    @Column(name = "race_date")
    private LocalDate raceDate;

    @Column(name = "round_number")
    private int roundNumber;

    // Constructors
    public Race() {}

    public Race(Season season, Circuit circuit, String raceName, LocalDate raceDate, int roundNumber) {
        this.season = season;
        this.circuit = circuit;
        this.raceName = raceName;
        this.raceDate = raceDate;
        this.roundNumber = roundNumber;
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

    public Circuit getCircuit() {
        return circuit;
    }

    public void setCircuit(Circuit circuit) {
        this.circuit = circuit;
    }

    public String getRaceName() {
        return raceName;
    }

    public void setRaceName(String raceName) {
        this.raceName = raceName;
    }

    public LocalDate getRaceDate() {
        return raceDate;
    }

    public void setRaceDate(LocalDate raceDate) {
        this.raceDate = raceDate;
    }

    public int getRoundNumber() {
        return roundNumber;
    }

    public void setRoundNumber(int roundNumber) {
        this.roundNumber = roundNumber;
    }
}

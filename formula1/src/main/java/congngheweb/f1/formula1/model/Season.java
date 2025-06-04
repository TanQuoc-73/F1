package congngheweb.f1.formula1.model;

import jakarta.persistence.*;

@Entity
@Table(name = "seasons")
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int year;

    @ManyToOne
    @JoinColumn(name = "champion_driver_id")
    private Driver championDriver;

    @ManyToOne
    @JoinColumn(name = "champion_team_id")
    private Team championTeam;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public Driver getChampionDriver() {
        return championDriver;
    }

    public void setChampionDriver(Driver championDriver) {
        this.championDriver = championDriver;
    }

    public Team getChampionTeam() {
        return championTeam;
    }

    public void setChampionTeam(Team championTeam) {
        this.championTeam = championTeam;
    }
}
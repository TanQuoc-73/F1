package congngheweb.f1.formula1.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "team_standings")
public class TeamStanding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "season_id", nullable = false)
    private Season season;

    @ManyToOne(optional = false)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @Column(precision = 5, scale = 1, nullable = false)
    private BigDecimal points;

    @Column(nullable = false)
    private int position;

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Season getSeason() { return season; }
    public void setSeason(Season season) { this.season = season; }

    public Team getTeam() { return team; }
    public void setTeam(Team team) { this.team = team; }

    public BigDecimal getPoints() { return points; }
    public void setPoints(BigDecimal points) { this.points = points; }

    public int getPosition() { return position; }
    public void setPosition(int position) { this.position = position; }
}
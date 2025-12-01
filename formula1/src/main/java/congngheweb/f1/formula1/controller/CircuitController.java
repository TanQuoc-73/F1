package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.Circuit;
import congngheweb.f1.formula1.service.CircuitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/circuits")
@CrossOrigin(origins = "*")
public class CircuitController {

    @Autowired
    private CircuitService circuitService;

    @GetMapping
    public List<Circuit> getAllCircuits() {
        return circuitService.getAllCircuits();
    }

    @GetMapping("/{id}")
    public Optional<Circuit> getCircuitById(@PathVariable @NonNull Long id) {
        return circuitService.getCircuitById(id);
    }

    @PostMapping
    public Circuit createCircuit(@RequestBody @NonNull Circuit circuit) {
        return circuitService.createCircuit(circuit);
    }

    @PutMapping("/{id}")
    public Circuit updateCircuit(@PathVariable @NonNull Long id, @RequestBody @NonNull Circuit updatedCircuit) {
        return circuitService.getCircuitById(id)
                .map(circuit -> {
                    circuit.setName(updatedCircuit.getName());
                    circuit.setLocation(updatedCircuit.getLocation());
                    circuit.setCountry(updatedCircuit.getCountry());
                    circuit.setLengthKm(updatedCircuit.getLengthKm());
                    circuit.setLaps(updatedCircuit.getLaps());
                    circuit.setImageUrl(updatedCircuit.getImageUrl());
                    return circuitService.createCircuit(circuit);
                })
                .orElseThrow(() -> new RuntimeException("Circuit not found with id: " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteCircuit(@PathVariable @NonNull Long id) {
        circuitService.deleteCircuit(id);
    }
}

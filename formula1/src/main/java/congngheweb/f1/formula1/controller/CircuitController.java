package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.Circuit;
import congngheweb.f1.formula1.service.CircuitService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Optional<Circuit> getCircuitById(@PathVariable Long id) {
        return circuitService.getCircuitById(id);
    }

    @PostMapping
    public Circuit createCircuit(@RequestBody Circuit circuit) {
        return circuitService.createCircuit(circuit);
    }

    @DeleteMapping("/{id}")
    public void deleteCircuit(@PathVariable Long id) {
        circuitService.deleteCircuit(id);
    }
}

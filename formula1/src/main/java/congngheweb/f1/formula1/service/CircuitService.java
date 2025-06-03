package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.Circuit;
import congngheweb.f1.formula1.repository.CircuitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CircuitService {

    @Autowired
    private CircuitRepository circuitRepository;

    public List<Circuit> getAllCircuits() {
        return circuitRepository.findAll();
    }

    public Optional<Circuit> getCircuitById(Long id) {
        return circuitRepository.findById(id);
    }

    public Circuit createCircuit(Circuit circuit) {
        return circuitRepository.save(circuit);
    }

    public void deleteCircuit(Long id) {
        circuitRepository.deleteById(id);
    }
}

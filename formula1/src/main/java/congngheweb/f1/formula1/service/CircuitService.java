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

    public Circuit updateCircuit(Long id, Circuit circuitDetails) {
        Circuit circuit = circuitRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Circuit not found with id: " + id));
        
        circuit.setName(circuitDetails.getName());
        circuit.setLocation(circuitDetails.getLocation());
        circuit.setCountry(circuitDetails.getCountry());
        circuit.setLengthKm(circuitDetails.getLengthKm());
        circuit.setLaps(circuitDetails.getLaps());
        circuit.setImageUrl(circuitDetails.getImageUrl());
        
        return circuitRepository.save(circuit);
    }
}

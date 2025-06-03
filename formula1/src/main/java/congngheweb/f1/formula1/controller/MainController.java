package congngheweb.f1.formula1.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class MainController {
    @GetMapping("/")
    public String home() {
        return "Welcome to the Formula 1 API!";
    }

}

package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.User;
import congngheweb.f1.formula1.service.UserService;
import congngheweb.f1.formula1.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable @NonNull Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registerData) {
        String username = registerData.get("username");
        String password = registerData.get("password");
        String email = registerData.get("email");
        String role = registerData.get("role");

        if (username == null || password == null || email == null) {
            return ResponseEntity.badRequest().body("Username, password and email are required");
        }

        if (userService.getUserByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setPasswordHash(password); // Will be encoded in service
        user.setEmail(email);
        if (role != null) {
            user.setRole(User.Role.valueOf(role.toUpperCase()));
        }

        User newUser = userService.createUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginData.get("username"),
                            loginData.get("password")));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = userService.getUserByUsername(loginData.get("username")).get();
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", user.getUsername());
            response.put("role", user.getRole().name());
            response.put("id", user.getId());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            User user = userService.getUserByUsername(username).orElse(null);
            if (user != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("username", user.getUsername());
                response.put("email", user.getEmail());
                response.put("role", user.getRole().name());
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(401).body("Not authenticated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable @NonNull Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable @NonNull Long id, @RequestBody Map<String, String> updateData) {
        try {
            Optional<User> userOpt = userService.getUserById(id);
            if (userOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            User user = userOpt.get();
            String username = updateData.get("username");
            String email = updateData.get("email");
            String password = updateData.get("password");
            String role = updateData.get("role");

            if (username != null && !username.equals(user.getUsername())) {
                if (userService.getUserByUsername(username).isPresent()) {
                    return ResponseEntity.badRequest().body("Username already exists");
                }
                user.setUsername(username);
            }

            if (email != null && !email.equals(user.getEmail())) {
                if (userService.getUserByEmail(email).isPresent()) {
                    return ResponseEntity.badRequest().body("Email already exists");
                }
                user.setEmail(email);
            }

            if (password != null && !password.isEmpty()) {
                user.setPasswordHash(password); // Will be encoded in service
            }

            if (role != null) {
                user.setRole(User.Role.valueOf(role.toUpperCase()));
            }

            User updatedUser = userService.createUser(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating user: " + e.getMessage());
        }
    }
}

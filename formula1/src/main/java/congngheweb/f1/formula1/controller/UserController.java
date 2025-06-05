package congngheweb.f1.formula1.controller;

import congngheweb.f1.formula1.model.User;
import congngheweb.f1.formula1.service.UserService;
import congngheweb.f1.formula1.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Đăng ký
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userService.getUserByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }
        User newUser = userService.createUser(user);
        return ResponseEntity.ok(newUser);
    }

    // Đăng nhập
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData, HttpServletResponse response) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        if (userService.authenticateUser(username, password)) {
            User user = userService.getUserByUsername(username).get();
            String role = user.getRole().name();
            String token = jwtUtil.generateToken(username, role);

            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(24 * 60 * 60); // 1 day
            // cookie.setSecure(true); // Bật khi dùng HTTPS
            response.addCookie(cookie);

            // Trả về thông tin user (không trả token)
            return ResponseEntity.ok(Map.of("username", username, "role", role));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(HttpServletRequest request) {
        String token = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        if (token != null && jwtUtil.validateJwtToken(token)) {
            String username = jwtUtil.getUsernameFromToken(token);
            String role = jwtUtil.getRoleFromToken(token);
            return ResponseEntity.ok(Map.of("username", username, "role", role));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("Logged out");
    }
}

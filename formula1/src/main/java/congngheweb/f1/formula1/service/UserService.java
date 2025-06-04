package congngheweb.f1.formula1.service;

import congngheweb.f1.formula1.model.User;
import congngheweb.f1.formula1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User createUser(User user) {
        // Mã hóa mật khẩu trước khi lưu
        String hashed = BCrypt.hashpw(user.getPasswordHash(), BCrypt.gensalt());
        user.setPasswordHash(hashed);
        return userRepository.save(user);
    }

    public boolean authenticateUser(String username, String rawPassword) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            String hashed = optionalUser.get().getPasswordHash();
            return BCrypt.checkpw(rawPassword, hashed);
        }
        return false;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

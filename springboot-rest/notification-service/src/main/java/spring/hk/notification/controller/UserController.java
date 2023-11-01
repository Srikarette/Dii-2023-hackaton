package spring.hk.notification.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.jws.soap.SOAPBinding.Use;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import spring.hk.notification.dto.UserDTO;
import spring.hk.notification.mapper.ServerMapper;
import spring.hk.notification.model.User;
import spring.hk.notification.repository.UserRepository;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServerMapper serverMapper;

    // Post user
    @PostMapping("/users")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
        }
        // Set the creation date for the user
        user.setCreate_at(new Date());
        userRepository.save(user);
        return ResponseEntity.ok("User created");
    }

    // get user all
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUserAll() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // Get user by ID
    @GetMapping("/users/id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with the given ID not found");
        }
        return ResponseEntity.ok(user.get());
    }

    // Get user by email
    @GetMapping("/users/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        List<User> users = userRepository.findByEmail(email);
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with the given email not found");
        }
        return ResponseEntity.ok(users);
    }

    // delete user by id
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> userDelete(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("id not found");
        }
        userRepository.deleteById(id);

        return ResponseEntity.ok("deleted");
    }

    // update user some field
    @PatchMapping("/users/{id}")
    public ResponseEntity<?> updateUserSomeField(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        Optional<User> otpUser = userRepository.findById(id);
        if (!otpUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("id not found");
        }
        User users = otpUser.get();
        serverMapper.updateUserFromDto(userDTO, users);
        userRepository.save(users);

        return ResponseEntity.ok("updated");
    }
}

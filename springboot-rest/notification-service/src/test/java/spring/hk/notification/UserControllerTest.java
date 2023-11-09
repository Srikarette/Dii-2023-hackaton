package spring.hk.notification;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import spring.hk.notification.controller.UserController;
import spring.hk.notification.dto.UserDTO;
import spring.hk.notification.mapper.ServerMapper;
import spring.hk.notification.model.User;
import spring.hk.notification.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {
    @InjectMocks
    private UserController userController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ServerMapper serverMapper;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
    }

    @Test
    public void testCreateUser() {
        when(userRepository.existsByEmail(testUser.getEmail())).thenReturn(false);
        when(userRepository.save(testUser)).thenReturn(testUser);

        ResponseEntity<String> response = userController.createUser(testUser);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User created", response.getBody());
    }

    @Test
    public void testCreateUserWithExistingEmail() {
        when(userRepository.existsByEmail(testUser.getEmail())).thenReturn(true);

        ResponseEntity<String> response = userController.createUser(testUser);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Email is already in use", response.getBody());
    }

    @Test
    public void testGetUserAll() {
        List<User> userList = new ArrayList<>();
        userList.add(testUser);

        when(userRepository.findAll()).thenReturn(userList);

        ResponseEntity<List<User>> response = userController.getUserAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userList, response.getBody());
    }

    @Test
    public void testGetUserById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

    ResponseEntity<?> response = userController.getUserById(1L);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(testUser, response.getBody());
    }

    @Test
    public void testGetUserByIdNotFound() {
        when(userRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = userController.getUserById(2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User with the given ID not found", response.getBody());
    }

    @Test
    public void testGetUserByEmail() {
        List<User> userList = new ArrayList<>();
        userList.add(testUser);

        when(userRepository.findByEmail(testUser.getEmail())).thenReturn(userList);

        ResponseEntity<?> response = userController.getUserByEmail(testUser.getEmail());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userList, response.getBody());
    }

    @Test
    public void testGetUserByEmailNotFound() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(new ArrayList<>());

        ResponseEntity<?> response = userController.getUserByEmail("nonexistent@example.com");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User with the given email not found", response.getBody());
    }

    @Test
    public void testDeleteUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        ResponseEntity<String> response = userController.userDelete(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("deleted", response.getBody());
    }

    @Test
    public void testDeleteUserNotFound() {
        when(userRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<String> response = userController.userDelete(2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("id not found", response.getBody());
    }

    @Test
    public void testUpdateUserSomeField() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("NewEmail");

        ResponseEntity<?> response = userController.updateUserSomeField(1L, userDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("updated", response.getBody());
    }

    @Test
    public void testUpdateUserSomeFieldNotFound() {
        when(userRepository.findById(2L)).thenReturn(Optional.empty());
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("NewEmail");
        ResponseEntity<?> response = userController.updateUserSomeField(2L, userDTO);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("id not found", response.getBody());
    }
}

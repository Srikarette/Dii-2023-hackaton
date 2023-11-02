package spring.hk.notification;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import spring.hk.notification.controller.AdminController;
import spring.hk.notification.dto.AdminDTO;
import spring.hk.notification.mapper.ServerMapper;
import spring.hk.notification.model.Admin;
import spring.hk.notification.repository.AdminRepository;

@SpringBootTest
class AdminControllerTests {

	@InjectMocks
	private AdminController adminController;

	@Mock
	private AdminRepository adminRepository;

	@Mock
	private ServerMapper serverMapper;

	private Admin testAdmin;

	@BeforeEach
	void setUp() {
		testAdmin = new Admin();
		testAdmin.setId(1L);
		testAdmin.setUsername("testUser");
		testAdmin.setPassword("testPassword");
		testAdmin.setAgency("CMU");
		testAdmin.setEmail("Test@gmail.com");
	}

	@Test
	 public void testCreateAdmin() {
        when(adminRepository.existsByUsername("testUser")).thenReturn(false);
        when(adminRepository.save(testAdmin)).thenReturn(testAdmin);

        ResponseEntity<String> response = adminController.createAdmin(testAdmin);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Admin created", response.getBody());
    }

	@Test
    public void testCreateAdminWithDuplicateUsername() {
        when(adminRepository.existsByUsername("testUser")).thenReturn(true);

        ResponseEntity<String> response = adminController.createAdmin(testAdmin);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Username is already in use", response.getBody());
    }

	@Test
	public void testGetAllAdmin() {
		List<Admin> adminList = new ArrayList<>();
		adminList.add(testAdmin);

		when(adminRepository.findAll()).thenReturn(adminList);

		ResponseEntity<List<Admin>> response = adminController.getAllAdmin();

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(adminList, response.getBody());
	}

	@Test
    public void testGetAdminById() {
		when(adminRepository.findById(1L)).thenReturn(Optional.of(testAdmin));

		ResponseEntity<?> response = adminController.getAdminById(1L);
	
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(testAdmin, ((Optional<?>) response.getBody()).get());
    }

	@Test
    public void testGetAdminByIdNotFound() {
        when(adminRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = adminController.getAdminById(2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Id is not found", response.getBody());
    }

	@Test
    public void testUpdateAdmin() {
        when(adminRepository.findById(1L)).thenReturn(Optional.of(testAdmin));
        AdminDTO adminDTO = new AdminDTO();  
		adminDTO.setUsername("newUsername");
		adminDTO.setPassword("newPassword");
        ResponseEntity<String> response = adminController.updateAdmin(1L, adminDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Admin updated", response.getBody());
    }

	@Test
    public void testUpdateAdminNotFound() {
        when(adminRepository.findById(2L)).thenReturn(Optional.empty());
        AdminDTO adminDTO = new AdminDTO();  
		adminDTO.setUsername("newUsername");
		adminDTO.setPassword("newPassword");
        ResponseEntity<String> response = adminController.updateAdmin(2L, adminDTO);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("id not found", response.getBody());
    }

	@Test
    public void testDeleteAdmin() {
        when(adminRepository.findById(1L)).thenReturn(Optional.of(testAdmin));

        ResponseEntity<String> response = adminController.deleteAdmin(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Admin deleted", response.getBody());
    }

	@Test
    public void testDeleteAdminNotFound() {
        when(adminRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<String> response = adminController.deleteAdmin(2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Id is not found", response.getBody());
    }
}

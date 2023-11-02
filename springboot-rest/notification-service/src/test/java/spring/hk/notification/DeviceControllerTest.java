package spring.hk.notification;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import spring.hk.notification.controller.DeviceController;
import spring.hk.notification.dto.DeviceDTO;
import spring.hk.notification.mapper.ServerMapper;
import spring.hk.notification.model.Device;
import spring.hk.notification.model.User;
import spring.hk.notification.repository.DeviceRepository;
import spring.hk.notification.repository.UserRepository;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DeviceControllerTest {
    @InjectMocks
    private DeviceController deviceController;

    @Mock
    private DeviceRepository deviceRepository;

    @Mock
    private ServerMapper serverMapper;

    @Mock
    private UserRepository userRepository;

    private Device testDevice;
    private User testUser;

    @BeforeEach
    void setUp() {
        testDevice = new Device();
        testDevice.setId(1L);
        testDevice.setDevice_name("TestDevice");
        testDevice.setDevice_token("Test token");

        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("Test Email");

    }

    @Test
    public void testCreateDevice() {
        when(deviceRepository.save(testDevice)).thenReturn(testDevice);

        ResponseEntity<String> response = deviceController.createDevice(testDevice);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("device created", response.getBody());
    }

    @Test
    public void testConnectDeviceUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(deviceRepository.findById(1L)).thenReturn(Optional.of(testDevice));

        ResponseEntity<String> response = deviceController.connectDeviceUser(1L, 1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Device connected to user.", response.getBody());
    }

    @Test
    public void testConnectDeviceUserNotFound() {
        when(userRepository.findById(2L)).thenReturn(Optional.empty());
        when(deviceRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<String> response = deviceController.connectDeviceUser(2L, 2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User or Device not found.", response.getBody());
    }

    @Test
    public void testGetAllDevices() {
        List<Device> deviceList = new ArrayList<>();
        deviceList.add(testDevice);

        when(deviceRepository.findAll()).thenReturn(deviceList);

        ResponseEntity<List<Device>> response = deviceController.getAllDevices();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(deviceList, response.getBody());
    }

    @Test
    public void testGetDeviceById() {
        when(deviceRepository.findById(1L)).thenReturn(Optional.of(testDevice));

        ResponseEntity<?> response = deviceController.getDeviceById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testDevice, ((Optional<?>) response.getBody()).get());
    }

    @Test
    public void testGetDeviceByIdNotFound() {
        when(deviceRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = deviceController.getDeviceById(2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Id device not found", response.getBody());
    }

    @Test
    public void testDeleteDeviceById() {
        when(deviceRepository.existsById(1L)).thenReturn(true);

        ResponseEntity<String> response = deviceController.deleteDeviceById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Device deleted", response.getBody());
    }

    @Test
    public void testDeleteDeviceByIdNotFound() {
        when(deviceRepository.existsById(2L)).thenReturn(false);

        ResponseEntity<String> response = deviceController.deleteDeviceById(2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Device not found", response.getBody());
    }

    @Test
    public void testUpdateDeviceSomeField() {
        when(deviceRepository.findById(1L)).thenReturn(Optional.of(testDevice));
        DeviceDTO deviceDTO = new DeviceDTO();

        ResponseEntity<?> response = deviceController.updateDeviceSomeField(1L, deviceDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("updated", response.getBody());
    }

    @Test
    public void testUpdateDeviceSomeFieldNotFound() {
        when(deviceRepository.findById(2L)).thenReturn(Optional.empty());
        DeviceDTO deviceDTO = new DeviceDTO();

        ResponseEntity<?> response = deviceController.updateDeviceSomeField(2L, deviceDTO);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("id not found", response.getBody());
    }
}

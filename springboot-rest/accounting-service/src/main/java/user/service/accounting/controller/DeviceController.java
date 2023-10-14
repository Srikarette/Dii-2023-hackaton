package user.service.accounting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import user.service.accounting.dto.DeviceDTO;
import user.service.accounting.mapper.ServerMapper;
import user.service.accounting.model.Device;
import user.service.accounting.model.User;
import user.service.accounting.repository.DeviceRepository;
import user.service.accounting.repository.UserRepository;
import java.util.*;

@RestController
public class DeviceController {
    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private ServerMapper serverMapper;

    @Autowired
    private UserRepository userRepository;

    // post device
    @PostMapping("devices")
    public ResponseEntity<String> createDevice(@RequestBody Device device) {
        deviceRepository.save(device);
        return ResponseEntity.ok("device created");
    }

    // connect device and user
    @PutMapping("devices/{device_id}/users/{user_id}")
    public ResponseEntity<String> connectDeviceUser(@PathVariable Long device_id, @PathVariable Long user_id) {
        Optional<User> userOptional = userRepository.findById(user_id);
        Optional<Device> deviceOptional = deviceRepository.findById(device_id);

        if (userOptional.isPresent() && deviceOptional.isPresent()) {
            User user = userOptional.get();
            Device device = deviceOptional.get();

            device.setUser(user);
            deviceRepository.save(device);

            return ResponseEntity.ok("Device connected to user.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Device not found.");
        }
    }

    // Get all devices
    @GetMapping("/devices")
    public ResponseEntity<List<Device>> getAllDevices() {
        List<Device> devices = deviceRepository.findAll();
        return ResponseEntity.ok(devices);
    }

    // Get a device by ID
    @GetMapping("/devices/{id}")
    public ResponseEntity<?> getDeviceById(@PathVariable Long id) {
        Optional<Device> device = deviceRepository.findById(id);
        if (!device.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id device not found");
        }
        return ResponseEntity.ok(device);
    }

    // Delete a device by ID
    @DeleteMapping("/devices/{id}")
    public ResponseEntity<String> deleteDeviceById(@PathVariable Long id) {
        if (deviceRepository.existsById(id)) {
            deviceRepository.deleteById(id);
            return ResponseEntity.ok("Device deleted");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Device not found");
        }
    }

    // update some field
    @PatchMapping("/devices/{id}")
    public ResponseEntity<?> updateDeviceSomeField(@PathVariable Long id, @RequestBody DeviceDTO deviceDTO) {
        Optional<Device> otpDevice = deviceRepository.findById(id);
        if (!otpDevice.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("id not found");
        }
        Device device = otpDevice.get();
        serverMapper.updateADeviceFromDto(deviceDTO, device);
        deviceRepository.save(device);

        return ResponseEntity.ok("updated");

    }
}

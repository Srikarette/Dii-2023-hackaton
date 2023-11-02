package spring.hk.notification;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import spring.hk.notification.controller.NotificationController;
import spring.hk.notification.dto.NotificationDTO;
import spring.hk.notification.mapper.ServerMapper;
import spring.hk.notification.model.Notification;
import spring.hk.notification.repository.NotificationRepository;

import java.util.Optional;


import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class NotificationControllerTest {
    @InjectMocks
    private NotificationController notificationController;

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private ServerMapper serverMapper;

    private Notification testNotification;

    @BeforeEach
    void setUp() {
        // กำหนดค่าเริ่มต้นหรืออ็อบเจ็กต์ที่ใช้ในเทส
        testNotification = new Notification();
        testNotification.setId(1L);
        testNotification.setCategory("TestCategory");
        testNotification.setLatitude(123.225);
        testNotification.setLongitude(556.666);
        testNotification.setMessage("TestMessage");
        testNotification.setStatus(10);

        // เพิ่มการกำหนดค่าเริ่มต้นอื่น ๆ ตามที่ต้องการ
    }

    @Test
    public void testCreateNotification() {
        when(notificationRepository.save(testNotification)).thenReturn(testNotification);

        ResponseEntity<?> response = notificationController.createNotification(testNotification);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("created", response.getBody());
    }

    @Test
    public void testGetAllNoti() {
        List<Notification> notificationList = new ArrayList<>();
        notificationList.add(testNotification);

        when(notificationRepository.findAll()).thenReturn(notificationList);

        ResponseEntity<?> response = notificationController.getAllNoti();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(notificationList, response.getBody());
    }

    @Test
    public void testGetNotiById() {
        when(notificationRepository.findById(1L)).thenReturn(Optional.of(testNotification));

        ResponseEntity<?> response = notificationController.getNotiById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testNotification, ((Optional<?>) response.getBody()).get());
    }

    @Test
    public void testGetNotiByIdNotFound() {
        when(notificationRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = notificationController.getNotiById(2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("notification not found", response.getBody());
    }

    @Test
    public void testDeleteNoti() {
        when(notificationRepository.findById(1L)).thenReturn(Optional.of(testNotification));

        ResponseEntity<?> response = notificationController.deleteNoti(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testNotification, ((Optional<?>) response.getBody()).get());
    }

    @Test
    public void testDeleteNotiNotFound() {
        when(notificationRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = notificationController.deleteNoti(2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("notification not found", response.getBody());
    }

    @Test
    public void testUpdateNotiSomeField() {
        when(notificationRepository.findById(1L)).thenReturn(Optional.of(testNotification));
        NotificationDTO notificationDTO = new NotificationDTO();

        ResponseEntity<?> response = notificationController.updateNotiSomeField(1L, notificationDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("updated", response.getBody());
    }

    @Test
    public void testUpdateNotiSomeFieldNotFound() {
        when(notificationRepository.findById(2L)).thenReturn(Optional.empty());
        NotificationDTO notificationDTO = new NotificationDTO();

        ResponseEntity<?> response = notificationController.updateNotiSomeField(2L, notificationDTO);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("id not found", response.getBody());
    }
}

package spring.hk.notification;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import spring.hk.notification.controller.HistoryController;
import spring.hk.notification.dto.HistoryDTO;
import spring.hk.notification.mapper.ServerMapper;
import spring.hk.notification.model.History;
import spring.hk.notification.model.Notification;
import spring.hk.notification.repository.HistoryRepository;
import spring.hk.notification.repository.NotificationRepository;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class HistoryControllerTest {
    @InjectMocks
    private HistoryController historyController;

    @Mock
    private HistoryRepository historyRepository;

    @Mock
    private ServerMapper serverMapper;

    @Mock
    private NotificationRepository notificationRepository;

    private History testHistory;
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

        testHistory = new History();
        testHistory.setId(1L);
        testHistory.setNotification(testNotification);
        // เพิ่มการกำหนดค่าเริ่มต้นอื่น ๆ ตามที่ต้องการ
    }

    @Test
    public void testCreateHistory() {
        when(historyRepository.save(testHistory)).thenReturn(testHistory);

        ResponseEntity<?> response = historyController.createHistory(testHistory);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("history created", response.getBody());
    }

    @Test
    public void testConnectHistoryNotification() {
        when(notificationRepository.findById(1L)).thenReturn(Optional.of(testNotification));
        when(historyRepository.findById(1L)).thenReturn(Optional.of(testHistory));

        ResponseEntity<?> response = historyController.connectHistoryNotification(1L, 1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("History connected to notification", response.getBody());
    }

    @Test
    public void testConnectHistoryNotificationNotFound() {
        when(notificationRepository.findById(2L)).thenReturn(Optional.empty());
        when(historyRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = historyController.connectHistoryNotification(2L, 2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("History or notification not found.", response.getBody());
    }

    @Test
    public void testGetAllHistory() {
        List<History> historyList = new ArrayList<>();
        historyList.add(testHistory);

        when(historyRepository.findAll()).thenReturn(historyList);

        ResponseEntity<?> response = historyController.getAllHistory();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(historyList, response.getBody());
    }

    @Test
    public void testGetHistoryById() {
        when(historyRepository.findById(1L)).thenReturn(Optional.of(testHistory));

        ResponseEntity<?> response = historyController.getHistoryById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testHistory, ((Optional<?>) response.getBody()).get());
    }

    @Test
    public void testGetHistoryByIdNotFound() {
        when(historyRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = historyController.getHistoryById(2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Id not found", response.getBody());
    }

    @Test
    public void testDeleteHistoryById() {
        ResponseEntity<?> response = historyController.deleteHistoryById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("History not found", response.getBody());
    }

    @Test
    public void testDeleteHistoryByIdNotFound() {
        ResponseEntity<?> response = historyController.deleteHistoryById(2L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("History not found", response.getBody());
    }

    @Test
    public void testUpdateHistorySomeField() {
        when(historyRepository.findById(1L)).thenReturn(Optional.of(testHistory));
        HistoryDTO historyDTO = new HistoryDTO();
        historyDTO.setUser_count(50);

        ResponseEntity<?> response = historyController.updateHistorySomeField(1L, historyDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("updated", response.getBody());
    }

    @Test
    public void testUpdateHistorySomeFieldNotFound() {
        when(historyRepository.findById(2L)).thenReturn(Optional.empty());
        HistoryDTO historyDTO = new HistoryDTO();

        ResponseEntity<?> response = historyController.updateHistorySomeField(2L, historyDTO);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("id not found", response.getBody());
    }
}

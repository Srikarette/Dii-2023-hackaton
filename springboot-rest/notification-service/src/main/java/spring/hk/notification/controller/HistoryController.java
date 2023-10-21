package spring.hk.notification.controller;

import java.util.Optional;

import javax.swing.text.html.Option;

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

import spring.hk.notification.dto.HistoryDTO;
import spring.hk.notification.mapper.ServerMapper;
import spring.hk.notification.model.Event;
import spring.hk.notification.model.History;
import spring.hk.notification.model.Notification;
import spring.hk.notification.repository.EventRepository;
import spring.hk.notification.repository.HistoryRepository;
import spring.hk.notification.repository.NotificationRepository;

@RestController
public class HistoryController {
    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private ServerMapper serverMapper;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private EventRepository eventRepository;

    // post history
    @PostMapping("/historys")
    public ResponseEntity<?> createHistory(@RequestBody History history) {
        historyRepository.save(history);
        return ResponseEntity.ok("history created");
    }

    // connect history and notification
    @PutMapping("/historys/{history_id}/notifications/{notification_id}")
    public ResponseEntity<?> connectHistoryNotification(@PathVariable Long history_id,
            @PathVariable Long notification_id) {
        Optional<History> historyOption = historyRepository.findById(history_id);
        Optional<Notification> notificationOption = notificationRepository.findById(notification_id);

        if (historyOption.isPresent() && notificationOption.isPresent()) {
            History history = historyOption.get();
            Notification notification = notificationOption.get();

            history.setNotification(notification);
            historyRepository.save(history);

            return ResponseEntity.ok("History connected to notification");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("History or notification not found.");
        }
    }

    // get all history
    @GetMapping("/historys")
    public ResponseEntity<?> getAllHistory() {
        return ResponseEntity.ok(historyRepository.findAll());
    }

    // get history by id
    @GetMapping("/historys/{id}")
    public ResponseEntity<?> getHistoryById(@PathVariable Long id) {
        Optional<History> history = historyRepository.findById(id);
        return ResponseEntity.ok(history);
    }

    // delete history
    @DeleteMapping("/historys/{id}")
    public ResponseEntity<?> deleteHistoryById(@PathVariable Long id) {
        Optional<History> historys = historyRepository.findById(id);
        if (historys.isPresent()) {
            historyRepository.deleteById(id);
            return ResponseEntity.ok("deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("History not found");
    }

    // update history by id
    @PatchMapping("/historys/id")
    public ResponseEntity<?> updateHistorySomeField(@PathVariable Long id, @RequestBody HistoryDTO historyDTO) {
        Optional<History> otpHistory = historyRepository.findById(id);
        if (!otpHistory.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("id not found");
        }
        History history = otpHistory.get();
        serverMapper.updateHistoryFromDto(historyDTO, history);
        historyRepository.save(history);

        return ResponseEntity.ok("updated");
    }
}

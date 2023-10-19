package spring.hk.notification.controller;

import java.util.Date;
import java.util.Optional;

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

import spring.hk.notification.dto.NotificationDTO;
import spring.hk.notification.mapper.ServerMapper;
import spring.hk.notification.model.Event;
import spring.hk.notification.model.History;
import spring.hk.notification.model.Notification;
import spring.hk.notification.repository.EventRepository;
import spring.hk.notification.repository.NotificationRepository;

@RestController
public class NotificationController {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ServerMapper serverMapper;

    @Autowired
    private EventRepository eventRepository;

    // post noti
    @PostMapping("https://generous-snail-nearby.ngrok-free.app/notifications")
    public ResponseEntity<?> createNotification(@RequestBody Notification notification) {
        notification.setSent_at(new Date());
        notificationRepository.save(notification);
        return ResponseEntity.ok("created");
    }

    // connect noti to event
    @PutMapping("/notifications/{noti}/events/{event}")
    public ResponseEntity<?> connectNotificationEvent(@PathVariable Long noti, @PathVariable Long event) {
        Optional<Notification> notificationOption = notificationRepository.findById(noti);
        Optional<Event> eventOption = eventRepository.findById(event);

        if (notificationOption.isPresent() && eventOption.isPresent()) {
            Event events = eventOption.get();
            Notification notification = notificationOption.get();

            notification.setEvent(events);
            notificationRepository.save(notification);

            return ResponseEntity.ok("event connected to notification");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("event or notification not found.");
        }
    }

    // get all noti
<<<<<<< HEAD
    @GetMapping("https://generous-snail-nearby.ngrok-free.app/notifications")
=======
    @GetMapping("/notifications")
>>>>>>> backend
    public ResponseEntity<?> getAllNoti() {
        return ResponseEntity.ok(notificationRepository.findAll());
    }

    // get noti by id
<<<<<<< HEAD
    @GetMapping("/notification/{id}")
=======
    @GetMapping("/notifications/{id}")
>>>>>>> backend
    public ResponseEntity<?> getNotiById(@PathVariable Long id) {
        Optional<Notification> notification = notificationRepository.findById(id);
        if (!notification.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("notification not found");
        }
        return ResponseEntity.ok(notification);
    }

    // delete noti
    @DeleteMapping("/notifications/{id}")
    public ResponseEntity<?> deleteNoti(@PathVariable Long id) {
        Optional<Notification> notification = notificationRepository.findById(id);
        if (!notification.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("notification not found");
        }
        notificationRepository.deleteById(id);
        return ResponseEntity.ok(notification);
    }

    // update noti some field
    @PatchMapping("/notifications/{id}")
    public ResponseEntity<?> updateNotiSomeField(@PathVariable Long id, @RequestBody NotificationDTO notificationDTO) {
        Optional<Notification> otpNotification = notificationRepository.findById(id);
        if (!otpNotification.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("id not found");
        }
        Notification notification = otpNotification.get();
        serverMapper.updateNotificationFromDto(notificationDTO, notification);
        notificationRepository.save(notification);

        return ResponseEntity.ok("updated");
    }
}

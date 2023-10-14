package spring.hk.notification.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import spring.hk.notification.mapper.ServerMapper;
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

    //post noti
    @PostMapping("/notifications")
    public ResponseEntity<?> createNotification(@RequestBody Notification notification){
        notificationRepository.save(notification);
        return ResponseEntity.ok("created");
    }
    //connect noti to event

    //get all noti

    //get noti by id

    //delete noti

    //update noti some field 
}

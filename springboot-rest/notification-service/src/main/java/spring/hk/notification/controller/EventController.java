package spring.hk.notification.controller;

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

import spring.hk.notification.dto.EventDTO;
import spring.hk.notification.mapper.ServerMapper;
import spring.hk.notification.model.Event;
import spring.hk.notification.repository.EventRepository;
import java.util.*;

@RestController
public class EventController {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ServerMapper serverMapper;

    // post event
    @PostMapping("/events")
    public ResponseEntity<String> createEvent(@RequestBody Event event) {
        eventRepository.save(event);
        return ResponseEntity.ok("Event created");
    }

    // get all event
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getAllEvent() {
        return ResponseEntity.ok(eventRepository.findAll());
    }

    // get event by id
    @GetMapping("/events/id/{id}")
    public ResponseEntity<Optional<Event>> getEventById(@PathVariable Long id) {
        Optional<Event> event = eventRepository.findById(id);
        return ResponseEntity.ok(event);
    }

    // get event by category
    @GetMapping("/events/category/{category}")
    public ResponseEntity<?> getEventByCategory(@PathVariable String category) {
        List<Event> evetns = eventRepository.findByCategory(category);
        return ResponseEntity.ok(evetns);
    }

    // get event by status
    @GetMapping("/events/status/{status}")
    public ResponseEntity<?> getEventByStatus(@PathVariable int status) {
        List<Event> evetns = eventRepository.findByStatus(status);
        return ResponseEntity.ok(evetns);
    }
    // delete event
    @DeleteMapping("/events/{id}")
    public ResponseEntity<?> deleteEventById(@PathVariable Long id){
        Optional<Event> events = eventRepository.findById(id);
        if(events.isPresent()){
            eventRepository.deleteById(id);
            return ResponseEntity.ok("deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id not found");
    }

    // update event some field
    @PatchMapping("/events/{id}")
    public ResponseEntity<?> updateEventSomeField(@PathVariable Long id,@RequestBody EventDTO eventDTO){
        Optional<Event> otpEvent = eventRepository.findById(id);
        if(!otpEvent.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("id not found");
        }
        Event events = otpEvent.get();
        serverMapper.updateEventFromDto(eventDTO, events);
        eventRepository.save(events);
        
        return ResponseEntity.ok("updated");
    }
}

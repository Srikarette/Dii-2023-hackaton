package spring.hk.notification.repository;

import org.springframework.data.repository.CrudRepository;

import spring.hk.notification.model.Event;

import java.util.*;

public interface EventRepository extends CrudRepository<Event, Long> {
    public List<Event> findAll();

    public Optional<Event> findById(Long id);

    public List<Event> findByEvent_name(String name);

    public List<Event> findByEvent_category(String category);

    public List<Event> findByStatus(int status);
}

package spring.hk.notification.repository;

import org.springframework.data.repository.CrudRepository;

import spring.hk.notification.model.Notification;
import java.util.*;

public interface NotificationRepository extends CrudRepository<Notification, Long> {
    public List<Notification> findAll();

    public Optional<Notification> findById(Long id);
}

package spring.hk.notification.repository;

import org.springframework.data.repository.CrudRepository;

import spring.hk.notification.model.History;

import java.util.*;

public interface HistoryRepository extends CrudRepository<History, Long> {
    public List<History> findAll();

    public Optional<History> findById(Long id);
}

package spring.hk.notification.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import spring.hk.notification.model.User;

public interface UserRepository extends CrudRepository<User,Long>{
    public List<User> findAll();
    public Optional<User> findById(Long id);
    public List<User> findByEmail(String email);
    public boolean existsByEmail(String email);
}

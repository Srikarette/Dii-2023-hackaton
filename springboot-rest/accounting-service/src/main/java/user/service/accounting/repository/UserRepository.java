package user.service.accounting.repository;

import user.service.accounting.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Long>{
    public List<User> findAll();
    public Optional<User> findById(Long id);
    public List<User> findByEmail(String email);
    public boolean existsByEmail(String email);
}

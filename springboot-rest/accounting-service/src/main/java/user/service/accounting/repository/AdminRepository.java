package user.service.accounting.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import user.service.accounting.model.Admin;

public interface AdminRepository extends CrudRepository<Admin,Long>{
    public List<Admin> findAll();
    public Optional<Admin> findById(Long id);
    public List<Admin> findByAgency(String agency);
    public boolean existsByUsername(String username);
    public List<Admin> findByUsername(String username);
}

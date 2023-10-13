package user.service.accounting.repository;

import org.springframework.data.repository.CrudRepository;

import user.service.accounting.model.Device;
import java.util.*;

public interface DeviceRepository extends CrudRepository<Device,Long>{
    public List<Device> findAll();
    public Optional<Device> findById(Long id);
}

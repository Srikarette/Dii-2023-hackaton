package spring.hk.notification.repository;

import org.springframework.data.repository.CrudRepository;

import spring.hk.notification.model.Device;

import java.util.*;

public interface DeviceRepository extends CrudRepository<Device,Long>{
    public List<Device> findAll();
    public Optional<Device> findById(Long id);
}

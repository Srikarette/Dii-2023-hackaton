package user.service.accounting;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {

    public List<Account> findAll();

    public List<Account> findById(String id);

    public List<Account> findByUsername(String username);

}

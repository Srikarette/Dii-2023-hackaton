package spring.hk.notification.model;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;
    private Date create_at;

    //relationship
    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<Device> device;
    
    public User(){}
    public User(Long id, String email, Date create_at) {
        this.id = id;
        this.email = email;
        this.create_at = create_at;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Date getCreate_at() {
        return create_at;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCreate_at(Date create_at) {
        this.create_at = create_at;
    }

    

}

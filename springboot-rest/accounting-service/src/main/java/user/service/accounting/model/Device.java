package user.service.accounting.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "device")
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //relationship
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String device_token;
    private String device_name;

    public Device(){}
    public Device(Long id, User user, String device_token, String device_name) {
        this.id = id;
        this.user = user;
        this.device_token = device_token;
        this.device_name = device_name;
    }
    public Long getId() {
        return id;
    }
    public User getUser() {
        return user;
    }
    public String getDevice_token() {
        return device_token;
    }
    public String getDevice_name() {
        return device_name;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public void setDevice_token(String device_token) {
        this.device_token = device_token;
    }
    public void setDevice_name(String device_name) {
        this.device_name = device_name;
    }

   
}

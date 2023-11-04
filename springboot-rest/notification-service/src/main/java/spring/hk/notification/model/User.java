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

    private String displayName;
    private String pictureUrl;
    private String email;
    private Date create_at;

    //relationship
    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<Device> device;
    
    public User(){}

    public User(Long id, String displayName, String pictureUrl, String email, Date create_at, List<Device> device) {
        this.id = id;
        this.displayName = displayName;
        this.pictureUrl = pictureUrl;
        this.email = email;
        this.create_at = create_at;
        this.device = device;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Date create_at) {
        this.create_at = create_at;
    }

    public List<Device> getDevice() {
        return device;
    }

    public void setDevice(List<Device> device) {
        this.device = device;
    }

    

}

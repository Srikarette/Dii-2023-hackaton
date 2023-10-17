package user.service.accounting.dto;

import java.util.Date;

public class UserDTO {
     private Long id;

    private String email;
    private Date create_at;
    
    public UserDTO(){}
    public UserDTO(Long id, String email, Date create_at) {
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

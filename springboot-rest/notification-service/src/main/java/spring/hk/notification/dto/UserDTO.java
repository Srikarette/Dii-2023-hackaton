package spring.hk.notification.dto;

import java.util.Date;

public class UserDTO {
    private Long id;
    private String displayName;
    private String pictureUrl;

    private String email;
    private Date create_at;

    public UserDTO() {
    }

    
    public UserDTO(Long id, String displayName, String pictureUrl, String email, Date create_at) {
        this.id = id;
        this.displayName = displayName;
        this.pictureUrl = pictureUrl;
        this.email = email;
        this.create_at = create_at;
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


}

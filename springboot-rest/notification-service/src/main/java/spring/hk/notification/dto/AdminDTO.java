package spring.hk.notification.dto;

public class AdminDTO {
    private Long id;

    private String username;
    private String password;
    private String agency;
    private String email;

    public AdminDTO(){}
    public AdminDTO(Long id, String username, String password, String agency, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.agency = agency;
        this.email = email;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setAgency(String agency) {
        this.agency = agency;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Long getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
    public String getAgency() {
        return agency;
    }
    public String getEmail() {
        return email;
    }
}

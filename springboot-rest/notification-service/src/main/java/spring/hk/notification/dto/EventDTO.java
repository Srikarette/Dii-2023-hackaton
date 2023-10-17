package spring.hk.notification.dto;


import spring.hk.notification.model.History;
import spring.hk.notification.model.Notification;

public class EventDTO {
    private Long id;

    private String event_name;
    private String event_category;
    private String message;
    private int status;
    
    public EventDTO(){}

    public EventDTO(Long id, String event_name, String event_category, String message, int status) {
        this.id = id;
        this.event_name = event_name;
        this.event_category = event_category;
        this.message = message;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEvent_name() {
        return event_name;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }

    public String getEvent_category() {
        return event_category;
    }

    public void setEvent_category(String event_category) {
        this.event_category = event_category;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }


   
}

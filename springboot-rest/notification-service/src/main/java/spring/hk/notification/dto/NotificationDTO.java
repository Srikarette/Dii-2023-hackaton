package spring.hk.notification.dto;

import java.util.Date;

import spring.hk.notification.model.Event;
import spring.hk.notification.model.History;

public class NotificationDTO {
    private Long id;

    private Long user_id;
    private Event event;


    private Long longitude;
    private Long latitude;
    private Date sent_at;

    public NotificationDTO(){}

    public NotificationDTO(Long id, Long user_id, Event event, Long longitude, Long latitude, Date sent_at) {
        this.id = id;
        this.user_id = user_id;
        this.event = event;
        this.longitude = longitude;
        this.latitude = latitude;
        this.sent_at = sent_at;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Long getLongitude() {
        return longitude;
    }

    public void setLongitude(Long longitude) {
        this.longitude = longitude;
    }

    public Long getLatitude() {
        return latitude;
    }

    public void setLatitude(Long latitude) {
        this.latitude = latitude;
    }

    public Date getSent_at() {
        return sent_at;
    }

    public void setSent_at(Date sent_at) {
        this.sent_at = sent_at;
    }

   

    
}

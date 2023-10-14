package spring.hk.notification.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.*;

@Entity
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "notification_id")
    private Notification notification;

    private String event_name;
    private String event_category;
    private String message;
    private int status;

    

    public History(){}



    public History(Long id, Event event, Notification notification, String event_name, String event_category,
            String message, int status) {
        this.id = id;
        this.event = event;
        this.notification = notification;
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



    public Event getEvent() {
        return event;
    }



    public void setEvent(Event event) {
        this.event = event;
    }



    public Notification getNotification() {
        return notification;
    }



    public void setNotification(Notification notification) {
        this.notification = notification;
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

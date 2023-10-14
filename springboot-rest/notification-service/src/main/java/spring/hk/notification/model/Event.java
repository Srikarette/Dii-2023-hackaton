package spring.hk.notification.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String event_name;
    private String event_category;
    private String message;
    private int status;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private Notification notifications;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private History histories;
    

    public Event(){}


    public Event(Long id, String event_name, String event_category, String message, int status,
            Notification notifications, History histories) {
        this.id = id;
        this.event_name = event_name;
        this.event_category = event_category;
        this.message = message;
        this.status = status;
        this.notifications = notifications;
        this.histories = histories;
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


    public Notification getNotifications() {
        return notifications;
    }


    public void setNotifications(Notification notifications) {
        this.notifications = notifications;
    }


    public History getHistories() {
        return histories;
    }


    public void setHistories(History histories) {
        this.histories = histories;
    }


}

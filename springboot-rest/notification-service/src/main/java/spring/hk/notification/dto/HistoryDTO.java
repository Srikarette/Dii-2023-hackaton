package spring.hk.notification.dto;

import spring.hk.notification.model.Event;
import spring.hk.notification.model.Notification;

public class HistoryDTO {
    private Long id;

    private Event event;
    private Notification notification;

    private String event_name;
    private String event_category;
    private String message;
    private int status;

    public HistoryDTO(){}

    public HistoryDTO(Long id, Event event, Notification notification, String event_name, String event_category,
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

package spring.hk.notification.dto;

import spring.hk.notification.model.Notification;

public class HistoryDTO {
    private Long id;

    private Notification notification;
    private int user_count;

    public HistoryDTO(){}

    public HistoryDTO(Long id, Notification notification, int user_count) {
        this.id = id;
        this.notification = notification;
        this.user_count = user_count;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public int getUser_count() {
        return user_count;
    }

    public void setUser_count(int user_count) {
        this.user_count = user_count;
    }


    
}

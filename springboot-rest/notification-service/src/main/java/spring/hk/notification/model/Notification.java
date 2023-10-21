package spring.hk.notification.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long user_id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @Column(columnDefinition = "NUMERIC(9, 6)") // รูปแบบข้อมูลที่เพิ่มเข้ามา
    private Double longitude;

    @Column(columnDefinition = "NUMERIC(9, 6)") // รูปแบบข้อมูลที่เพิ่มเข้ามา
    private Double latitude;
    private Date sent_at;

    public Notification() {
    }

    public Notification(Long id, Long user_id, Event event, Double longitude, Double latitude, Date sent_at) {
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

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Date getSent_at() {
        return sent_at;
    }

    public void setSent_at(Date sent_at) {
        this.sent_at = sent_at;
    }

}

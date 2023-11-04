package spring.hk.notification.mapper;

import javax.annotation.Generated;
import org.springframework.stereotype.Component;
import spring.hk.notification.dto.AdminDTO;
import spring.hk.notification.dto.DeviceDTO;
import spring.hk.notification.dto.HistoryDTO;
import spring.hk.notification.dto.NotificationDTO;
import spring.hk.notification.dto.UserDTO;
import spring.hk.notification.model.Admin;
import spring.hk.notification.model.Device;
import spring.hk.notification.model.History;
import spring.hk.notification.model.Notification;
import spring.hk.notification.model.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< HEAD
    date = "2566-11-04T22:22:55+0700",
=======
    date = "2023-11-04T21:49:53+0700",
>>>>>>> b7c7d098e4fc0117ec74d4f4cea44a1f1aec18bb
    comments = "version: 1.3.1.Final, compiler: Eclipse JDT (IDE) 3.35.0.v20230814-2020, environment: Java 17.0.8.1 (Eclipse Adoptium)"
)
@Component
public class ServerMapperImpl implements ServerMapper {

    @Override
    public void updateHistoryFromDto(HistoryDTO dto, History entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getNotification() != null ) {
            entity.setNotification( dto.getNotification() );
        }
        entity.setUser_count( dto.getUser_count() );
    }

    @Override
    public void updateNotificationFromDto(NotificationDTO dto, Notification entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getCategory() != null ) {
            entity.setCategory( dto.getCategory() );
        }
        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getLatitude() != null ) {
            entity.setLatitude( dto.getLatitude() );
        }
        if ( dto.getLongitude() != null ) {
            entity.setLongitude( dto.getLongitude() );
        }
        if ( dto.getMessage() != null ) {
            entity.setMessage( dto.getMessage() );
        }
        if ( dto.getSent_at() != null ) {
            entity.setSent_at( dto.getSent_at() );
        }
        entity.setStatus( dto.getStatus() );
        if ( dto.getUser_id() != null ) {
            entity.setUser_id( dto.getUser_id() );
        }
    }

    @Override
    public void updateUserFromDto(UserDTO dto, User entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getCreate_at() != null ) {
            entity.setCreate_at( dto.getCreate_at() );
        }
        if ( dto.getDisplayName() != null ) {
            entity.setDisplayName( dto.getDisplayName() );
        }
        if ( dto.getEmail() != null ) {
            entity.setEmail( dto.getEmail() );
        }
        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getPictureUrl() != null ) {
            entity.setPictureUrl( dto.getPictureUrl() );
        }
    }

    @Override
    public void updateAdminFromDto(AdminDTO dto, Admin entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getAgency() != null ) {
            entity.setAgency( dto.getAgency() );
        }
        if ( dto.getEmail() != null ) {
            entity.setEmail( dto.getEmail() );
        }
        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getPassword() != null ) {
            entity.setPassword( dto.getPassword() );
        }
        if ( dto.getUsername() != null ) {
            entity.setUsername( dto.getUsername() );
        }
    }

    @Override
    public void updateADeviceFromDto(DeviceDTO dto, Device entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getUser() != null ) {
            entity.setUser( dto.getUser() );
        }
        if ( dto.getDevice_token() != null ) {
            entity.setDevice_token( dto.getDevice_token() );
        }
        if ( dto.getDevice_name() != null ) {
            entity.setDevice_name( dto.getDevice_name() );
        }
    }
}

package spring.hk.notification.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

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

@Mapper(componentModel = "spring")
public interface ServerMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateHistoryFromDto(HistoryDTO dto, @MappingTarget History entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateNotificationFromDto(NotificationDTO dto, @MappingTarget Notification entity);

        @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDto(UserDTO dto, @MappingTarget User entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateAdminFromDto(AdminDTO dto, @MappingTarget Admin entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateADeviceFromDto(DeviceDTO dto, @MappingTarget Device entity);
}

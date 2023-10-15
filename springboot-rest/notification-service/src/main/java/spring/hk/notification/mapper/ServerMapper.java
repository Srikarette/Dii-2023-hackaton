package spring.hk.notification.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;


import spring.hk.notification.dto.EventDTO;
import spring.hk.notification.dto.HistoryDTO;
import spring.hk.notification.dto.NotificationDTO;
import spring.hk.notification.model.Event;
import spring.hk.notification.model.History;
import spring.hk.notification.model.Notification;

@Mapper(componentModel = "spring")
public interface ServerMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEventFromDto(EventDTO dto, @MappingTarget Event entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateHistoryFromDto(HistoryDTO dto, @MappingTarget History entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateNotificationFromDto(NotificationDTO dto, @MappingTarget Notification entity);
}

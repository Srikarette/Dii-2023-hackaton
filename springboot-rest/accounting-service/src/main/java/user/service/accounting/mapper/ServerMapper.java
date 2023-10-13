package user.service.accounting.mapper;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import user.service.accounting.dto.AdminDTO;
import user.service.accounting.dto.DeviceDTO;
import user.service.accounting.dto.UserDTO;
import user.service.accounting.model.Admin;
import user.service.accounting.model.Device;
import user.service.accounting.model.User;


@Mapper(componentModel = "spring")
public interface ServerMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDto(UserDTO dto, @MappingTarget User entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateAdminFromDto(AdminDTO dto, @MappingTarget Admin entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateADeviceFromDto(DeviceDTO dto, @MappingTarget Device entity);
}

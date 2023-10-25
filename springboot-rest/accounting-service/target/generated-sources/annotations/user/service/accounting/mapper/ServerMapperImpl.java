package user.service.accounting.mapper;

import javax.annotation.Generated;
import org.springframework.stereotype.Component;
import user.service.accounting.dto.AdminDTO;
import user.service.accounting.dto.DeviceDTO;
import user.service.accounting.dto.UserDTO;
import user.service.accounting.model.Admin;
import user.service.accounting.model.Device;
import user.service.accounting.model.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-10-23T18:39:33+0700",
    comments = "version: 1.3.1.Final, compiler: Eclipse JDT (IDE) 3.35.0.v20230814-2020, environment: Java 17.0.8.1 (Eclipse Adoptium)"
)
@Component
public class ServerMapperImpl implements ServerMapper {

    @Override
    public void updateUserFromDto(UserDTO dto, User entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getEmail() != null ) {
            entity.setEmail( dto.getEmail() );
        }
        if ( dto.getCreate_at() != null ) {
            entity.setCreate_at( dto.getCreate_at() );
        }
    }

    @Override
    public void updateAdminFromDto(AdminDTO dto, Admin entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getUsername() != null ) {
            entity.setUsername( dto.getUsername() );
        }
        if ( dto.getPassword() != null ) {
            entity.setPassword( dto.getPassword() );
        }
        if ( dto.getAgency() != null ) {
            entity.setAgency( dto.getAgency() );
        }
        if ( dto.getEmail() != null ) {
            entity.setEmail( dto.getEmail() );
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

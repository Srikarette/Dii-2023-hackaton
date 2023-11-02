// package spring.hk.notification;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.mockito.Mockito.when;

// import java.util.ArrayList;
// import java.util.Date;
// import java.util.List;
// import java.util.Optional;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.boot.test.context.SpringBootTest;
// import spring.hk.notification.controller.NotificationController;
// import spring.hk.notification.dto.NotificationDTO;
// import spring.hk.notification.model.Notification;
// import spring.hk.notification.repository.NotificationRepository;
// import spring.hk.notification.mapper.ServerMapper;

// @SpringBootTest
// public class NotificationControllerTest {
    
//     @InjectMocks
//     private NotificationController notificationController;

//     @Mock
//     private NotificationRepository notificationRepository;

//     @Mock
//     private ServerMapper serverMapper;

//     @Test
//     public void testCreateNotification() {
//         Notification notification = new Notification();
//         notification.setSent_at(new Date());

//         when(notificationRepository.save(notification)).thenReturn(notification);

//         ResponseEntity<?> responseEntity = notificationController.createNotification(notification);

//         assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
//         assertEquals(responseEntity.getBody(), "created");
//     }

//     @Test
//     public void testGetAllNoti() {
//         // Mock the behavior of the repository
//         when(notificationRepository.findAll()).thenReturn(List.of(new Notification(), new Notification()));

//         ResponseEntity<?> responseEntity = notificationController.getAllNoti();

//         assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
//         assertEquals(responseEntity.getBody().getClass(), ArrayList.class);
//     }

//     @Test
//     public void testGetNotiById() {
//         Long notificationId = 1L;
//         Notification notification = new Notification();
//         notification.setId(notificationId);

//         when(notificationRepository.findById(notificationId)).thenReturn(Optional.of(notification));

//         ResponseEntity<?> responseEntity = notificationController.getNotiById(notificationId);

//         assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
//         assertEquals(((Optional<Notification>) responseEntity.getBody()).get().getId(), notificationId);
//     }

//     @Test
//     public void testGetNotiById_NotFound() {
//         Long notificationId = 1L;

//         when(notificationRepository.findById(notificationId)).thenReturn(Optional.empty());

//         ResponseEntity<?> responseEntity = notificationController.getNotiById(notificationId);

//         assertEquals(responseEntity.getStatusCode(), HttpStatus.NOT_FOUND);
//         assertEquals(responseEntity.getBody(), "notification not found");
//     }

//     @Test
//     public void testDeleteNoti() {
//         Long notificationId = 1L;
//         Notification notification = new Notification();
//         notification.setId(notificationId);

//         when(notificationRepository.findById(notificationId)).thenReturn(Optional.of(notification));

//         ResponseEntity<?> responseEntity = notificationController.deleteNoti(notificationId);

//         assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
//         assertEquals(((Optional<Notification>) responseEntity.getBody()).get().getId(), notificationId);
//     }

//     @Test
//     public void testDeleteNoti_NotFound() {
//         Long notificationId = 1L;

//         when(notificationRepository.findById(notificationId)).thenReturn(Optional.empty());

//         ResponseEntity<?> responseEntity = notificationController.deleteNoti(notificationId);

//         assertEquals(responseEntity.getStatusCode(), HttpStatus.NOT_FOUND);
//         assertEquals(responseEntity.getBody(), "notification not found");
//     }

//     @Test
//     public void testUpdateNotiSomeField() {
//         Long notificationId = 1L;
//         NotificationDTO notificationDTO = new NotificationDTO();
//         Notification notification = new Notification();
//         notification.setId(notificationId);

//         when(notificationRepository.findById(notificationId)).thenReturn(Optional.of(notification));
//         when(serverMapper.updateNotificationFromDto(notificationDTO, notification)).thenReturn(notification);

//         ResponseEntity<?> responseEntity = notificationController.updateNotiSomeField(notificationId, notificationDTO);

//         assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
//         assertEquals(responseEntity.getBody(), "updated");
//     }

//     @Test
//     public void testUpdateNotiSomeField_NotFound() {
//         Long notificationId = 1L;
//         NotificationDTO notificationDTO = new NotificationDTO();

//         when(notificationRepository.findById(notificationId)).thenReturn(Optional.empty());

//         ResponseEntity<?> responseEntity = notificationController.updateNotiSomeField(notificationId, notificationDTO);

//         assertEquals(responseEntity.getStatusCode(), HttpStatus.NOT_FOUND);
//         assertEquals(responseEntity.getBody(), "id not found");
//     }
// }

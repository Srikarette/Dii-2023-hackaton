package user.service.accounting.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import user.service.accounting.dto.AdminDTO;
import user.service.accounting.mapper.ServerMapper;
import user.service.accounting.model.Admin;
import user.service.accounting.repository.AdminRepository;

@RestController
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ServerMapper serverMapper;

    // post admin
    @PostMapping("/admins")
    public ResponseEntity<String> createAdmin(@RequestBody Admin admin) {
        if (adminRepository.existsByUsername(admin.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username is already in use");
        }
        adminRepository.save(admin);
        return ResponseEntity.ok("Admin created");
    }

    // get all admin
    @GetMapping("/admins")
    public ResponseEntity<List<Admin>> getAllAdmin() {
        List<Admin> admin = adminRepository.findAll();
        return ResponseEntity.ok(admin);
    }

    // get admin by id
    @GetMapping("/admins/id/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable Long id) {
        Optional<Admin> admin = adminRepository.findById(id);
        if (!admin.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id is not found");
        }
        return ResponseEntity.ok(admin);
    }

    // get admin by agency
    @GetMapping("/admins/agency/{agency}")
    public ResponseEntity<?> getAdminByAgency(@PathVariable String agency) {
        List<Admin> admins = adminRepository.findByAgency(agency);
        if (admins.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("agency are not found");
        }
        return ResponseEntity.ok(admins);
    }

    // delete admin by id
    @DeleteMapping("/admins/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
        Optional<Admin> admin = adminRepository.findById(id);
        if (!admin.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id is not found");
        }
        adminRepository.deleteById(id);
        return ResponseEntity.ok("Admin deleted");
    }
    // update admin some field
    @PatchMapping("/admins/{id}")
    public ResponseEntity<String> updateAdmin(@PathVariable Long id,@RequestBody AdminDTO adminDTO){
        Optional<Admin> otpAdmin = adminRepository.findById(id);
        if(!otpAdmin.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("id not found");
        }
        Admin admins = otpAdmin.get();
        serverMapper.updateAdminFromDto(adminDTO, admins);
        adminRepository.save(admins);

        return ResponseEntity.ok("Admin updated");
    }

    // login 
    @PostMapping("/admins/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin admin){
        List<Admin> adminCheckUsername = adminRepository.findByUsername(admin.getUsername());
        //check username
        if(adminCheckUsername.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("username not found");
        }
        Admin foundAdmin = adminCheckUsername.get(0);
        //check password
        if(!foundAdmin.getPassword().equals(admin.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        } 
        return ResponseEntity.ok(adminCheckUsername);
    }
}

package com.ntm.financeiro.repository;

import com.ntm.financeiro.entity.StudentGuardian;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StudentGuardianRepository extends JpaRepository<StudentGuardian, UUID> {
    List<StudentGuardian> findByStudentId(UUID studentId);
    void deleteByStudentIdAndGuardianId(UUID studentId, UUID guardianId);
}

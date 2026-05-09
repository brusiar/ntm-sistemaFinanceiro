package com.ntm.financeiro.repository;

import com.ntm.financeiro.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    Page<Student> findByUnitIdAndDeletedAtIsNull(UUID unitId, Pageable pageable);

    @Query("""
        SELECT s FROM Student s
        WHERE s.unit.id = :unitId
          AND s.deletedAt IS NULL
          AND (:name IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%')))
          AND (:status IS NULL OR s.status = :status)
    """)
    Page<Student> findByFilters(
        @Param("unitId") UUID unitId,
        @Param("name") String name,
        @Param("status") String status,
        Pageable pageable
    );

    Optional<Student> findByIdAndDeletedAtIsNull(UUID id);

    long countByUnitIdAndStatusAndDeletedAtIsNull(UUID unitId, String status);
}

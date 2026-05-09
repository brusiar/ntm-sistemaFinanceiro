package com.ntm.financeiro.repository;

import com.ntm.financeiro.entity.Guardian;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface GuardianRepository extends JpaRepository<Guardian, UUID> {

    @Query("""
        SELECT g FROM Guardian g
        WHERE g.unit.id = :unitId
          AND g.deletedAt IS NULL
          AND (:name IS NULL OR LOWER(g.name) LIKE LOWER(CONCAT('%', :name, '%')))
    """)
    Page<Guardian> findByFilters(
        @Param("unitId") UUID unitId,
        @Param("name") String name,
        Pageable pageable
    );

    Optional<Guardian> findByIdAndDeletedAtIsNull(UUID id);

    boolean existsByCpfAndDeletedAtIsNull(String cpf);
}

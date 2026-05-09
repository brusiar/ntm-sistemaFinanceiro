package com.ntm.financeiro.repository;

import com.ntm.financeiro.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UnitRepository extends JpaRepository<Unit, UUID> {
    List<Unit> findByActiveTrue();
}

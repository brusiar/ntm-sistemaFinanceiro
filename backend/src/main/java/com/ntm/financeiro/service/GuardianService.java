package com.ntm.financeiro.service;

import com.ntm.financeiro.dto.request.GuardianRequest;
import com.ntm.financeiro.dto.response.GuardianResponse;
import com.ntm.financeiro.entity.Guardian;
import com.ntm.financeiro.entity.Unit;
import com.ntm.financeiro.exception.BusinessException;
import com.ntm.financeiro.exception.ResourceNotFoundException;
import com.ntm.financeiro.mapper.GuardianMapper;
import com.ntm.financeiro.repository.GuardianRepository;
import com.ntm.financeiro.repository.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GuardianService {

    private final GuardianRepository guardianRepository;
    private final UnitRepository unitRepository;
    private final GuardianMapper guardianMapper;

    public Page<GuardianResponse> findAll(UUID unitId, String name, Pageable pageable) {
        return guardianRepository.findByFilters(unitId, name, pageable)
                .map(guardianMapper::toResponse);
    }

    public GuardianResponse findById(UUID id) {
        return guardianRepository.findByIdAndDeletedAtIsNull(id)
                .map(guardianMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Responsável", id));
    }

    @Transactional
    public GuardianResponse create(GuardianRequest request) {
        if (request.cpf() != null && guardianRepository.existsByCpfAndDeletedAtIsNull(request.cpf())) {
            throw new BusinessException("CPF já cadastrado: " + request.cpf());
        }

        Unit unit = unitRepository.findById(request.unitId())
                .orElseThrow(() -> new ResourceNotFoundException("Unidade", request.unitId()));

        Guardian guardian = Guardian.builder()
                .unit(unit)
                .name(request.name())
                .cpf(request.cpf())
                .email(request.email())
                .phone(request.phone())
                .phoneAlt(request.phoneAlt())
                .address(request.address())
                .city(request.city())
                .state(request.state())
                .zipCode(request.zipCode())
                .build();

        return guardianMapper.toResponse(guardianRepository.save(guardian));
    }

    @Transactional
    public GuardianResponse update(UUID id, GuardianRequest request) {
        Guardian guardian = guardianRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Responsável", id));

        Unit unit = unitRepository.findById(request.unitId())
                .orElseThrow(() -> new ResourceNotFoundException("Unidade", request.unitId()));

        guardian.setUnit(unit);
        guardian.setName(request.name());
        guardian.setCpf(request.cpf());
        guardian.setEmail(request.email());
        guardian.setPhone(request.phone());
        guardian.setPhoneAlt(request.phoneAlt());
        guardian.setAddress(request.address());
        guardian.setCity(request.city());
        guardian.setState(request.state());
        guardian.setZipCode(request.zipCode());

        return guardianMapper.toResponse(guardianRepository.save(guardian));
    }

    @Transactional
    public void delete(UUID id) {
        Guardian guardian = guardianRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Responsável", id));
        guardian.setDeletedAt(LocalDateTime.now());
        guardianRepository.save(guardian);
    }
}

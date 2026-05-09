package com.ntm.financeiro.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record StudentResponse(
    UUID id,
    UUID unitId,
    String unitName,
    String name,
    LocalDate birthDate,
    String cpf,
    String rg,
    String photoUrl,
    String address,
    String city,
    String state,
    String zipCode,
    String medicalNotes,
    String medicalRestrictions,
    String status,
    LocalDate enrollmentDate,
    LocalDateTime createdAt
) {}

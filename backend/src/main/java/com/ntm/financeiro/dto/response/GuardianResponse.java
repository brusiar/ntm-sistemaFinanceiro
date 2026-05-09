package com.ntm.financeiro.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public record GuardianResponse(
    UUID id,
    UUID unitId,
    String unitName,
    String name,
    String cpf,
    String email,
    String phone,
    String phoneAlt,
    String address,
    String city,
    String state,
    String zipCode,
    Boolean active,
    LocalDateTime createdAt
) {}

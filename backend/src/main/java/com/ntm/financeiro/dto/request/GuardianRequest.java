package com.ntm.financeiro.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record GuardianRequest(
    @NotNull UUID unitId,
    @NotBlank String name,
    String cpf,
    String email,
    String phone,
    String phoneAlt,
    String address,
    String city,
    String state,
    String zipCode
) {}

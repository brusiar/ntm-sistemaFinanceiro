package com.ntm.financeiro.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record StudentGuardianRequest(
    @NotNull UUID guardianId,
    @NotBlank String relationship,
    boolean isFinancialResponsible,
    boolean isPedagogicalResponsible,
    boolean isEmergencyContact
) {}

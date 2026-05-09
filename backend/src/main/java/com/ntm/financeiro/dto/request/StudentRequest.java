package com.ntm.financeiro.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;
import java.util.UUID;

public record StudentRequest(
    @NotNull UUID unitId,
    @NotBlank String name,
    @NotNull @Past LocalDate birthDate,
    String cpf,
    String rg,
    String photoUrl,
    String address,
    String city,
    String state,
    String zipCode,
    String medicalNotes,
    String medicalRestrictions,
    String status
) {}

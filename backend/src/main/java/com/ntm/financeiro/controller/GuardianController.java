package com.ntm.financeiro.controller;

import com.ntm.financeiro.dto.request.GuardianRequest;
import com.ntm.financeiro.dto.response.ApiResponse;
import com.ntm.financeiro.dto.response.GuardianResponse;
import com.ntm.financeiro.service.GuardianService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/guardians")
@RequiredArgsConstructor
@Tag(name = "Responsáveis", description = "Gestão de responsáveis pelos alunos")
public class GuardianController {

    private final GuardianService guardianService;

    @GetMapping
    @Operation(summary = "Listar responsáveis")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETARIA', 'GESTOR_UNIDADE')")
    public ResponseEntity<ApiResponse<Page<GuardianResponse>>> findAll(
            @RequestParam UUID unitId,
            @RequestParam(required = false) String name,
            @PageableDefault(size = 20, sort = "name") Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.ok(guardianService.findAll(unitId, name, pageable)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar responsável por ID")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETARIA', 'GESTOR_UNIDADE')")
    public ResponseEntity<ApiResponse<GuardianResponse>> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok(guardianService.findById(id)));
    }

    @PostMapping
    @Operation(summary = "Cadastrar responsável")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETARIA')")
    public ResponseEntity<ApiResponse<GuardianResponse>> create(@Valid @RequestBody GuardianRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Responsável cadastrado com sucesso", guardianService.create(request)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar responsável")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETARIA')")
    public ResponseEntity<ApiResponse<GuardianResponse>> update(
            @PathVariable UUID id,
            @Valid @RequestBody GuardianRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.ok("Responsável atualizado com sucesso", guardianService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remover responsável (soft delete)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        guardianService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Responsável removido com sucesso", null));
    }
}

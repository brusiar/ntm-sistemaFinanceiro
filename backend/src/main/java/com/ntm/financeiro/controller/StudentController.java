package com.ntm.financeiro.controller;

import com.ntm.financeiro.dto.request.StudentRequest;
import com.ntm.financeiro.dto.response.ApiResponse;
import com.ntm.financeiro.dto.response.StudentResponse;
import com.ntm.financeiro.service.StudentService;
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
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
@Tag(name = "Alunos", description = "Gestão de alunos")
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    @Operation(summary = "Listar alunos", description = "Lista alunos com paginação e filtros")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETARIA', 'GESTOR_UNIDADE')")
    public ResponseEntity<ApiResponse<Page<StudentResponse>>> findAll(
            @RequestParam UUID unitId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String status,
            @PageableDefault(size = 20, sort = "name") Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.ok(studentService.findAll(unitId, name, status, pageable)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar aluno por ID")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETARIA', 'GESTOR_UNIDADE')")
    public ResponseEntity<ApiResponse<StudentResponse>> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok(studentService.findById(id)));
    }

    @PostMapping
    @Operation(summary = "Cadastrar aluno")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETARIA')")
    public ResponseEntity<ApiResponse<StudentResponse>> create(@Valid @RequestBody StudentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Aluno cadastrado com sucesso", studentService.create(request)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar aluno")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETARIA')")
    public ResponseEntity<ApiResponse<StudentResponse>> update(
            @PathVariable UUID id,
            @Valid @RequestBody StudentRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.ok("Aluno atualizado com sucesso", studentService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remover aluno (soft delete)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        studentService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Aluno removido com sucesso", null));
    }
}

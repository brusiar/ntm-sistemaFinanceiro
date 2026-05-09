package com.ntm.financeiro.service;

import com.ntm.financeiro.dto.request.StudentRequest;
import com.ntm.financeiro.dto.response.StudentResponse;
import com.ntm.financeiro.entity.Student;
import com.ntm.financeiro.entity.Unit;
import com.ntm.financeiro.exception.ResourceNotFoundException;
import com.ntm.financeiro.mapper.StudentMapper;
import com.ntm.financeiro.repository.StudentRepository;
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
public class StudentService {

    private final StudentRepository studentRepository;
    private final UnitRepository unitRepository;
    private final StudentMapper studentMapper;

    public Page<StudentResponse> findAll(UUID unitId, String name, String status, Pageable pageable) {
        return studentRepository.findByFilters(unitId, name, status, pageable)
                .map(studentMapper::toResponse);
    }

    public StudentResponse findById(UUID id) {
        return studentRepository.findByIdAndDeletedAtIsNull(id)
                .map(studentMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno", id));
    }

    @Transactional
    public StudentResponse create(StudentRequest request) {
        Unit unit = unitRepository.findById(request.unitId())
                .orElseThrow(() -> new ResourceNotFoundException("Unidade", request.unitId()));

        Student student = Student.builder()
                .unit(unit)
                .name(request.name())
                .birthDate(request.birthDate())
                .cpf(request.cpf())
                .rg(request.rg())
                .photoUrl(request.photoUrl())
                .address(request.address())
                .city(request.city())
                .state(request.state())
                .zipCode(request.zipCode())
                .medicalNotes(request.medicalNotes())
                .medicalRestrictions(request.medicalRestrictions())
                .status(request.status() != null ? request.status() : "ACTIVE")
                .build();

        return studentMapper.toResponse(studentRepository.save(student));
    }

    @Transactional
    public StudentResponse update(UUID id, StudentRequest request) {
        Student student = studentRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno", id));

        Unit unit = unitRepository.findById(request.unitId())
                .orElseThrow(() -> new ResourceNotFoundException("Unidade", request.unitId()));

        student.setUnit(unit);
        student.setName(request.name());
        student.setBirthDate(request.birthDate());
        student.setCpf(request.cpf());
        student.setRg(request.rg());
        student.setPhotoUrl(request.photoUrl());
        student.setAddress(request.address());
        student.setCity(request.city());
        student.setState(request.state());
        student.setZipCode(request.zipCode());
        student.setMedicalNotes(request.medicalNotes());
        student.setMedicalRestrictions(request.medicalRestrictions());
        if (request.status() != null) student.setStatus(request.status());

        return studentMapper.toResponse(studentRepository.save(student));
    }

    @Transactional
    public void delete(UUID id) {
        Student student = studentRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno", id));
        student.setDeletedAt(LocalDateTime.now());
        studentRepository.save(student);
    }
}

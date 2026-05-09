package com.ntm.financeiro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(length = 14)
    private String cpf;

    @Column(length = 20)
    private String rg;

    @Column(name = "photo_url", length = 500)
    private String photoUrl;

    @Column(length = 255)
    private String address;

    @Column(length = 100)
    private String city;

    @Column(length = 2)
    private String state;

    @Column(name = "zip_code", length = 10)
    private String zipCode;

    @Column(name = "medical_notes", columnDefinition = "TEXT")
    private String medicalNotes;

    @Column(name = "medical_restrictions", columnDefinition = "TEXT")
    private String medicalRestrictions;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String status = "ACTIVE";

    @Column(name = "enrollment_date", nullable = false)
    @Builder.Default
    private LocalDate enrollmentDate = LocalDate.now();

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}

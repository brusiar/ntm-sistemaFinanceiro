package com.ntm.financeiro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "student_guardians")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentGuardian {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guardian_id", nullable = false)
    private Guardian guardian;

    @Column(nullable = false, length = 50)
    private String relationship;

    @Column(name = "is_financial_responsible", nullable = false)
    @Builder.Default
    private Boolean isFinancialResponsible = false;

    @Column(name = "is_pedagogical_responsible", nullable = false)
    @Builder.Default
    private Boolean isPedagogicalResponsible = false;

    @Column(name = "is_emergency_contact", nullable = false)
    @Builder.Default
    private Boolean isEmergencyContact = false;
}

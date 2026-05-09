package com.ntm.financeiro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "guardians")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guardian extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 14, unique = true)
    private String cpf;

    @Column(length = 150)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(name = "phone_alt", length = 20)
    private String phoneAlt;

    @Column(length = 255)
    private String address;

    @Column(length = 100)
    private String city;

    @Column(length = 2)
    private String state;

    @Column(name = "zip_code", length = 10)
    private String zipCode;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}

package com.ntm.financeiro.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "units")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Unit extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 18, unique = true)
    private String cnpj;

    @Column(length = 150)
    private String email;

    @Column(length = 20)
    private String phone;

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
}

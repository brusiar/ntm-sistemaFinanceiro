package com.ntm.financeiro.mapper;

import com.ntm.financeiro.dto.response.GuardianResponse;
import com.ntm.financeiro.entity.Guardian;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GuardianMapper {

    @Mapping(source = "unit.id", target = "unitId")
    @Mapping(source = "unit.name", target = "unitName")
    GuardianResponse toResponse(Guardian guardian);
}

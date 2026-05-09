package com.ntm.financeiro.mapper;

import com.ntm.financeiro.dto.response.StudentResponse;
import com.ntm.financeiro.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StudentMapper {

    @Mapping(source = "unit.id", target = "unitId")
    @Mapping(source = "unit.name", target = "unitName")
    StudentResponse toResponse(Student student);
}

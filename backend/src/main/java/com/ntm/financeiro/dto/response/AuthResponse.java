package com.ntm.financeiro.dto.response;

import java.util.List;

public record AuthResponse(
    String accessToken,
    String tokenType,
    Long expiresIn,
    String name,
    String email,
    List<String> roles
) {
    public AuthResponse(String accessToken, Long expiresIn, String name, String email, List<String> roles) {
        this(accessToken, "Bearer", expiresIn, name, email, roles);
    }
}

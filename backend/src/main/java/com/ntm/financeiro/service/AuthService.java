package com.ntm.financeiro.service;

import com.ntm.financeiro.dto.request.LoginRequest;
import com.ntm.financeiro.dto.response.AuthResponse;
import com.ntm.financeiro.entity.User;
import com.ntm.financeiro.security.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest request) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = (User) authentication.getPrincipal();

        String token = jwtService.generateToken(user);

        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName())
                .toList();

        return new AuthResponse(token, jwtService.getExpiration(), user.getName(), user.getEmail(), roles);
    }
}

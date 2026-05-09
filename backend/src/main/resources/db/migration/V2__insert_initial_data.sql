-- ============================================================
-- V2__insert_initial_data.sql
-- Dados iniciais: roles, unidade matriz e usuário admin
-- ============================================================

-- Roles do sistema
INSERT INTO roles (id, name) VALUES
    (uuid_generate_v4(), 'ADMIN'),
    (uuid_generate_v4(), 'SECRETARIA'),
    (uuid_generate_v4(), 'INSTRUTOR'),
    (uuid_generate_v4(), 'FINANCEIRO'),
    (uuid_generate_v4(), 'GESTOR_UNIDADE'),
    (uuid_generate_v4(), 'RESPONSAVEL');

-- Unidade Matriz
INSERT INTO units (id, name, email, active) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Matriz NTM', 'contato@ntm.com.br', TRUE);

-- Usuário Admin padrão
-- Senha: Admin@123 (BCrypt hash)
INSERT INTO users (id, unit_id, name, email, password, active, portal_type) VALUES
    ('00000000-0000-0000-0000-000000000002',
     '00000000-0000-0000-0000-000000000001',
     'Administrador',
     'admin@ntm.com.br',
     '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
     TRUE,
     'ADMIN');

-- Vincula admin ao role ADMIN
INSERT INTO user_roles (user_id, role_id)
SELECT '00000000-0000-0000-0000-000000000002', id
FROM roles WHERE name = 'ADMIN';

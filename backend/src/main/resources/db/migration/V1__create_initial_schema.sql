-- ============================================================
-- V1__create_initial_schema.sql
-- Schema inicial do sistema NTM - Escola Bombeiro Mirim
-- ============================================================

-- Extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- UNIDADES (multiunidade)
-- ============================================================
CREATE TABLE units (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(150) NOT NULL,
    cnpj        VARCHAR(18) UNIQUE,
    email       VARCHAR(150),
    phone       VARCHAR(20),
    address     VARCHAR(255),
    city        VARCHAR(100),
    state       VARCHAR(2),
    zip_code    VARCHAR(10),
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- USUÁRIOS E PERFIS
-- ============================================================
CREATE TABLE roles (
    id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE  -- ADMIN, SECRETARIA, INSTRUTOR, FINANCEIRO, GESTOR_UNIDADE, RESPONSAVEL
);

CREATE TABLE users (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id      UUID REFERENCES units(id),
    name         VARCHAR(150) NOT NULL,
    email        VARCHAR(150) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    phone        VARCHAR(20),
    active       BOOLEAN NOT NULL DEFAULT TRUE,
    portal_type  VARCHAR(20) NOT NULL DEFAULT 'ADMIN', -- ADMIN | RESPONSAVEL
    created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- ============================================================
-- RESPONSÁVEIS
-- ============================================================
CREATE TABLE guardians (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id      UUID REFERENCES users(id),  -- vínculo com login do portal
    unit_id      UUID NOT NULL REFERENCES units(id),
    name         VARCHAR(150) NOT NULL,
    cpf          VARCHAR(14) UNIQUE,
    email        VARCHAR(150),
    phone        VARCHAR(20),
    phone_alt    VARCHAR(20),
    address      VARCHAR(255),
    city         VARCHAR(100),
    state        VARCHAR(2),
    zip_code     VARCHAR(10),
    active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at   TIMESTAMP
);

-- ============================================================
-- ALUNOS
-- ============================================================
CREATE TABLE students (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id             UUID NOT NULL REFERENCES units(id),
    name                VARCHAR(150) NOT NULL,
    birth_date          DATE NOT NULL,
    cpf                 VARCHAR(14),
    rg                  VARCHAR(20),
    photo_url           VARCHAR(500),
    address             VARCHAR(255),
    city                VARCHAR(100),
    state               VARCHAR(2),
    zip_code            VARCHAR(10),
    medical_notes       TEXT,
    medical_restrictions TEXT,
    status              VARCHAR(20) NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, SUSPENDED
    enrollment_date     DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at          TIMESTAMP
);

CREATE TABLE student_guardians (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id              UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    guardian_id             UUID NOT NULL REFERENCES guardians(id) ON DELETE CASCADE,
    relationship            VARCHAR(50) NOT NULL,  -- PAI, MAE, AVO, TIO, etc.
    is_financial_responsible BOOLEAN NOT NULL DEFAULT FALSE,
    is_pedagogical_responsible BOOLEAN NOT NULL DEFAULT FALSE,
    is_emergency_contact    BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (student_id, guardian_id)
);

-- ============================================================
-- INSTRUTORES
-- ============================================================
CREATE TABLE instructors (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id      UUID NOT NULL REFERENCES units(id),
    user_id      UUID REFERENCES users(id),
    name         VARCHAR(150) NOT NULL,
    cpf          VARCHAR(14) UNIQUE,
    email        VARCHAR(150),
    phone        VARCHAR(20),
    specialties  TEXT,
    hourly_rate  NUMERIC(10,2),
    is_freelancer BOOLEAN NOT NULL DEFAULT FALSE,
    active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at   TIMESTAMP
);

-- ============================================================
-- CURSOS E TURMAS
-- ============================================================
CREATE TABLE courses (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id     UUID NOT NULL REFERENCES units(id),
    name        VARCHAR(150) NOT NULL,
    description TEXT,
    duration_hours INTEGER,
    price       NUMERIC(10,2),
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE classes (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id       UUID NOT NULL REFERENCES units(id),
    course_id     UUID NOT NULL REFERENCES courses(id),
    instructor_id UUID REFERENCES instructors(id),
    name          VARCHAR(150) NOT NULL,
    max_students  INTEGER NOT NULL DEFAULT 30,
    start_date    DATE,
    end_date      DATE,
    schedule_info VARCHAR(255),
    status        VARCHAR(20) NOT NULL DEFAULT 'OPEN', -- OPEN, IN_PROGRESS, FINISHED, CANCELLED
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MATRÍCULAS
-- ============================================================
CREATE TABLE enrollments (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id      UUID NOT NULL REFERENCES units(id),
    student_id   UUID NOT NULL REFERENCES students(id),
    class_id     UUID NOT NULL REFERENCES classes(id),
    enrolled_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    status       VARCHAR(20) NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, CANCELLED, COMPLETED
    UNIQUE (student_id, class_id)
);

-- ============================================================
-- AGENDA
-- ============================================================
CREATE TABLE schedules (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id       UUID NOT NULL REFERENCES units(id),
    class_id      UUID REFERENCES classes(id),
    instructor_id UUID REFERENCES instructors(id),
    title         VARCHAR(200) NOT NULL,
    description   TEXT,
    start_datetime TIMESTAMP NOT NULL,
    end_datetime   TIMESTAMP NOT NULL,
    type          VARCHAR(30) NOT NULL DEFAULT 'CLASS', -- CLASS, EVENT, EXTRA, MAKEUP
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PRESENÇA
-- ============================================================
CREATE TABLE attendance (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id       UUID NOT NULL REFERENCES units(id),
    schedule_id   UUID NOT NULL REFERENCES schedules(id),
    student_id    UUID NOT NULL REFERENCES students(id),
    present       BOOLEAN NOT NULL DEFAULT FALSE,
    notes         TEXT,
    recorded_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (schedule_id, student_id)
);

-- ============================================================
-- FINANCEIRO
-- ============================================================
CREATE TABLE invoices (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id         UUID NOT NULL REFERENCES units(id),
    student_id      UUID NOT NULL REFERENCES students(id),
    guardian_id     UUID REFERENCES guardians(id),
    description     VARCHAR(255) NOT NULL,
    amount          NUMERIC(10,2) NOT NULL,
    due_date        DATE NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, PAID, OVERDUE, CANCELLED
    payment_method  VARCHAR(20),  -- BOLETO, PIX, CREDIT_CARD
    paid_at         TIMESTAMP,
    asaas_id        VARCHAR(100),  -- ID externo no Asaas
    asaas_url       VARCHAR(500),  -- URL do boleto/pix
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE financial_transactions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id         UUID NOT NULL REFERENCES units(id),
    invoice_id      UUID REFERENCES invoices(id),
    type            VARCHAR(20) NOT NULL, -- INCOME, EXPENSE
    category        VARCHAR(50),
    description     VARCHAR(255) NOT NULL,
    amount          NUMERIC(10,2) NOT NULL,
    transaction_date DATE NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE instructor_payments (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id         UUID NOT NULL REFERENCES units(id),
    instructor_id   UUID NOT NULL REFERENCES instructors(id),
    period_start    DATE NOT NULL,
    period_end      DATE NOT NULL,
    hours_worked    NUMERIC(6,2),
    amount          NUMERIC(10,2) NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, PAID
    paid_at         TIMESTAMP,
    notes           TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- WEBHOOKS ASAAS
-- ============================================================
CREATE TABLE asaas_webhooks (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event        VARCHAR(100) NOT NULL,
    payload      TEXT NOT NULL,
    processed    BOOLEAN NOT NULL DEFAULT FALSE,
    received_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- NOTIFICAÇÕES
-- ============================================================
CREATE TABLE notifications (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id     UUID REFERENCES units(id),
    user_id     UUID REFERENCES users(id),
    title       VARCHAR(200) NOT NULL,
    message     TEXT NOT NULL,
    read        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- AUDITORIA
-- ============================================================
CREATE TABLE audit_logs (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES users(id),
    unit_id     UUID REFERENCES units(id),
    action      VARCHAR(100) NOT NULL,
    entity      VARCHAR(100),
    entity_id   UUID,
    details     TEXT,
    ip_address  VARCHAR(45),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ÍNDICES
-- ============================================================
CREATE INDEX idx_students_unit ON students(unit_id);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_guardians_unit ON guardians(unit_id);
CREATE INDEX idx_invoices_unit ON invoices(unit_id);
CREATE INDEX idx_invoices_student ON invoices(student_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_attendance_schedule ON attendance(schedule_id);
CREATE INDEX idx_schedules_unit ON schedules(unit_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_users_email ON users(email);

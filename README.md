# NTM Sistema Financeiro — Escola Bombeiro Mirim

Sistema web completo para gestão de escola de bombeiro mirim.

## Stack

| Camada    | Tecnologia                              |
|-----------|-----------------------------------------|
| Backend   | Java 21 + Spring Boot 3 + PostgreSQL    |
| Frontend  | Next.js 14 + React + TypeScript + Tailwind |
| Banco     | PostgreSQL 16                           |
| Auth      | JWT (Spring Security)                   |
| Infra     | Docker + Docker Compose                 |

---

## Executar localmente (sem Docker)

### Pré-requisitos
- Java 21
- Maven 3.9+
- Node.js 20+
- PostgreSQL 16 rodando localmente

### Backend

```bash
cd backend
cp ../.env.example .env   # ajuste as variáveis se necessário
mvn spring-boot:run
```

A API sobe em: http://localhost:8080  
Swagger UI: http://localhost:8080/swagger-ui.html

### Frontend

```bash
cd frontend
npm install
cp ../.env.example .env.local
npm run dev
```

O frontend sobe em: http://localhost:3000

### Credenciais padrão

| Campo | Valor             |
|-------|-------------------|
| Email | admin@ntm.com.br  |
| Senha | Admin@123         |

---

## Executar com Docker Compose

```bash
# Na raiz do projeto
docker compose up --build
```

Serviços disponíveis:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html
- PostgreSQL: localhost:5432

Para parar:
```bash
docker compose down
```

Para parar e remover volumes (apaga o banco):
```bash
docker compose down -v
```

---

## Estrutura do Projeto

```
ntm-sistemaFinanceiro/
├── backend/                    # Spring Boot
│   ├── src/main/java/com/ntm/financeiro/
│   │   ├── config/             # SecurityConfig, OpenApiConfig, JpaConfig
│   │   ├── controller/         # AuthController, StudentController, GuardianController
│   │   ├── dto/                # request/ e response/
│   │   ├── entity/             # Entidades JPA
│   │   ├── exception/          # GlobalExceptionHandler, exceções customizadas
│   │   ├── mapper/             # MapStruct mappers
│   │   ├── repository/         # Spring Data JPA repositories
│   │   ├── security/           # JwtService, JwtAuthenticationFilter, UserDetailsServiceImpl
│   │   └── service/            # AuthService, StudentService, GuardianService
│   └── src/main/resources/
│       ├── application.yml
│       └── db/migration/       # Flyway migrations
├── frontend/                   # Next.js
│   └── src/
│       ├── app/                # App Router (pages)
│       ├── components/         # UI e layout
│       ├── contexts/           # AuthContext
│       ├── hooks/              # React Query hooks
│       ├── lib/                # axios, utils
│       ├── services/           # Chamadas à API
│       └── types/              # Tipos TypeScript
├── docker-compose.yml
├── .env.example
└── .gitignore
```

---

## Evoluir para Cloud

### AWS

1. **ECS Fargate** — suba as imagens Docker no ECR e crie tasks no ECS
2. **RDS PostgreSQL** — substitua `DB_URL` pela connection string do RDS
3. **S3** — para armazenar fotos dos alunos (adicionar `spring-cloud-aws-s3`)
4. **CloudFront** — CDN na frente do frontend (deploy no S3 ou ECS)
5. **Secrets Manager** — substitua variáveis sensíveis por referências ao Secrets Manager

### Azure

1. **App Service** — deploy das imagens Docker diretamente
2. **Azure Database for PostgreSQL** — substitua a connection string
3. **Blob Storage** — para arquivos e fotos
4. **Azure CDN** — na frente do frontend

### Dicas gerais para produção

- Troque `JWT_SECRET` por um valor forte (mínimo 256 bits)
- Use `SPRING_PROFILES_ACTIVE=prod` e crie `application-prod.yml`
- Configure `show-sql: false` e logs estruturados (JSON)
- Habilite HTTPS (TLS) no load balancer ou proxy reverso
- Use variáveis de ambiente ou secrets manager para credenciais

---

## Próximos módulos a implementar

- [ ] Gestão de Instrutores
- [ ] Gestão de Turmas e Matrículas
- [ ] Controle de Presença
- [ ] Módulo Financeiro (Invoices + Asaas)
- [ ] Portal do Responsável
- [ ] Agenda Escolar
- [ ] Dashboard com gráficos (Recharts)
- [ ] Notificações e Comunicados
- [ ] Relatórios e Exportação PDF

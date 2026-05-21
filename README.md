# Distionary

System zarządzania słownikami.

## Stack

| Warstwa     | Technologia                                              |
|-------------|----------------------------------------------------------|
| Frontend    | React 19 + TypeScript + Vite                             |
| Backend     | Spring Boot 4 + Java 21 (Maven)                          |
| Baza danych | PostgreSQL 17 (docelowo + ELK / NoSQL dla wyszukiwania)  |
| Migracje    | Flyway                                                   |

## Struktura repo

```
.
├── frontend/           # Aplikacja React + Vite (port 5173)
├── backend/            # Spring Boot REST API (port 8080)
├── design-reference/   # Hi-Fi prototyp (static HTML + Babel-in-browser) — wyłącznie referencja
├── docker-compose.yml  # PostgreSQL dla deweloperki
└── README.md
```

## Szybki start

### 1. Baza danych

```bash
docker compose up -d postgres
```

Postgres słucha na `localhost:5432`, db/user/hasło: `distionary` / `distionary` / `distionary`.

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run        # lub: mvn spring-boot:run
```

API dostępne pod `http://localhost:8080/api/health`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

UI: `http://localhost:5173`. Dev proxy przekazuje `/api/*` na `localhost:8080`.

### 4. Design reference

```bash
cd design-reference
python3 -m http.server 8000   # otwórz http://localhost:8000
```

Statyczny prototyp, **nie jest częścią builda** — patrz `design-reference/README.md`.

## Konwencje

- **Branch deweloperski:** `claude/eager-cannon-claiw` (zmiany lądują tutaj)
- **Migracje:** każda nowa migracja jako `backend/src/main/resources/db/migration/V<n>__<opis>.sql`
- **API prefix:** `/api/*`
- **Env vars backendu:** `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` (defaulty pasują do `docker-compose.yml`)

# 🎬 Movies & Actors Service

A Node.js service that fetches and manages movies, actors, and character relationships using **PostgreSQL**.  
Supports endpoints for:
- Movies per actor
- Actors with multiple characters
- Characters with multiple actors

---

## 🛠 Prerequisites

- Node.js >= 22  
- Docker (for PostgreSQL)  
- `npm`  

---

## ⚡ Setup

### 1. Clone the repository

```bash
git clone https://github.com/Oren-Homri/marvel-movies-home-task
cd marvel-movies-home-task
```

### 2. Create `.env` file

Create a `.env` file in the project root:

```env
PORT=3000

# TMDB API
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_tmdb_api_key

# PostgreSQL
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
POSTGRES_PORT=5432
```

---

### 3. Start PostgreSQL using Docker

```bash
docker run --name movies-postgres -e POSTGRES_USER=${POSTGRES_USER} \
  -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
  -e POSTGRES_DB=${POSTGRES_DB} \
  -p ${POSTGRES_PORT}:5432 -d postgres
```

> This will start a PostgreSQL container accessible on `localhost:5432`.

---

### 4. Install dependencies

```bash
npm install
```

---

### 5. Initialize the database

Run the provided SQL script using the `psql` CLI to create all necessary tables:

```bash
psql -U POSTGRES_USER -h localhost -p POSTGRES_PORT -d POSTGRES_DB -f db/init/db_schema_init.sql
```

> Replace `POSTGRES_USER`, `POSTGRES_PORT`, and `POSTGRES_DB` with your `.env` values.

---

## 🚀 Running the server

```bash
npm start
```

By default, it will run on `http://localhost:${PORT}`. The app will automatically seed the database on startup.

---

## 🧪 Running Tests

We are using **Jest**. To run tests:

```bash
npm test
```

This will run all unit tests for services and DAL, mocking database queries.

---

## 📡 API Endpoints

### 1. [GET] `/moviesPerActor`

Returns a list of movies per actor:

**Request:**

```bash
curl "http://localhost:3000/moviesPerActor"
```

**Response:**

```json
{
  "Robert Downey Jr.": ["Iron Man", "Avengers", "Sherlock Holmes"]
}
```

---

### 2. [GET] `/actorsWithMultipleCharacters`

Returns actors who played more than one character:

**Request:**

```bash
curl "http://localhost:3000/actorsWithMultipleCharacters"
```

**Response:**

```json
{
  "Ryan Reynolds": [
    { "movieName": "Deadpool", "characterName": "Deadpool" },
    { "movieName": "Green Lantern", "characterName": "Green Lantern" }
  ]
}
```

---

### 3. [GET] `/charactersWithMultipleActors`

Returns characters played by multiple actors:

**Request:**

```bash
curl "http://localhost:3000/charactersWithMultipleActors"
```

**Response:**

```json
{
  "Spider-Man": [
    { "movieName": "Spider-Man", "actorName": "Tobey Maguire" },
    { "movieName": "The Amazing Spider-Man", "actorName": "Andrew Garfield" },
    { "movieName": "Spider-Man: Homecoming", "actorName": "Tom Holland" }
  ]
```

---

## ⚠️ Troubleshooting & Tips

### 1. PostgreSQL / Docker issues
- **Container not running**:  
  ```bash
docker ps
docker start movies-postgres
```  
- **Cannot connect to DB**:  
  - Check `.env` values (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT`)  
  - Ensure Docker container exposes the correct port: `-p 5432:5432`  

### 2. Missing tables or seed issues
- **Tables not found**: Run the SQL initialization script using the `psql` CLI:

```bash
psql -U POSTGRES_USER -h localhost -p POSTGRES_PORT -d POSTGRES_DB -f db/init/db_schema_init.sql
```

- If you change table structure, drop & recreate tables:

```sql
DROP TABLE IF EXISTS actors_in_movies, actors, movies CASCADE;
```

### 3. TMDB API errors
- Ensure `TMDB_API_KEY` in `.env` is valid.  
- Check `TMDB_BASE_URL` is correct: `https://api.themoviedb.org/3`  
- If rate-limited, wait a few seconds and retry.

### 4. Jest / ESM issues
- If you get `Cannot use import statement outside a module`, ensure:
  - `"type": "module"` in `package.json`  
  - `babel.config.js` exists with `@babel/preset-env`  
  - `jest.config.js` transforms `.js` files using `babel-jest`  

### 5. Common Sequelize issues
- **“ON CONFLICT” errors**: make sure your table has proper unique or primary key constraints.  
- **Foreign key errors**: ensure parent records exist before inserting child records (e.g., `Actors` before `ActorsInMovies`).  

### 6. Logs & Debugging
- All service errors are logged using `console.error`  
- You can increase verbosity by wrapping calls in `try/catch` during local testing.

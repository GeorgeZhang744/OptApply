# Application Service

Handling CRUD operations for job apps in the system

---

### Important Notes
Make sure to run in OptApply/services/applications" folder

Ensure Docker is running and the .env file is setup in ./services/applications:

```env
DATABASE_URL=postgres://user:password@localhost:5432/optapply
```

---

### 1. install dependencies and run server
```bash
npm install
npm run dev
```

### 2. Run docker service
```bash
docker compose up --build
```

### 3a. To create the PostgreSQL table (only required for first time)
```bash
docker exec -it optapply-db psql -U user -d optapply
```
### 3b. Then run the following SQL:
```sql
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  status TEXT NOT NULL,
  application_url TEXT,
  deadline DATE,
  work_location TEXT,
  min INTEGER,
  max INTEGER,
  fixed INTEGER,
  job_description TEXT,
  skills TEXT,
  note TEXT
);
```
# Application service will be running at http://localhost:3100/applications

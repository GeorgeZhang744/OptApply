# Calendar Service

Handling CRUD operations for calendar in the system

---

### Important Notes
Make sure to run in OptApply/services/calendar" folder

Ensure Docker is running and the .env file is setup in ./services/calendar:

```env
DATABASE_URL=postgres://user:password@localhost:5432/optapply
```

---
### Run Locally
```bash
npm run dev
```

### Build Docker Image
```bash
docker build -t calendar .
```

### Run Docker Image
```bash
docker run -p 3003:3003 calendar
```
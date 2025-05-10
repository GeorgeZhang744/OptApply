### Setup Instructions

## Important Note: Follow steps in /services/auth/README.md first
## After following steps in auth README.md:
cd into application service and run
```
npm install
```

# Setup applications table in same local db
Under the same local postgres db, create an application table:
```
CREATE TABLE IF NOT EXISTS applications (
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

# Create env file in /services/applications/
in the application service folder, create a .env file:
```
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
```

# Testing signing up, logging in, adding application, viewing applications
Run the gateway, auth service, application service, the client, and the db.
sign up with an email and password
check db to see newly made account
add an application
application should be visible and listed
logout, log back in, application should still be there

***NOTE*** implementation is not fully complete, currently only adding and viewing the applications are working, and refreshing the page breaks the service as the JWT is not being saved upon refresh.
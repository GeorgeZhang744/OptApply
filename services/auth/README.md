## Setup Instructions
First cd into the auth service folder and run 
```
npm install
```


## Create Local DB (postgres)
Set up a local db in postgres (I recommend using PGAdmin) and create a users table using the following query:
```
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);
```


## Set up env file
```
DATABASE_URL=postgresql://<username>:<password>@<hostName>:<port>/<databaseName>
PORT=XXXX
```
If using pgAdmin, you can access all the necessary information to set up the database url by right clicking on the server you are using and clicking properties. 


## Testing Sign Up Functionality

- Run the client, gateway service, and auth service
- Create account
-Check db to see newly added account

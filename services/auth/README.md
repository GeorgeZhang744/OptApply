## Setup Instructions
First cd into the auth service, the gateway service, and the client folder and run 
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


## Create / set up env file
Create the following env file in the auth folder
```
DATABASE_URL=postgresql://<username>:<password>@<hostName>:<port>/<databaseName>
PORT=3001
JWT_SECRET=<your-generated-jwt-secret-key>
```
If using pgAdmin, you can access all the necessary information to set up the database url by right clicking on the server you are using and clicking properties. 


## Testing Sign Up / Sign in Functionality

- Run the client, gateway service, auth service, and local db you are connecting to
- Create account
- Check db to see newly added account
- You can now sign in with the newly created account

***NOTE*** On some builds running npm start:all will not work due to undergoing development of other services. To check this functionality out on its own, you can just run the client (cd into client then run npm run:client), gateway service (cd into gateway folder and run npm run build, npm run start), and auth service (cd into auth folder and run npm run build, npm run start). Running these three simultaneously will allow you to test this feature.
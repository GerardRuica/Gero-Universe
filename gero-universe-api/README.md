# Gero Universe Api

## Start server

`npx ts-node src/index.ts`

## Docker

Build image: `docker build . -t gero-universe-api:latest`

Run container: `docker run -d --name gero-universe-api-container -p 3000:3000/tcp gero-universe-api:latest`

## Create an .env file

Create .env file on srd and add:

```
JWT_SECRET=""
PORT=""
SERVER_ROUTE=""
FRONT_END_HOST=""
GERO_UNIVERSE_DB_CONNECTION=""
YOUR_CHEF_DB_CONNECTION=""
```

- JWT_SECRET: secret of the jason web token
- PORT: port of the server
- SERVER_ROUTE: route of the server. Example: "http://localhost:"
- FRONT_END_HOST: url of the frontend
- GERO_UNIVERSE_DB_CONNECTION: url of the connection to gero universe db
- YOUR_CHEF_DB_CONNECTION: url of the connection to your chef db

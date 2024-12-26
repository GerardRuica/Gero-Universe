# Gero Universe Api

## Start server

`npx ts-node src/index.ts`

## Docker

Build image: `docker build . -t gero-universe-api:latest`

Run container: `docker run -d --name gero-universe-api-container -p 3000:3000/tcp gero-universe-api:latest`

## Create an .env file

On .env file we have to add "JWT_SECRET" var to assign JWD secret

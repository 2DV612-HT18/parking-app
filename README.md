# 2DV612-Team2
# Environment file
The file **.env.dev.local** in the root of the project needs to have the following variables:


```env
# DB CONFIG
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=postgres

# REDIS CONFIG
REDIS_PORT=6379
REDIS_HOST=redis

# NODEMAILER CONFIG
NODEMAILER_USER=
NODEMAILER_PASSWORD=

# BASE URL
SITE_BASE_URL=http://localhost:8080

#GOOGLE MAPS API
VUE_APP_GOOGLE_MAPS_API=

#ADMIN CREATION
ADMIN_PASSWORD=
```
# How to run

## Start backend, frontend and db:
```docker
docker-compose up
```
or
```docker
docker-compose up -d
```
to run the services in the background.

To see if anything is running, enter:
```docker
docker-compose ps
```

If the backend or frontend does not start because of missing npm packages, run:
```docker
docker-compose down
docker-compose build --no-cache
docker-compose up
```

Backend will be found at: [http://localhost:4000](http://localhost:4000)

Frontend will be found at: [http://localhost:8080](http://localhost:8080)

Adminer will be found at: [http://localhost:8081](http://localhost:8081)


### Logs
To see logs when running in background enter:
```docker
docker-compose logs -f SERVICE
```
where SERVICE is backend, frontend or db. Can be left blank to show all logs. 

## Install packages
```docker
docker-compose exec SERVICE npm install PACKAGE
```
where SERVICE is backend or frontend and PACKAGE is the desired package.

## Run tests/lint
### Backend
```docker
docker-compose exec backend npm run test
```
### Frontend
```docker
docker-compose exec frontend npm run test:unit
```
### Linting
```docker
docker-compose exec SERVICE npm run lint
```
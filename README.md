# 2DV612-Team2

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
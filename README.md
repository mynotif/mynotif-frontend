# MyNotif Frontend

[![Tests](https://github.com/issa-diallo/mynotif_frontend/actions/workflows/tests.yml/badge.svg)](https://github.com/issa-diallo/mynotif_frontend/actions/workflows/tests.yml)

Frontend for MyNotif: Patient management app for nurses.
- https://mynotif.herokuapp.com/
- https://mynotif.vercel.app/

Backend is available via:
<https://github.com/issa-diallo/Mynotif_backend>

## Install
```sh
yarn install
```

## Run
```sh
yarn dev
```
Optionally you can copy the `.env.example` to `.env.local` to override some settings.

## Test
```sh
yarn test
yarn lint
```

## Docker
Build:
```sh
docker build --tag issa-diallo/mynotif-frontend .
```
Run:
```sh
docker run --rm -it --publish 3000:80 issa-diallo/mynotif-frontend
```

## Deploy to Heroku
```sh
git push heroku main
```

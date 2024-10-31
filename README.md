# MyNotif Frontend

[![Tests](https://github.com/mynotif/mynotif-frontend/actions/workflows/tests.yml/badge.svg)](https://github.com/mynotif/mynotif-frontend/actions/workflows/tests.yml)

Frontend for MyNotif: Patient management app for nurses mobile first only.
- https://www.ordopro.fr/

Backend is available via:
<https://github.com/mynotif/mynotif-backend>

## Install
```sh
npm ci
```

## Run
```sh
npm run dev
```
Optionally you can copy the `.env.example` to `.env.local` to override some settings.

## Test
```sh
npm run test
npm run lint
```

## Docker
Build:
```sh
docker build --tag mynotif/mynotif-frontend .
```
Run:
```sh
docker run --rm -it --publish 3000:80 mynotif/mynotif-frontend
```

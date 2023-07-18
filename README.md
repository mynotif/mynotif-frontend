# MyNotif Frontend

[![Tests](https://github.com/mynotif/mynotif-frontend/actions/workflows/tests.yml/badge.svg)](https://github.com/mynotif/mynotif-frontend/actions/workflows/tests.yml)

### Patient management app for nurses.

Backend is available via:
<https://github.com/mynotif/mynotif-backend>

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
docker build --tag mynotif/mynotif-frontend .
```
Run:
```sh
docker run --rm -it --publish 3000:80 mynotif/mynotif-frontend
```

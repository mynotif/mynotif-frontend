# MyNotif Frontend

Frontend for MyNotif: Patient management app for nurses.

Backend is available via:
<https://github.com/issa-diallo/Mynotif_backend>

## Install
```sh
yarn install
```

## Run
```sh
yarn start
```

## Test
```sh
yarn test
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

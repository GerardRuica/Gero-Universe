# Gero universe app

## Create environments files

On src create a folder named environments and create environment.ts with:

```
export const environment = {
  API_URL: '',
};

```

## To execute in dev mode

1. `npm start`

## To compile and execute (prod mode)

1. `ng build --configuration=production`
2. `serve -s .\dist\gero-universe-app\ -l 4200`

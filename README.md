# NG Spotify

## Running Angular App for Development (port 4201, watches file changes)

> This serves the Angular app without the need to re-build each time a file is saved. Some API requests will use a proxy config file to point to the running Express server.

```
cd ng-spotify-ui
npm install
npm run serve
```

## Installing Dependencies & Building the Angular App

```
cd ng-spotify-ui
npm install
ng build --prod
```

## Installing Dependencies for Express Server

Back in project directory, install the dependencies for the Express server.

```
npm install
```

## Running the Express Server

- Run `node index.js`.
- Navigate your browser to [http://localhost:4200/](http://localhost:4200/) to see the application running.

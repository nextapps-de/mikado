# TodoMVC App

This app is based on https://todomvc.com and contains an implementation of it.

This example also demonstrate how to basically run local development environment and make production builds.

Go into this folder ___examples/todomvc/___ and install the dependencies from the command line:
```bash
npm install
```

Compile templates:
```bash
npm run compile
```

Start Webserver:
```bash
npm run server
```

Open your browser and go to the URL displayed in the console: <a href="http://localhost:8080/src/">http://localhost:8080/src/</a>

Build App:
```bash
npm run build
```

Run the build: <a href="http://localhost:8080/dist/">http://localhost:8080/dist/</a>

Start a file watcher (in a new console tab) to automatically compile templates when changed:
```bash
npm run dev
```

I need some help for the test automation setup. I would like to use the intern test framework, but I have some issues:

- intern automation doesn't run out of the box, it needs to manually install a puppeteer chrome instance and apply this as browser engine in settings
- I couldn't find a proper way to run browser tests via Node.js by the intern framework, since I need full access to the DOM (a message channel isn't enough)
- Alternatively intern provides a browser engine, but this can't be integrated into automation, also no coverage report is available for the browser engine

## Run Tests

Although there are some automation issues explained above running tests manually is pretty easy and well-supported.

### Basic Setup

From the root folder of Mikado move to the test folder and install the dependencies:

```bash
cd test
npm install
```

### Browser

Run the local server:

```bash
npm run server
```

Open the link from the command line message in your browser http://localhost:8080.

A page will open up including a report of a full test cycle.

### Node.js (SSR)

... not available yet

## Test Coverage

It needs Java to be installed and also the file `JSCover-all.jar` put into the root of this test directory. You get the jar file here: https://tntim96.github.io/JSCover/

Stop any other local server instance when running (e.g. the test server from above). 

Run the local server:

```bash
npm run coverage
```

Open the link from the command line message in your browser http://localhost:8080/jscoverage.html?test/index.html

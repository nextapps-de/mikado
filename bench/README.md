# Benchmark of Web Templating Engines

This stress test is based on a __real life use case__, where new data is coming from a source and should be rendered through a template. The different to other benchmark implementations is, that the given task is not known before the data was available. It measures the workload of a real use case.

Go to the folder ___bench___ and install dependencies:
```cmd
npm install
```

Start local webserver:
```cmd
npm run server
```

Go to the URL which displays in the console, e.g. _http://localhost_. The tests will start automatically. Results may differ through various browsers and OS.

The maximum possible score is 1000, that requires a library to be best in each category.

## How this benchmark work

Basically each framework provide one public method, which handles and render the incoming data, e.g.:

```js
suite["domc"] = function(items){
    scope.items = items;
    root.update(scope);
};
```

or

```js
suite["sinuous"] = function(items){
    data(items);
};
```

The data is unknown, the library do not know if data was added, removed, updated or stay unchanged before it gets the data. That's the main different to other benchmark implementations, where a programmer can iteratively solve a problem to a known task.

Regardless the function is doing, every test has to run through the same logic.
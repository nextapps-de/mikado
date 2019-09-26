# Benchmark of Web Templating Engines

Run the benchmark:<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/index.html">https://raw.githack.com/nextapps-de/mikado/master/bench/index.html</a><br>

This stress test is based on a __real life use case__, where new data is coming from a source and should be rendered through a template. The different to other benchmark implementations is, that the given task is not known before the data was available. It measures the workload of a real use case.

This test measures the raw rendering performance. If you look for a benchmark which covers more aspects goto here:<br>
https://krausest.github.io/js-framework-benchmark/current.html

#### Local Installation

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

#### Test Requirement
Each library should use at least its own features to change DOM. A test implementation should not include something like `node.nodeValue = "..."` or `node.className = "..."`.

## About precision
It is not possible to provide stable browser measuring. There are so many factors which has an impact of benchmarking that it makes no sense in trying to make "synthetic" fixes on things they cannot been fixed. For my personal view the best benchmark just uses the browser without any cosmetics. That comes closest to the environment a user have on the application.

That all just become more important when doing micro-benchmarking. But this test do not perform micro-benchmarking. The workload is big enough to produce good stable results. Tests where shuffled before start, so you can proof by yourself that values of course differ from one run to another, but produce close to linear results. So it is statistically proofed. There is absolutely no need for using benchmark.js especially for this workload.
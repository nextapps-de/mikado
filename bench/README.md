# Benchmark of Web Templating Engines

Run the benchmark (non-keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/">https://raw.githack.com/nextapps-de/mikado/master/bench/</a><br>

Run the benchmark (keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/?keyed">https://raw.githack.com/nextapps-de/mikado/master/bench/?keyed</a><br>

Run the benchmark (strict non-reusing):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/?strict">https://raw.githack.com/nextapps-de/mikado/master/bench/?strict</a><br>

This stress test focuses a real life use case, where new data is coming from a source and should be rendered through a template. The different to other benchmark implementations is, that the given task is not known before the data was available. It measures the workload of a real use case.

This test measures the raw rendering performance. If you look for a benchmark which covers more aspects goto here:<br>
https://krausest.github.io/js-framework-benchmark/current.html

#### Local Installation

Go to the folder _bench/_ and install dependencies:
```cmd
npm install
```

Start local webserver:
```cmd
npm run server
```

Go to the URL which displays in the console, e.g. _http://localhost_. The tests will start automatically. Results may differ through various browsers and OS.

#### Score
The score is calculated in relation to the median value of each test. That will keeping the benchmark factor between each library effectively but also vary relationally when new libraries were added.

<code>Score = (SQRT(median_kb / lib_kb) + Sum<sub>test</sub>(lib_ops / median_ops)) / test_count * 1000</code>

#### Index
The score index is a close to "static" representation where each score references to a specific place in a ranking table. The maximum possible score and also the best place is 1000, that requires a library to be best in each category (regardless of how much better the factor is, that's the difference to the score value).

<code>Index = (SQRT(min_kb / lib_kb) + Sum<sub>test</sub>(lib_ops / max_ops)) / test_count * 1000</code>

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

#### About requirements for tested libraries
Each library should provide at least its own features to change DOM. A test implementation should not force to implement something like `node.nodeValue = "..."` or `node.className = "..."` by hand. Also asynchronous/scheduled rendering is not allowed.

The keyed test requires a largely non-reusing paradigm. When a new item comes from the outside, the library does not reusing nodes.

#### About the test environment

This test also covers runtime optimizations of each library which is very important to produce meaningful benchmark results. The goal is to get closest to a real environment.

That's basically the main difference to other tests<!-- like <a href="https://krausest.github.io/js-framework-benchmark/current.html">this</a>-->. Other benchmarks may re-loading the whole page/application after every single test loop. This would be a good step away from a real environment and also cannot cover one of the biggest strength of Mikado which is based on several runtime optimizations.

#### About median values
Using the median value is very common to normalize the spread in results in a statistically manner. But using the median for benchmarking, especially when code runs through a VM, the risk is high that the median value is getting back a false result. One of the most factors which is often overseen is the run of the garbage collector, which costs a significantly amount of time. A benchmark which is based on median results will effectively cut out the garbage collector and may produce wrong results. A benchmark based on a best run will absolutely cut off the garbage collector.

This test implementation just using a median to map the results into a normalized scoring index. The results are based on the full computation time (btw that also comes closest to a real environment).

#### About benchmark precision
It is not possible to provide stable browser measuring. There are so many factors which has an impact of benchmarking that it makes no sense in trying to make "synthetic" fixes on things they cannot been fixed. For my personal view the best benchmark just uses the browser without any cosmetics. That comes closest to the environment a user have on the application.

That all just become more important when doing micro-benchmarking. But this test do not perform micro-benchmarking. The workload is big enough to produce good stable results. Tests where shuffled before start, so you can proof by yourself that values of course differ from one run to another, but produce close to linear results. So it is statistically proofed. There is absolutely no need for using benchmark.js especially for this workload (using it will change nothing).
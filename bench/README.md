# Benchmark of Template Rendering

The most important of all rules: Don't trust any benchmark, they may wrong. This is probably (!) the best benchmark comparison of raw templating rendering performance you will find in the web. Please read <a href="#details">the sections below</a> which explains why.

If you see any improvement, weather it is too less important or not, please open an issue (after you have fully read this page). I want to make sure to provide a real and fair situation in all cases.

Run the benchmark (non-keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/">https://raw.githack.com/nextapps-de/mikado/master/bench/</a><br>

Run the benchmark (keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/?keyed">https://raw.githack.com/nextapps-de/mikado/master/bench/?keyed</a><br>

Run the benchmark (keyed, internal/data-driven):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/?internal">https://raw.githack.com/nextapps-de/mikado/master/bench/?internal</a><br>

<table>
    <tr>
        <td>non-keyed</td>
        <td>In this mode all existing nodes could be reused.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>keyed</td>
        <td>In this mode just existing nodes with the same key (ID) could be reused/re-arranged.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>keyed&nbsp;(internal)</td>
        <td>This mode runs through the same internal pool of data (same references, no new data from external or by creation) and compares the performance of data-driven paradigm when internal state changes.</td>
    </tr>
</table>

Comming soon: A new test section which measures the change of internal data changes instead of process newly created or external fetched data.

#### Test goal
This stress test focuses a real life use case, where new data is coming from a source (e.g. from a server or by creation during runtime) and should be rendered through a template. The different to other benchmark implementations is, that the given task is not known before the data was available. It measures the workload of a real use case.

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

<code>Score = Sum<sub>test</sub>(lib_ops / median_ops) / test_count * 1000</code>

The file size and memory gets less relevance by applying the square root of these values.

#### Index
The score index is a close very stable non-relational representation where each score references to a specific place in a ranking table. The maximum possible score and also the best place is 1000, that requires a library to be best in each category (regardless of how much better the factor is, that's the difference to the score value).

<code>Index = Sum<sub>test</sub>(lib_ops / max_ops) / test_count * 1000</code>

The file size and memory gets less relevance by applying the square root of these values.

## Tests
<table>
    <tr></tr>
    <tr>
        <td>Test</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>KB</td>
        <td>The size of the library. This value has less relevance to the score calculation (uses square root).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>RAM</td>
        <td>The amount of memory which was allocated through the whole test (memory per cycle). This value also has less relevance to the score calculation (uses square root).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Create</td>
        <td>The creation of 100 elements from blank.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Replace</td>
        <td>The replacement of 100 new elements over 100 existing elements.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Update</td>
        <td>Toggles between:<br>1. shuffle item indexes (all contents stay unchanged)<br>2. update content fields of every nth item (order of items stay unchanged)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Arrange</td>
        <td>Toggles between:<br>1. Move first items to the end<br>2. move last item to the start<br>3. toggle seconds and fore-last items<br>4. re-arrange (4 ordered groups)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Repaint</td>
        <td>Render same items in the same order.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Remove</td>
        <td>The remove of 50 items from a list of 100.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>Append</td>
        <td>Append 50 new items to a list of 50 existing.</td>
    </tr>   
    <tr></tr>
    <tr>
        <td>Toggle</td>
        <td>Toggles between "Remove" and "Append" (test for optimizations like: pagination, folding, resizing).</td>
    </tr>  
    <tr></tr>
    <tr>
        <td>Clear</td>
        <td>Remove all items of a list of 100 existing.</td>
    </tr>  
</table>

<a name="details"></a>
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

The data is unknown, the library does not know if data was added, removed, updated or stay unchanged before it gets the data. That's the main different to other benchmark implementations, where a programmer can iteratively solve a problem to a known task.

Regardless the function is doing, every test has to run through the same logic.

#### Random item factory

The items were created by a random factory. To be fair the items comes from a pre-filled pool (5 slots a 100 items), so that keyed libraries get a chance to match same IDs. Also that comes closer to real use cases, because an application normally should no load unlimited new data.

Also the items has some fields, which aren't included by the template. That is also important, because in real live this situation is the most common. Most other benchmarks just provide data which is consumed by the template.

#### Mimic data from a server or created during runtime

Since these benchmark try to get close to a real live situation, the items will be cloned before every test to mimic a fresh fetch from the server or the creation of a new items during runtime. Each test has a very specific job, so there are tests, where new data is coming from the outside but content stay unchanged, or IDs still remain (just important for keyed modes).

Many of other tests around, will do not fully clone objects, and those benchmarks will provide really wrong results when they try to compare the performance of incoming data (most of them just compares the process of already existing data).

#### Dedicated sandbox

Each test suite runs in its own dedicated sandbox through an iframe. This is reducing noise from externals to a minimum.

#### Hidden render target

You may see benchmarks which draws the rendering visible to the users screen. It depends on what is the desired part to benchmark. This benchmark will just cover the raw time of applied re-calculations (creation/updating/removing of elements), the time the browser takes to make them visible is:

1. no part of this test
2. not relevant, because this time is almost not influenced by the library
3. introduce unnecessary distortion to the test

#### About requirements for tested libraries
1. Each library should provide at least its own features to change DOM. A test implementation should not force to implement something like `node.nodeValue = "..."` or `node.className = "..."` by hand.
This test is benchmarking library performance and not the performance made by an implementation of a developer. That is probably the biggest different to other benchmark tests.

2. Also asynchronous/scheduled rendering is not allowed.

3. The keyed test requires a largely non-reusing paradigm. When a new item comes from the outside, the library does not reusing nodes (on different IDs).

#### About the test environment

This test also covers runtime optimizations of each library which is very important to produce meaningful benchmark results. The goal is to get closest to a real environment.

That's also a difference to other tests. Other benchmarks may re-loading the whole page/application after every single test loop. This would be a good step away from a real environment and also cannot cover one of the biggest strength of Mikado which is based on several runtime optimizations.

#### About median values
Using the median value is very common to normalize the spread in results in a statistically manner. But using the median as benchmark samples, especially when code runs through a VM, the risk is high that the median value is getting back a false result. One of the most factors which is often overseen is the run of the garbage collector, which costs a significantly amount of time and runs randomly. A benchmark which is based on median results will effectively cut out the garbage collector and may produce wrong results. A benchmark based on a best run will absolutely cut off the garbage collector.

This test implementation just using a median to map the results into a normalized scoring index. The results are based on the full computation time including the full run of the garbage collector. That also comes closest to a real environment.

#### About benchmark precision
It is not possible to provide absolute stable browser measuring. There are so many factors which has an impact of benchmarking that it makes no sense in trying to make "synthetic" fixes on things they cannot been fixed. Also every synthetic change may lead into wrong results and false interpreting. For my personal view the best benchmark just uses the browser without any cosmetics. That comes closest to the environment of an user who is using an application.

That all just become more complex when doing micro-benchmarking. Luckily this workload is by far big enough to produces stable results. Tests where shuffled before start, so you can proof by yourself that values of course differ from one run to another, but produce very stable results. Especially the ___index___ row provides you one of the most stable ranking indexes (the more stable a test is the more meaningful it is). There is absolutely no need for using benchmark.js especially for this workload, also it absolutely does not fit into a real live environment. No place for statistical nonsense, this isn't politics.
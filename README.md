<h1><img src="https://cdn.jsdelivr.net/gh/nextapps-de/mikado@master/doc/mikado.svg" alt="Mikado - Webs fastest templating engine" width="61.8%"><p></p></h1>
<h3>New generation template engine. Super-lightweight, outstanding performance, no dependencies.</h3>

Rendering has by far the most impact on application performance. Mikado takes templating performance to a <a href="#benchmark">whole new level</a> and provides you keyed, non-keyed and also reactive paradigm switchable out of the box. Let's start building the next generation of high performance applications.

<a target="_blank" href="https://www.npmjs.com/package/mikado"><img src="https://img.shields.io/npm/v/mikado.svg"></a>
<a target="_blank" href="https://travis-ci.org/nextapps-de/mikado"><img src="https://travis-ci.org/nextapps-de/flexsearch.svg?branch=master"></a>
<a target="_blank" href="https://coveralls.io/github/nextapps-de/mikado?branch=master"><img src="https://coveralls.io/repos/github/nextapps-de/mikado/badge.svg?branch=master"></a>
<a target="_blank" href="https://www.codacy.com/app/ts-thomas/Mikado?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nextapps-de/mikado&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/a896e010f6b4429aa7bc9a89550320a7"/></a>
<a target="_blank" href="https://github.com/nextapps-de/mikado/issues"><img src="https://img.shields.io/github/issues/nextapps-de/mikado.svg"></a>
<a target="_blank" href="https://github.com/nextapps-de/mikado/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/mikado.svg"></a>

<a href="#started">Getting Started</a> &ensp;&bull;&ensp; 
<a href="#options">Options</a> &ensp;&bull;&ensp; 
<a href="#api">API</a> &ensp;&bull;&ensp; 
<a href="#concept">Concept</a> &ensp;&bull;&ensp; 
<a href="#benchmark">Benchmark</a> &ensp;&bull;&ensp; 
<a href="#builds">Custom Builds</a> &ensp;&bull;&ensp; 
<a href="#compiler">Template Compiler</a> &ensp;&bull;&ensp;
<a href="https://github.com/nextapps-de/mikado-server">Template Server</a> &ensp;&bull;&ensp; <!--<a href="https://github.com/nextapps-de/mikado-express">Express Middleware (SSR)</a> &ensp;&bull;&ensp;-->
<a href="CHANGELOG.md">Changelog</a>

__Services:__

Mikado Runtime (Render Templates)<br>`npm install mikado`

<a href="https://github.com/nextapps-de/mikado-compile">Mikado Compiler</a> (Compile Templates)<br>`npm install mikado-compile`

<a href="https://github.com/nextapps-de/mikado-server">Mikado Server</a> (Serve Templates)<br>`npm install mikado-server`

<!--<a href="https://github.com/nextapps-de/mikado-express">Express Middleware</a> (Server-Side Rendering) _\*WIP\*_<br>`npm install mikado-express`-->

__Benchmark:__

- https://krausest.github.io/js-framework-benchmark/current.html
- <a href="#benchmark">Stress Test Benchmark</a>

__Demo:__

1. <a href="demo/basic/basic.html">Basic Example + Runtime Compiler (HTML5 Template)</a>
2. <a href="demo/basic/compiler.html">Basic Example + Runtime Compiler (String Template)</a>
3. <a href="demo/basic/demo.html">Basic Example + Events (ES5)</a>
4. <a href="demo/basic/demo.es6.html">Basic Example + Events (ES6 Modules)</a>
5. <a href="demo/basic/demo.dev.html">Basic Example + Events (Development Sources)</a>
6. TodoMVC App: <a href="demo/todomvc/">Source Code</a>&ensp;/&ensp;<a href="https://raw.githack.com/nextapps-de/mikado/master/demo/todomvc/index.html">Run Demo</a>
7. js-framework-benchmark: <a href="https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/keyed/mikado">keyed</a>&ensp;/&ensp;<a href="https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/non-keyed/mikado">non-keyed</a>&ensp;/&ensp;<a href="https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/keyed/mikado-proxy">keyed (proxy)</a>

#### Comming Soon
`new` webpack loader to bundle templates<br>
`add` file endings for templates are customizable (e.g use ___.shtml___)<br>

#### How to learn Mikado?

Thanks to the reversed engineering Mikado provides you one of the most simple to learn idiomatic style which are based on living standards. You do not have to learn a new language, you just need some basic skills you already have. __It will take 3 minutes to become productive.__ Don't let confuse you about the size of this documentation, because it will show you a lot of in-depth details, which are just missing in most of other framework documentations. You will do not need this details to start with. But when you would like to know more you get a chance to go deeper.

Also all compiled dist files will work out of the box, no TypeScript, no Webpack, no module loader, no anything external is required. You can start out of the box seamlessly. No pain you might know from other frameworks.

Guide for new developers (the most simple example, just takes 3 minutes):
- Load this <a href="https://rawcdn.githack.com/nextapps-de/mikado/master/dist/mikado.min.js">bundle</a> through a script tag resource
- Provide a basic <a href="#compiler-html5">template</a> as native HTML5 template
- Compile the template, create Mikado instance by passing the root node and the compiled template
- Just use `.render(data)` over and over for all jobs: add / remove / clear / update / reconcile / ...
- <a href="demo/basic/basic.html">Final Source Code</a>

## Table of contents

1. <a href="#get-latest">Get Latest</a>
2. <a href="#feature-comparison">Feature Comparison: Mikado Light</a>
3. <a href="#benchmark">Benchmark Ranking (Rendering Performance)</a>
4. <a href="#api">API Overview</a>
5. <a href="#options">Options</a>
6. <a href="#compiler">Template Compiler</a>
    - <a href="#xss">XSS Security</a>
    - <a href="#mikado-compile">Using Dedicated Compiler</a>
    - <a href="#compiler-html5">Using HTML5 Templates</a>
    - <a href="#compiler-string">Using Template String</a>
7. <a href="#conventions">Rules and Conventions</a>
8. <a href="#started">Basic Example</a>
9. <a href="#advanced_example">Advanced Example</a>
10. <a href="#event">Event Bindings</a>
    - <a href="#view.listen">Explicit Register/Unregister</a>
11. <a href="#keyed">Keyed / Non-Keyed Modes</a>
    - <a href="#non-keyed">Non-Keyed</a>
    - <a href="#explicit-keyed">Explicit Keyed (Non-Shared)</a>
    - <a href="#cross-shared">Cross-Shared Keyed</a>
    - <a href="#shared-keyed">Exclusive-Shared Keyed</a>
    - <a href="#explicit-shared-keyed">Explicit Keyed (Shared)</a>
12. <a href="#reuse">Non-Reusing</a>
    - <a href="#refresh">Render vs. Refresh vs. Reconcile</a>
13. Usage:
    - <a href="#usage">Create, Initialize, Destroy Views</a>
    - <a href="#view.render">Render Templates</a>
    - <a href="#modify_views">Modify Views</a>
    - <a href="#helpers">Useful Helpers</a>
    - <a href="#manipulate">Manipulate Views</a>
    - <a href="#cache-helpers">Caching Helpers</a>
14. <a href="#cache">DOM State Caching</a>
15. Stores:
    - <a href="#store">Internal Store</a>
    - <a href="#options.loose">Loose Store</a>
    - <a href="#extern">Extern/Custom Store</a>
    - <a href="#extern">Reactive Store</a>
    - <a href="#export">Export / Import Stores</a>
16. <a href="#view.state">State</a>
17. <a href="#callbacks">Callbacks</a>
18. <a href="#load">Transport / Load Templates</a>
19. <a href="#static">Static Templates</a>
    - <a href="#mikado.once">Once (One-time rendering)</a>
20. <a href="#compiler-service">Compiler Service / Live Templates</a>
    - <a href="#localdev">Local Development</a>
21. Template Features:
    - <a href="#includes">Includes</a>
    - <a href="#loop-partials">Loop Partials</a>
    - <a href="#inline-loops">Inline Loops</a>
    - <a href="#conditional">Conditional Branches</a>
22. <a href="#proxy">Reactive Proxy (Observer)</a>
    - <a href="#limitations">Limitations</a>
    - <a href="#stealth">Stealth Mode</a>
    - <a href="#observable">Observable Array (Virtual NodeList)</a>
23. <a href="#best-practices">Best Practices</a>
24. <a href="#memory">Memory Optimizations</a>
25. <a href="#reconcile">About Reconcile (Diffing)</a>
26. <a href="#concept">Concept of Shared Pools</a>
27. <a href="#builds">Custom Builds</a>

<a name="get-latest"></a>
## Get Latest

### Bundle

Choose one of these bundles:

<table>
    <tr></tr>
    <tr>
        <td>Build</td>
        <td>File</td>
        <td>CDN</td>
    </tr>
    <tr>
        <td>mikado.min.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/master/dist/mikado.min.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/master/dist/mikado.min.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/master/dist/mikado.min.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.light.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/master/dist/mikado.light.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/master/dist/mikado.light.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/master/dist/mikado.light.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.es5.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/master/dist/mikado.es5.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/master/dist/mikado.es5.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/master/dist/mikado.es5.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.debug.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/master/dist/mikado.debug.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/master/dist/mikado.debug.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/master/dist/mikado.debug.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.custom.js</td>
        <td><a href="#builds">Custom Build</a></td>
        <td></td>
    </tr>
</table>

> __Recommended:__ To get a specific version just replace `/master/` with one of the version numbers from the release e.g. `/0.6.6/`, or also a commit hash.

The es5-strict version is including all features. The debug version also but additionally provide debugging information through the console.

Example:
```html
<script src="dist/mikado.min.js"></script>
<script>
    // ....
</script>
```

### Node.js

Install Mikado via NPM:
```npm
npm install mikado
```

The ___dist___ and ___src___ folder are located in `node_modules/mikado/`.

### ES6 Modules

#### Production
The ES6 minified production modules are located in `dist/module/`.

```html
<script>
    import Mikado from "./dist/module/mikado.js";
</script>
```

You can also load modules via CDN, e.g.:

```html
<script>
    import Mikado from "https://unpkg.com/mikado@0.7.21/dist/module/mikado.js";
</script>
```

#### Development
Use the modules from the "src" folder for development/debugging. When using the "src" modules you have to load the "src/config.js" via a normal script tag before you load the modules.

```html
<script src="src/config.js"></script>
<script>
    import Mikado from "./src/mikado.js";
</script>
```

<a name="feature-comparison"></a>
### Feature Comparison
<table>
    <tr></tr>
    <tr>
        <td>Feature</td>
        <td>mikado.min.js</td>
        <td>mikado.light.js</td>
    </tr>
    <tr>
        <td>
            Template Engine
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#cache">DOM State Caching</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#concept">Shared Pools / Live Pools</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#keyed">Keyed/Non-Keyed</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#reuse">Strict Non-Reusing</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#reconcile">Reconcile (Diffing)</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#compiler">Runtime Compiler</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#store">Manage Data Store</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#event">Event Binding/Routes</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#proxy">Data Proxy (Observe)</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#observe">Virtual NodeList (Array)</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#async">Asynchronous Render</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#load">Transport/Load Templates</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#export">Export/Import Views</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#manipulate">DOM Manipulation Helpers</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#conditional">Conditional Branches</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#includes">Includes/Partials/Loops</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr>
        <td>File Size (gzip)</td>
        <td>8.3 kb</td>
        <td>3.0 kb</td>
    </tr>
</table>

<a name="benchmark"></a>
## Benchmark Ranking (Rendering Performance)

Run the benchmark (recycle):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/">https://raw.githack.com/nextapps-de/mikado/master/bench/</a><br>

Run the benchmark (keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/#keyed">https://raw.githack.com/nextapps-de/mikado/master/bench/#keyed</a><br>

Run the benchmark (internal/data-driven):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/#internal">https://raw.githack.com/nextapps-de/mikado/master/bench/#internal</a><br>

Sources and readme:<br>
<a href="bench/">https://github.com/nextapps-de/mikado/tree/master/bench</a>

Values represents operations per second, each benchmark task has to process a data array of 100 items. Higher values are better, except file size (minified/gzip) and memory (sum of allocation during the whole test).

#### Keyed

<table>
    <tr></tr>
    <tr>
        <td><sub>Library</sub></td>
        <td align=center><sub>KB</sub></td>
        <td align=center><sub>RAM</sub></td>
        <td align=center><sub>Create</sub></td>
        <td align=center><sub>Replace</sub></td>
        <td align=center><sub>Update</sub></td>
        <td align=center><sub>Order</sub></td>
        <td align=center><sub>Repaint</sub></td>
        <td align=center><sub>Add</sub></td>
        <td align=center><sub>Remove</sub></td>
        <td align=center><sub>Toggle</sub></td>
        <td align=center><sub>Clear</sub></td>
        <td align=center><sub>Index</sub></td>
        <td align=center><sub>Score</sub></td>
    </tr>
    <tr>
        <td><sub>mikado</sub></td>
        <td align=right><sub>3</sub></td>
        <td align=right><sub>27</sub></td>
        <td align=right><sub>18745</sub></td>
        <td align=right><sub>8124</sub></td>
        <td align=right><sub>92669</sub></td>
        <td align=right><sub>49554</sub></td>
        <td align=right><sub>299140</sub></td>
        <td align=right><sub>35254</sub></td>
        <td align=right><sub>27563</sub></td>
        <td align=right><sub>31265</sub></td>
        <td align=right><sub>25276</sub></td>
        <td align=right><b><sub>992</sub></b></td>
        <td align=right><b><sub>57133</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mikado-proxy</sub></td>
        <td align=right><sub>8.3</sub></td>
        <td align=right><sub>30</sub></td>
        <td align=right><sub>10288</sub></td>
        <td align=right><sub>5901</sub></td>
        <td align=right><sub>27129</sub></td>
        <td align=right><sub>18648</sub></td>
        <td align=right><sub>28194</sub></td>
        <td align=right><sub>14912</sub></td>
        <td align=right><sub>19278</sub></td>
        <td align=right><sub>16526</sub></td>
        <td align=right><sub>26216</sub></td>
        <td align=right><b><sub>564</sub></b></td>
        <td align=right><b><sub>13997</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>solid</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>339</sub></td>
        <td align=right><sub>737</sub></td>
        <td align=right><sub>665</sub></td>
        <td align=right><sub>7291</sub></td>
        <td align=right><sub>4029</sub></td>
        <td align=right><sub>13279</sub></td>
        <td align=right><sub>1391</sub></td>
        <td align=right><sub>7487</sub></td>
        <td align=right><sub>2470</sub></td>
        <td align=right><sub>15227</sub></td>
        <td align=right><b><sub>156</sub></b></td>
        <td align=right><b><sub>4014</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>311</sub></td>
        <td align=right><sub>754</sub></td>
        <td align=right><sub>724</sub></td>
        <td align=right><sub>5493</sub></td>
        <td align=right><sub>5266</sub></td>
        <td align=right><sub>6055</sub></td>
        <td align=right><sub>1323</sub></td>
        <td align=right><sub>7443</sub></td>
        <td align=right><sub>2302</sub></td>
        <td align=right><sub>15982</sub></td>
        <td align=right><b><sub>197</sub></b></td>
        <td align=right><b><sub>2934</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align=right><sub>9.6</sub></td>
        <td align=right><sub>263</sub></td>
        <td align=right><sub>637</sub></td>
        <td align=right><sub>612</sub></td>
        <td align=right><sub>4599</sub></td>
        <td align=right><sub>4267</sub></td>
        <td align=right><sub>4997</sub></td>
        <td align=right><sub>1120</sub></td>
        <td align=right><sub>6614</sub></td>
        <td align=right><sub>2004</sub></td>
        <td align=right><sub>12622</sub></td>
        <td align=right><b><sub>176</sub></b></td>
        <td align=right><b><sub>2498</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align=right><sub>4.5</sub></td>
        <td align=right><sub>393</sub></td>
        <td align=right><sub>1078</sub></td>
        <td align=right><sub>1059</sub></td>
        <td align=right><sub>1082</sub></td>
        <td align=right><sub>1129</sub></td>
        <td align=right><sub>1101</sub></td>
        <td align=right><sub>1128</sub></td>
        <td align=right><sub>2049</sub></td>
        <td align=right><sub>1464</sub></td>
        <td align=right><sub>24931</sub></td>
        <td align=right><b><sub>215</sub></b></td>
        <td align=right><b><sub>1321</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerhtml</sub></td>
        <td align=right><sub>0</sub></td>
        <td align=right><sub>494</sub></td>
        <td align=right><sub>1029</sub></td>
        <td align=right><sub>999</sub></td>
        <td align=right><sub>993</sub></td>
        <td align=right><sub>876</sub></td>
        <td align=right><sub>885</sub></td>
        <td align=right><sub>935</sub></td>
        <td align=right><sub>1769</sub></td>
        <td align=right><sub>1186</sub></td>
        <td align=right><sub>27131</sub></td>
        <td align=right><b><sub>157</sub></b></td>
        <td align=right><b><sub>1172</sub></b></td>
    </tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align=right><sub>15.8</sub></td>
        <td align=right><sub>626</sub></td>
        <td align=right><sub>975</sub></td>
        <td align=right><sub>857</sub></td>
        <td align=right><sub>849</sub></td>
        <td align=right><sub>854</sub></td>
        <td align=right><sub>846</sub></td>
        <td align=right><sub>878</sub></td>
        <td align=right><sub>1560</sub></td>
        <td align=right><sub>1187</sub></td>
        <td align=right><sub>23713</sub></td>
        <td align=right><b><sub>165</sub></b></td>
        <td align=right><b><sub>1041</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align=right><sub>7.5</sub></td>
        <td align=right><sub>650</sub></td>
        <td align=right><sub>842</sub></td>
        <td align=right><sub>809</sub></td>
        <td align=right><sub>812</sub></td>
        <td align=right><sub>824</sub></td>
        <td align=right><sub>820</sub></td>
        <td align=right><sub>813</sub></td>
        <td align=right><sub>1577</sub></td>
        <td align=right><sub>1096</sub></td>
        <td align=right><sub>18047</sub></td>
        <td align=right><b><sub>162</sub></b></td>
        <td align=right><b><sub>994</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align=right><sub>31.3</sub></td>
        <td align=right><sub>684</sub></td>
        <td align=right><sub>809</sub></td>
        <td align=right><sub>707</sub></td>
        <td align=right><sub>703</sub></td>
        <td align=right><sub>643</sub></td>
        <td align=right><sub>652</sub></td>
        <td align=right><sub>698</sub></td>
        <td align=right><sub>1129</sub></td>
        <td align=right><sub>860</sub></td>
        <td align=right><sub>5520</sub></td>
        <td align=right><b><sub>86</sub></b></td>
        <td align=right><b><sub>750</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align=right><sub>2.9</sub></td>
        <td align=right><sub>1090</sub></td>
        <td align=right><sub>449</sub></td>
        <td align=right><sub>441</sub></td>
        <td align=right><sub>450</sub></td>
        <td align=right><sub>451</sub></td>
        <td align=right><sub>452</sub></td>
        <td align=right><sub>468</sub></td>
        <td align=right><sub>864</sub></td>
        <td align=right><sub>603</sub></td>
        <td align=right><sub>11765</sub></td>
        <td align=right><b><sub>159</sub></b></td>
        <td align=right><b><sub>682</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align=right><sub>17.3</sub></td>
        <td align=right><sub>1179</sub></td>
        <td align=right><sub>441</sub></td>
        <td align=right><sub>411</sub></td>
        <td align=right><sub>409</sub></td>
        <td align=right><sub>413</sub></td>
        <td align=right><sub>409</sub></td>
        <td align=right><sub>431</sub></td>
        <td align=right><sub>761</sub></td>
        <td align=right><sub>550</sub></td>
        <td align=right><sub>4964</sub></td>
        <td align=right><b><sub>81</sub></b></td>
        <td align=right><b><sub>514</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>4684</sub></td>
        <td align=right><sub>165</sub></td>
        <td align=right><sub>156</sub></td>
        <td align=right><sub>158</sub></td>
        <td align=right><sub>158</sub></td>
        <td align=right><sub>159</sub></td>
        <td align=right><sub>166</sub></td>
        <td align=right><sub>298</sub></td>
        <td align=right><sub>212</sub></td>
        <td align=right><sub>1944</sub></td>
        <td align=right><b><sub>37</sub></b></td>
        <td align=right><b><sub>213</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>2657</sub></td>
        <td align=right><sub>91</sub></td>
        <td align=right><sub>67</sub></td>
        <td align=right><sub>68</sub></td>
        <td align=right><sub>68</sub></td>
        <td align=right><sub>68</sub></td>
        <td align=right><sub>84</sub></td>
        <td align=right><sub>130</sub></td>
        <td align=right><sub>103</sub></td>
        <td align=right><sub>1162</sub></td>
        <td align=right><b><sub>46</sub></b></td>
        <td align=right><b><sub>167</sub></b></td>
    </tr>
</table>

The file size and memory gets less relevance. The maximum possible ___index___ is 1000, that requires a library to be best in each category. The ___score___ value is relational where a score of 1000 represents the statistical midfield.

Read more about this test and also show ranking table for "non-keyed" and "data-driven" <a href="https://github.com/nextapps-de/mikado/blob/master/bench/README.md"><u>here</u></a>. <!-- or take a look on <a href="https://github.com/nextapps-de/mikado/issues/7">Mobile Benchmark Results</a>.-->

##### Worst Case Scenario

Mikado has no specific worst case scenario. The replace test could be named like this, but that is always the worst case scenario for every lib. This test simply couldn't use most of the runtime optimizations.

<a name="api"></a>
## API Overview

Most of these methods are optionally, you can just use ___.render()___ to apply all changes automatically.

Constructor:
- new <a href="#mikado.new">__Mikado__(\<root\>, template, \<options\>)</a> : view

Global methods:
- <a href="#mikado.new">Mikado.__new__(\<root\>, template, \<options\>)</a> : view
- <a href="#mikado.once">Mikado.__once__(root, template, \<data\>, \<payload\>, \<callback\>)</a>
- <a href="#mikado.register">Mikado.__register__(template)</a>
- <a href="#mikado.unload">Mikado.__unregister__(template)</a>

Global methods (not included in mikado.light.js):
- <a href="#mikado.compile">Mikado.__compile__(\<template | string\>)</a>
- <a href="#mikado.load">Mikado.__load__(url, \<callback\>)</a>
- <a href="#mikado.unload">Mikado.__unload__(template)</a>
- <a href="#mikado.route">mikado.__route__(name, handler)</a>
- <a href="#mikado.listen">mikado.__listen__(event)</a>
- <a href="#mikado.unlisten">mikado.__unlisten__(event)</a>
- <a href="#mikado.dispatch">mikado.__dispatch__(name, \<target\>, \<event\>, \<self\>)</a>

Instance methods:
- <a href="#view.init">view.__init__(\<template\>, \<options\>)</a>
- <a href="#view.mount">view.__mount__(root)</a>
- <a href="#view.render">view.__render__(\<data\>, \<payload\>, \<callback\>)</a>
- <a href="#view.reconcile">view.__reconcile__(data)</a>
- <a href="#view.create">view.__create__(data, \<payload\>)</a>
- <a href="#view.add">view.__add__(data, \<payload\>, <index\>)</a>
- <a href="#view.append">view.__append__(data, \<payload\>, <index\>)</a>
- <a href="#view.update">view.__update__(node | index, data, \<payload\>)</a>
- <a href="#view.replace">view.__replace__(node | index, data, \<payload\>)</a>
- <a href="#view.remove">view.__remove__(node, <count\>)</a>
- <a href="#view.clear">view.__clear__()</a>
- <a href="#view.data">view.__data__(index | node)</a>
- <a href="#view.node">view.__node__(index)</a>
- <a href="#view.index">view.__index__(node)</a>
- <a href="#view.destroy">view.__destroy__(\<unload?\>)</a>
- <a href="#view.unload">view.__unload__()</a>

Instance methods (not included in mikado.light.js):
- <a href="#view.refresh">view.__refresh__(\<node | index\>, \<payload\>)</a>
- <a href="#view.sync">view.__sync__(\<uncache?\>)</a>
- <a href="#view.purge">view.__purge__()</a>
- <a href="#view.find">view.__find__(data)</a>
- <a href="#view.search">view.__search__(data)</a>
- <a href="#view.where">view.__where__(payload)</a>
- <a href="#view.import">view.__import__()</a>
- <a href="#view.export">view.__export__()</a>
- <a href="#view.load">view.__load__(url, \<callback\>)</a>
- <a href="#view.route">view.__route__(name, handler)</a>
- <a href="#view.listen">view.__listen__(event)</a>
- <a href="#view.unlisten">view.__unlisten__(event)</a>
- <a href="#view.dispatch">view.__dispatch__(name, \<target\>, \<event\>, \<self\>)</a>

DOM manipulation helpers (optional, not included in mikado.light.js):

- <a href="#view.move">view.__move__(node | index, index)</a>
- <a href="#view.shift">view.__shift__(node | index, index)</a>
- <a href="#view.up">view.__up__(node | index)</a>
- <a href="#view.down">view.__down__(node | index)</a>
- <a href="#view.first">view.__first__(node | index)</a>
- <a href="#view.last">view.__last__(node | index)</a>
- <a href="#view.before">view.__before__(node | index, node | index)</a>
- <a href="#view.after">view.__after__(node | index, node | index)</a>
- <a href="#view.swap">view.__swap__(node | index, node | index)</a>
<!-- - ~~view.__sort__(field, \<direction | handler\>)~~ -->
<!-- - ~~view.__shuffle__()~~ -->

Instance properties:
- ~~view.__dom__~~
- <a href="#view.length">view.__length__</a>
- <a href="#view.store">view.__store__</a>
- <a href="#view.state">view.__state__</a>
- ~~view.__config__~~
- ~~view.__template__~~

Global helpers (optional, not included in mikado.light.js):
- <a href="#Mikado.setText">Mikado.__setText__(node, text)</a>
- <a href="#Mikado.getText">Mikado.__getText__(node)</a>
- <a href="#Mikado.setHTML">Mikado.__setHTML__(node, html)</a>
- <a href="#Mikado.getHTML">Mikado.__getHTML__(node)</a>
- <a href="#Mikado.setClass">Mikado.__setClass__(node, class)</a>
- <a href="#Mikado.getClass">Mikado.__getClass__(node)</a>
- <a href="#Mikado.hasClass">Mikado.__hasClass__(node, class)</a>
- <a href="#Mikado.removeClass">Mikado.__removeClass__(node, class)</a>
- <a href="#Mikado.toggleClass">Mikado.__toggleClass__(node, class)</a>
- ~~Mikado.__setStyle__(node, property, value)~~
- ~~Mikado.__getStyle__(node, property~~
- <a href="#Mikado.setCSS">Mikado.__setCSS__(node, css)</a>
- <a href="#Mikado.getCSS">Mikado.__getCSS__(node)</a>
- <a href="#Mikado.setAttribute">Mikado.__setAttribute__(node, attr, value)</a>
- <a href="#Mikado.getAttribute">Mikado.__getAttribute__(node, attr)</a>
- <a href="#Mikado.hasAttribute">Mikado.__hasAttribute__(node, attr)</a>
- <a href="#Mikado.removeAttribute">Mikado.__removeAttribute__(node, attr)</a>

<a name="options"></a>
## Options

> Each Mikado instance can have its own options.

<table>
    <tr></tr>
    <tr>
        <td>Option</td>
        <td>Description</td>
        <td>Default</td>
    </tr>
    <tr>
        <td><b>root</b></td>
        <td>The destination root where the template should be rendered.</td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>template</b></td>
        <td>The template which should be assigned to the Mikado instance (JSON or the name of the template when registered/loaded externally).</td>
        <td></td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>async</b></td>
        <td>Perform render tasks asynchronously and return a Promise.</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>cache</b></td>
        <td>Enable/disable <a href="#cache">caching</a>. Caching can greatly increase performance (up to 20x).</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>store</b></td>
        <td>Passed data for rendering are also stored and synchronized along the virtual dom. You can re-render the full state at any time, without passing the data.<br><b>Notice:</b> When passing an external reference of an existing Array-like object to the field "store" the store will perform all modifications directly to this reference (<a href="#extern">read more about "External Store"</a>).</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>loose</b></td>
        <td>When store is enabled this flag removes also data whenever a corresponding dom element was removed. <!--When set to true you cannot use paged rendering.--></td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>reuse</b></td>
        <td>When enabled all dom elements which are already rendered will be re-used for the next render task. This performs better, but it may produce issues when manual dom manipulations was made which are not fully covered by the template. Whe enabled make sure to use the <a>Virtual DOM Manipulation</a> helpers.</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>state</b></td>
        <td>Pass an extern object which should be referenced as the state used within template expressions.</td>
        <td>{ }</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>pool</b></td>
        <td>Set it to true to use both pools: Recycle Pool + Keyed Pool (autoscale), or set it to false to fully disable pooling, or set it to either one of both: "queue" or "key" to enable just one of them respectively.</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>size</b></td>
        <td>Sets the maximum size of the shared pool. When not set or false it uses "auto scaling".</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>prefetch</b></td>
        <td>Prefetch/prebuilt a template on page load. Disable to save memory an speed up page start.</td>
        <td>true</td>
    </tr>
</table>

<a name="compiler"></a>
## Compile Templates

<a name="xss"></a>
#### XSS Security

Whenever you want to load and/or compile templates during runtime on client side keep this rule in mind:
> __Never load templates from an external resource you did not own (or thrust)!__

To prevent XSS there are some options:
1. use templates provided by yourself (recommended)
2. load external templates from sources you are thrust
3. ___Coming Soon:___ bundle all external templates during build and pass an external sanitizer (e.g. a node module) to the compiler options
4. ___Coming Soon:___ use the `mikado-server` as a gateway which provides a built-in sanitizer for external templates
5. ___Coming Soon:___ use a sanitizer in the client side and pass this along the option field `sanitize`

Sanitize external resources comes with some big drawbacks accordingly to this <a href="https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.md">specification</a>:
- Templates supports just a small subset of tags when using `html` as a content type
- Templates could __not__ include any javascript expressions (just supports basic template expression accordingly to mustache or handlebars)

<a name="compiler"></a>
#### Compiler Methods

<table>
    <tr></tr>
    <tr>
        <td>Method</td>
        <td>Notes</td>
    </tr>
    <tr>
        <td><a href="#mikado-compile">Mikado Compiler (CLI)</a></td>
        <td>
            <ul>
                <li>instant performance</li>
                <li>recommended for production</li>
                <li>bundle templates easily out of the box</li>
            </ul>
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td><a href="#compiler-service">Compiler Service (Server)</a></td>
        <td>
            <ul>
                <li>server-side</li>
                <li>good for production</li>
                <li>bundle not required</li>
                <li>best caching/re-using capabilities</li>
                <li>enable live updates</li>
            </ul>
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td><a href="#compiler-html5">HTML5 Templates (Runtime)</a></td>
        <td>
            <ul>
                <li>requires compiling during runtime</li>
                <li>good for development</li>
                <li>bundle templates requires additional tooling (like webpack)</li>
            </ul>
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td><a href="#compiler-string">Template String (Runtime)</a></td>
        <td>
            <ul>
                <li>requires compiling during runtime</li>
                <li>compiling strings comes with an extra cost</li>
                <li>good for development</li>
                <li>bundle templates easily out of the box</li>
            </ul>
        </td>
    </tr>
</table>

__Note:__ Choosing a specific compiler method has no impact on the render performance.

<a name="mikado-compile"></a>
### 1. Variant: Using Dedicated Compiler (Recommended)

Define a HTML-like template and use double curly brackets to mark dynamic expressions which should be calculated during runtime:
```html
<table>
    <tr>
        <td>User:</td>
        <td>{{data.user}}</td>
    </tr>
    <tr>
        <td>Tweets:</td>
        <td>{{data.tweets.length}}</td>
    </tr>
</table>
```

Save this template e.g. to _user/list.html_

> The preserved keyword ___data___ is a reference to a passed data item. You can access the whole nested object.

Mikado comes up with a template compiler which has to be run through Node.js and provides a command line interface (CLI) to start compilation tasks. The template compiles into a fully compatible JSON format and could also be used for server-side rendering.

Install Mikado Compiler via NPM:
```npm
npm install mikado-compile
```

Compile the template through the command line by:
```cmd
npx mikado-compile user/list.html
```

> __Notation:__ npx mikado-compile _{{input}} {{destination}}_

<!--
Instead of `npx mikado compile` you can also use `npx mikado-compile` alternatively. When a destination was not set, the input folder will be used instead.
-->

After compilation you will have 4 different files:
1. __template.js__ the template compiled in ES5 compatible Javascript
2. __template.es6.js__ the template compiled as an ES6 module
3. __template.json__ the template compiled in JSON-compatible notation (<a href="#load">to load via http request</a>)
4. __template.html__ the HTML-like template (reference, do not delete it)

<a name="compiler-html5"></a>
### 2. Variant: Using HTML5 Templates

Define in HTML:
```html
<template id="user-list">
    <table>
        <tr>
            <td>User:</td>
            <td>{{data.user}}</td>
        </tr>
        <tr>
            <td>Tweets:</td>
            <td>{{data.tweets.length}}</td>
        </tr>
    </table>
</template>
```

Use runtime compiler:
```js
var tpl = Mikado.compile("user-list");
```
```js
var tpl = Mikado.compile(document.getElementById("user-list"));
```

Create mikado view:
```js
var view = Mikado.new(tpl);
```

<a name="compiler-string"></a>
### 3. Variant: Using Template String

Define HTML as string:
```js
const template = ( 
    `<table>
        <tr>
            <td>User:</td>
            <td>{{data.user}}</td>
        </tr>
        <tr>
            <td>Tweets:</td>
            <td>{{data.tweets.length}}</td>
        </tr>
    </table>`
);
```

Use runtime compiler:
```js
var tpl = Mikado.compile(template);
```

Create mikado view:
```js
var view = Mikado.new(tpl);
```

<a name="started"></a>
## Basic Example

Assume there is an array of data items to render (or just one item as an object):
```js
var data = [{
    user: "User A",
    tweets: ["foo", "bar", "foobar"]
},{
    user: "User B",
    tweets: ["foo", "bar", "foobar"]
},{
    user: "User C",
    tweets: ["foo", "bar", "foobar"]
}]
```

Load library and initialize template (ES5):
```html
<script src="mikado.min.js"></script>
<script src="user/list.js"></script>
<script>
    var view = Mikado.new("template");
</script>
```

> The name of a template inherits from its corresponding filename.

Load library and initialize template (ES6):
```html
<script type="module">
    import Mikado from "./mikado.js";
    import template from "./user/list.es6.js";
    var view = Mikado.new(template);
</script>
```

After creation you need mount to a DOM element initially as a destination root and render the template with populated data:
```js
view.mount(document.body);
view.render(data);
```

You can also chain methods:

```js
var view = Mikado.new(template).mount(document.body).render(data);
```

<a name="conventions"></a>
## Rules and Conventions

> Every template has to provide __one single root__ as the outer bound. This is a convention based on the concept of Mikado.

Instead of doing this in a template:
```html
<header>
    <nav></nav>
</header>
<section>
    <p></p>
</section>
<footer>
    <nav></nav>
</footer>
```

Provide one single root by doing this:
```html
<main>
    <header>
        <nav></nav>
    </header>
    <section>
        <p></p>
    </section>
    <footer>
        <nav></nav>
    </footer>
</main>
```

You can also use a `<div>` or any other element as a template root (also custom elements).

Mixing text nodes and child nodes within same root is actually not possible:
```html
<main>
    {{ data.title }}
    <section>{{ data.content }}</section>
    {{ data.footer }}
</main>
```

This may provided in the future, in the meanwhile just wrap text nodes into its own child:
```html
<main>
    <title>{{ data.title }}</title>
    <section>{{ data.content }}</section>
    <footer>{{ data.footer }}</footer>
</main>
```

This example has not this issue, because text nodes and child nodes are not mixed:
```html
<main>
    <section>{{ data.title }} foobar {{ data.footer }}</section>
</main>
```

<a name="advanced_example"></a>
## Advanced Example

A bit more complex template:
```html
<section id="{{data.id}}" class="{{this.state.theme}}" data-index="{{index}}">
    {{@var is_today = data.date === view.today}}
    <div class="{{data.class}} {{is_today ? 'on' : 'off'}}">
        <div class="title" style="font-size: 2em">{{data.title.toUpperCase()}}</div>
        <div class="content {{index % 2 ? 'odd' : 'even'}}">{{#data.content}}</div>
        <div class="footer">{{view.parseFooter(data)}}</div>
    </div>
</section>
```

You can use <u>any</u> Javascript within the {{ ... }} curly bracket notation.

> To pass html markup as a string, the curly brackets needs to be followed by __#__ e.g. `{{# ... }}`. For performance relevant tasks avoid passing html contents as string.

> To use Javascript outside an elements context you need to prevent concatenation of the returned value. For this purpose the curly brackets needs to be followed by __@__ e.g. `{{@ ... }}`.

Within a template you have access to the following indentifiers:

<table>
    <tr></tr>
    <tr>
        <td>Identifier</td>
        <td>Description</td>
    </tr>
    <tr>
        <td><b>data</b></td>
        <td>A full reference to a passed data item.</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>view</b></td>
        <td>An optional payload used to manually pass in non-data-item specific values or helper functions.</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>index</b></td>
        <td>Represents the index of the currently rendered data item.</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>self</b></td>
        <td>Points to the current rendered element itself. Using "js" node property or by using the {{@ marker grants you to have "self" available.</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>this</b></td>
        <td>Provides you access to the Mikado view instance.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>this.<b>state</b></td>
        <td>An object used to keep data as a state across runtime. You can share state data across all Mikado instances by passing the same external object reference during initialization.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>this.<b>store</b></td>
        <td>Gives access to the internal data store (Array).</td>
    </tr>
    <!--
    <tr></tr>
    <tr>
        <td>this.<b>length</b></td>
        <td>The length of all data actually rendered (to get length of stored data use <i>this.store.length</i> instead).</td>
    </tr>
    -->
    <tr></tr>
    <tr>
        <td><b>window</b></td>
        <td>The global namespace.</td>
    </tr>
</table>

You cannot change the naming of those preserved keywords.

It is recommended to pass custom functions via the _view_ object (see example above). You can also nest more complex computations inline as an IIFE and return the result.

```html
<div class="date">{{ 
    (function(){ 
        var date = new Date();
        // ...
        return date.toLocaleString(); 
    }()) 
}}</div>
```

Alternatively of accessing _data_, _view_, _index_ and _this.state_ you can also access variables from the global namespace.

To finish the example above provide one single object or an array of ___data___ item:
```js
var data = [{
    id: "230BA161-675A-2288-3B15-C343DB3A1DFC",
    date: "2019-01-11",
    class: "yellow, green",
    title: "Sed congue, egestas lacinia.",
    content: "<p>Vivamus non lorem <b>vitae</b> odio sagittis amet ante.</p>",
    footer: "Pellentesque tincidunt tempus vehicula."
}]
```

Provide ___view___ payload (non-data-item specific values and helper methods used by the template):
```js
var payload = {
    page: 1,
    today: "2019-01-11",
    parseFooter: function(data){ return data.footer; }
}
```

Provide ___state___ data (application specific data and helper methods used by the template):
```js
view.state.theme = "custom";
```

Create a new view instance or initialize a new template factory to an existing instance:
```js
view.init(template);
```

Mount to a new target or just render the already mounted template:
```js
view.render(data, payload);
```

Render asynchronously by providing a callback function:
```js
view.render(data, payload, function(){
    console.log("finished.");
});
```

To render asynchronously by using promises you need to create the view instance with the ___async___ option flag:
```js
view = Mikado.new(template, { async: true });

view.render(data, payload).then(function(){
    console.log("finished.");
});
```

<a name="event"></a>
## Event Bindings

Lets take this example:
```html
<table data-id="{{data.id}}" root>
    <tr>
        <td>User:</td>
        <td click="show-user">{{data.user}}</td>
        <td><a click="delete-user:root">Delete</a></td>
    </tr>
</table>
```

There are 2 click listeners. The attribute value represents the name of the route. The second listener has a route separated by ":", this will delegate the event from the route "delete-user" to the closest element which contains the attribute "root".

Define routes:
```js
view.route("show-user", function(node, event){

    alert(node.textContent);

}).route("delete-user", function(node, event, self){

    alert(node.dataset.id); // delegated to "root"
    console.log("The element who fires the event: ", self);
})
```

Routes are stored globally, so you can share routes through all Mikado instances.

<b>List of all supported events:</b>
- tap (synthetic touch-enabled "click" listener, see below)
- change, input, select, toggle
- click, dblclick
- keydown, keyup, keypress
- mousedown, mouseenter, mouseleave, mousemove, mouseout, mouseover, mouseup, mousewheel
- touchstart, touchmove, touchend
- submit, reset
- focus, blur
- load, error
- resize
- scroll

<b>Synthetic events:</b>

<table>
    <tr></tr>
    <tr>
        <td>Event</td>
        <td>Description</td>
    </tr>
    <tr>
        <td><b>tap</b></td>
        <td>The tap event is a synthetic click event for touch-enabled devices. It also fully prevents the 300ms click delay. The tap event automatically falls back to a native click listener when running on non-touchable device.</td>
    </tr>
</table>

<a name="view.listen"></a><a name="view.unlisten"></a>
#### Explicit Register/Unregister

You can also use the event delegation along with "routes" outside a template. Just apply the event attribute like you would do in a template.

```html
<body>
    <div click="handler">Click Me</div>
</body>
```

```js
Mikado.route("handler", function(target, event){
    console.log("Clicked");
});
```

Then you have to explicit register these event once:

```js
Mikado.listen("click");
```

Because the register of events basically happens when creating the template factory under the hood. When no template was created which includes the same type of event, then there exist is no global listener. For that reason you have to explicitly register the listener once.

Same way you could also unregister events:

```js
Mikado.unlisten("click");
```

<a name="view.dispatch"></a><a name="dispatch"></a>
#### Dispatch Event Handler

Manually dispatch an event:
```js
view.dispatch("handler");
```

Manually dispatch an event and pass parameters:
```js
view.dispatch("handler", target, event, self);
```

<a name="keyed"></a>
## Keyed/Non-Keyed Modes

> Each template instance can run in its own mode independently.

Compare benchmark of all supported modes here:<br>
https://raw.githack.com/nextapps-de/mikado/master/bench/#modes

<a name="non-keyed"></a>
#### 1. Non-Keyed

A non-keyed strategy will reuse all existing components and is basically faster than keyed but also has some side-effects when not used properly.

Just provide a template as normal:
```html
<div>
    <div>User:</div>
    <div>{{data.name}}</div>
</div>
```

along with these options:

```js
var view = Mikado.new(template, { pool: true });
```

This will switch Mikado into a "non-keyed" mode where already rendered components will be re-used. Using the pool is optional.

<a name="explicit-keyed"></a>
#### 2. Explicit Keyed (Non-Pool)

A keyed strategy limits re-usability of components based on items with same ID. It just requires an __unique identifier__ on each rendered item (e.g. the ID).

Add the attribute ___key___ to the ___root element___ of a template (or the root of an inline partial) and assign the namespace to the unique identifier:
```html
<div key="data.id">
    <div>User:</div>
    <div>{{data.name}}</div>
</div>
```

To make them explicitly keyed also disable reusing:

```js
var view = Mikado.new(template, { reuse: false, pool: false });
```

This will switch Mikado into a "explicit keyed" mode (non-shared).

<a name="explicit-shared-keyed"></a>
#### 3. Explicit Keyed (Shared Pool)

This is a special mode which uses the shared keyed index exclusively (without pooling). This will give you the absolute maximum performance, but it has a limit you should keep in mind when using this mode. The exclusive keyed mode is unbounded. Just use this mode on templates where the amount of incoming data is supposed to be limited (e.g. in a common scenario: pagination through a set of x items, like a todo list). Otherwise you will get no performance gain and also the memory allocation increases constantly (unbounded).

```html
<div key="data.id">
    <div>User:</div>
    <div>{{data.name}}</div>
</div>
```

along with these options:

```js
var view = Mikado.new(template, { reuse: false, pool: "key" });
```

This will switch Mikado into a "explicit keyed" mode (shared).

<a name="cross-shared"></a>
#### 4. Cross-Shared (Hybrid)

> The cross shared mode is a hybrid and takes the performance benefits of both shared pools and provides you an enhanced pooling of reusable components. This mode provide high performance as well as low memory allocation during runtime.

Add the attribute ___key___ to the ___root element___ of a template:
```html
<div key="data.id">
    <div>User:</div>
    <div>{{data.name}}</div>
</div>
```

along with these options:

```js
var view = Mikado.new(template, { pool: true } );
```

This will switch Mikado into a "cross-shared-keyed" mode.

<a name="shared-keyed"></a>
#### 5. Exclusive-Shared (Hybrid)

You can also use the same strategy from 3. for hybrid mode. But it has the same limits as 3., read above.

```html
<div key="data.id">
    <div>User:</div>
    <div>{{data.name}}</div>
</div>
```

along with these options:

```js
var view = Mikado.new(template, { pool: "key" });
```

This will switch Mikado into a "exclusive-shared-keyed" mode.

<a name="reuse"></a>
## Non-/Reusing

> Mikado is one of the very few libraries which provides you a 100% non-reusing paradigm out of the box.

Generally keyed libraries will fail in restoring the original state of a component when a data item of the new fetched list has the same key. As long you follow some restrictions this may not an issue.
But whenever you get in situations where you have to force restoring, every keyed lib will fail and you may have to use quick fixes like randomize the ID of the component. Also keyed libs cannot fully integrated into every stack, especially when additional UI libs where used.

Mikado is able to restoring 100% of the original state. This helps in situations where:

- external libraries changes components nodes
- event listeners was bind directly to components nodes
- external data/values was referenced to components nodes
- components nodes where manually manipulated
- the process workflow requires redrawing of the original state on new data (required by some MVC)
- you need integration in a stack without side effects

__Notice:__ An original state does not include an event listener which was directly bound to an element. The original state is the state before you apply anything manually (or by external).

<a name="refresh"></a>
#### Render vs. Refresh vs. Reconcile

> Take advantage of Mikados 3 different render functions. Especially when reusing was disabled, this will gives you the full control.

<table>
    <tr>
        <td>.refresh()</td>
        <td>Just apply the data changes to the DOM. (did not add/remove/move)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>.reconcile()</td>
        <td>Just apply item order by moving nodes along the shortest path. (did not add/remove/update)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>.render()</td>
        <td>Perform a full update. (including: add/remove/reconcile/update)</td>
    </tr>
</table>

Basically the render function is already trying to apply the minimum required changes to the DOM. But prediction is always limited, also nothing could never make a prediction better than the developer itself who is implementing the task. Most of the optional methods provided by Mikado are simply just there, to get the most out when it matters. Use them to manual control the flow of batch processes and optimize performance-heavy tasks.

Whenever you call ___.render()___ when also ___reusing___ was explicitly disabled all components will be recreated (restoring original state):
```js
view.render(items);
```

Recreation has a significant cost and is often not strongly required by every single render loop. When using a ___store___ you can made changes to the data and just commit the changes when finished:
```js
view.store[1]["title"] = "new title";
view.refresh(1);
```

> The refresh method will just apply data changes to the view without restoring the original state by recreation of its components.

You can also refresh all components lazily when doing multiple changes:
```js
view.store[1].title = "new title";
view.store[2].content = "new content";
view.store[3].footer = "new footer";
view.refresh();
```

It is pretty much the same when using stores in loose mode:
```js
view.data(1).title = "new title";
view.data(2).content = "new content";
view.data(3).footer = "new footer";
view.refresh();
```

Passing a components root node or an index to the refresh method performs faster than passing no parameter.

__Hint:__ You cannot use refresh when new items was added/removed, this requires ___.render(data)___.

<a name="view.reconcile"></a>
When you just want to move items to its new order without updating its contents (also no add/remove) and you are in __keyed mode__ you can call reconciliation directly:

```js
view.reconcile(items);
```

__Hint:__ The sum of ___.reconcile(data)___ and ___.refresh()___ is basically ___.render(data)___ under the hood. When you need both: adding/removing/moving together with updating contents than call ___.render(data)___ instead of calling the corresponding partial methods one by one.

<a name="usage"></a>
## Create, Initialize, Destroy Views

<a name="mikado.new"></a>
Create view from a template with options:
```js
var view = Mikado.new(template, options);
```

<a name="mikado.new"></a>
Create view from a template with options and also mount it to a target element:
```js
var view = Mikado.new(root, template, options);
```

<a name="view.mount"></a>
Mount a view to a target element:
```js
view.mount(element);
```

<a name="view.init"></a>
Initialize an existing view with new options:
```js
view.init(options);
```

Initialize an existing view also with a new template:
```js
view.init(template, options);
```

<a name="view.unload"></a>
Unload/delete the template which is assigned to a view:
```js
view.unload();
```

<a name="view.destroy"></a>
Destroy a view:
```js
view.destroy();
```

<a name="view.render"></a>
## Render Templates

> When using an internal store (not external), every render task also updates the stored data.

Render a template incrementally through a set of data items:
```js
view.render(data);
```

Render a template via data and also use view-specific data/handlers:
```js
view.render(data, payload);
```

Schedule a render task asynchronously to the next animation frame:
```js
view.render(data, payload, true);
```

Schedule a render task by using a callback:
```js
view.render(data, payload, function(){
    // finished
});
```

Schedule a render task by using promises (requires option ___async___ to be enabled during initialization):
```js
view.render(data, payload).then(function(){
    // finished
});
```

Render a static template (which uses no dynamic content):
```js
view.render();
```

<a name="view.refresh"></a>
Repaint the current state of a dynamic template (which has data, requires ___store___ to be enabled):
```js
view.refresh();
```

Repaint the current state on a specific index:
```js
view.refresh(index);
```

<a name="view.create"></a>
Just create an template without adding/assigning/rendering them to the root ("orphan"):
```js
var partial = view.create(data);
```

Orphans are not a part of the internal render tree. The construction of orphans is really fast. You could also use the light version of Mikado an apply your own stack on top of this method.

<a name="modify_views"></a>
## Modify Views

<a name="view.add"></a>
Add one data item to the end:
```js
view.add(data);
```

Add one data item to a specific index (did not replace):
```js
view.add(data, 0); // add to beginning
```

<a name="view.append"></a>
Append multiple data items to the end:
```js
view.append(data);
```

Append multiple data before an index:
```js
view.append(data, 0); // append to beginning
```

<a name="view.remove"></a>
Remove a specific data item/node:
```js
view.remove(node);
```

Remove a specific template node by its index:
```js
view.remove(20);
```

Remove a range of nodes starting from a specific node/index:
```js
view.remove(20, 10);
```
```js
view.remove(node, 20);
```

Remove last 20 node items (supports reverse index):
```js
view.remove(-20, 20);
```

Remove previous 20 node items starting of a given node/index (including):
```js
view.remove(node, -20);
```

<a name="view.clear"></a>
Remove all:
```js
view.clear();
```

<a name="view.replace"></a>
Replace a data item/node:
```js
view.replace(old, new);
```

<a name="view.update"></a>
Update an single data item/node:
```js
view.update(node, data);
```

<a name="view.sync"></a>
Re-Sync DOM:
```js
view.sync();
```

Re-Sync DOM + Release Cache:
```js
view.sync(true);
```

<a name="view.purge"></a>
Purge all shared pools (factory pool and template pool):
```js
view.purge();
```

<!--
Purge shared pools from a specific template:
```js
view.purge(template);
```
-->

<a name="helpers"></a>
### Useful Helpers

<a name="view.node"></a>
Get a template root node from the DOM by index:
```js
var node = view.node(index);
```

<a name="view.data"></a>
Get a data item from the store by index:
```js
var data = view.data(index);
```

Get a data item from the store by node:
```js
var data = view.data(node);
```

<a name="view.index"></a>
Get the index from a given node:
```js
var index = view.index(node);
```

<a name="view.find"></a>
Find a node which corresponds to a data item (same reference):
```js
var node = view.find(data);
```

<a name="view.search"></a>
Find the first node which corresponds to a data item which has same content (that may requires each data item to be unique, otherwise use ___where___):
```js
var node = view.search(data);
```

<a name="view.where"></a>
Find all nodes which matches a given payload (will always return an array, empty if no results was found):
```js
var node = view.where({
    title: "foo",
    active: true,
    content: "bar"
});
```
```js
var node = view.where(data);
```

Get the length of all data items rendered (in store):
```js
var length = view.length;
```

Get the current template name which is assigned to a Mikado instance:
```js
var name = view.template;
```

<a name="manipulate"></a>
## Manipulate Views

Manual changes on the DOM may require <a href="#view.sync">re-syncing</a>. To prevent re-syncing by applying manual changes Mikado provides you several optional helper functions to manipulate the dom and also keep them in sync. Using the helper function also grants you a maximum performance.

> All helpers could be used by index or by node as passed parameters.

<a name="view.move"></a>
Move a data item/node to a specific index:
```js
view.move(node, 15);  // 15 from start
view.move(node, -15); // 15 from end
```

<a name="view.first"></a><a name="view.last"></a>
Move a data item/node to the top or bottom:
```js
view.first(node);
view.last(node);
```

<a name="view.up"></a><a name="view.down"></a>
Move a data item/node by 1 index:
```js
view.up(node);
view.down(node);
```

Move a data item/node by a specific offset (pretty much the same as ___shift___):
```js
view.up(node, 3);
view.down(node, 3);
```

<a name="view.shift"></a>
Shift a data item/node relatively by a specific offset (both directions):
```js
view.shift(node, 3);
view.shift(node, -3);
```

<a name="view.before"></a><a name="view.after"></a>
Move a data item/node before or after another data item/node:
```js
view.before(node_a, node_b);
view.after(node_a, node_b);
```

<a name="view.swap"></a>
Swap two data items/nodes:
```js
view.swap(node_a, node_b);
```

#### Some notes about helpers

Those helpers are just missing in most of other libs, although there are so useful. It is just a pain when you want to apply a simple transformation but the lib forces you to run through the whole roundtrip. Super-advanced-fine-grained reconciliation isn't the holy grail, it is just for your laziness. Luckily Mikado provides you the <a href="#benchmark">most effective reconcile</a> today, so that shouldn't be a problem.

Let's come to the most absurd part. Especially data-driven reconciliation often becomes absolutely nonsense when you dealing with __internal data__ and you start to apply changes by hand like `data.push(item)` instead of simply doing this `view.add(item)`, or `var data = store(); data[0] = item; store(data);` instead of simply doing this `view.replace(0, item)`, the latter does not need reconciliation at all and performs faster by a huge factor and also it says what it does. Now take the helper methods and imagine you would apply them via data-driven. You will end up by start coding creepy things like `data.splice(index_a, 0, data.splice(index_b, 1)[0])`. Please do me the favor, use that helpers and don't pain yourself as well as your applications performance. Your users will thank you.

<a name="cache"></a>
## DOM State Caching

Caching of DOM properties can greatly increase performance (up to 20x). There are just few situations where caching will not improve performance, it fully depends on your application.

> __Recommendation:__ enable caching when some of your data will stay unchanged from one to another render task. Disable caching when changes on data requires a fully re-render more often.

Caching is by default enabled, this may change in future, so best is to explicitly set this flag when initializing:
```js
var view = new Mikado(template, { cache: true });
```

We strongly recommended to read the next section to understand how caching is working.

#### The Concept

Let's take a simple template as an example:
```html
<root>
    <div class="active">{{ data.title }}</div>
</root>
```

The template above has just one dynamically expression. It could be rendered as follows:
```js
view.render({ title: "foobar" });
```

Assume you get new data and wants to update the view, but the new data has still the same value for _title_:
```js
view.render({ title: "foobar" });
```

This time, the property will not changed. That specific part now executes more than 10,000 times faster. Make maximum use of this strategy will speed up things amazingly.

> When caching is enabled it automatically applies for all dynamic expressions within a template by default.

So whenever you like to change one of the nodes attributes or contents (e.g. style, class, properties, dataset, etc) you just wrap this as an expression within the template and it will apply automatically.

For example, when you would like to change the classname also, then just wrap in as an expression:
```html
<root>
    <div class="{{ view.active }}">{{ data.title }}</div>
</root>
```

You do not have to use data only, you can also use a payload <a href="#view">view</a> or the <a href="#state">state</a> property. Using them right increases the flexibility of template re-using.

Now lets come to the most important part when using caching properly. Assume you have rendered the template above with caching enabled. Now you <u>manually</u> change DOM attributes:
```js
var node = document.getElementsByClassName("active")[0];
node.textContent = "manual change";
```

The changes will apply to the DOM. Now you re-render the template with the "old" state:
```js
view.render({ title: "foobar" });
```

This time the change will not apply. Because the internal cache assumes that the current value is still "foobar" and skips the change.

Basically you have 2 options in this situation:

1. do not manually change dom properties or states (instead change all through rendering templates)
2. using the <a href="#cache-helpers">caching helpers</a> which Mikado provides you exactly to this purpose.

<!--
Do not worry, there exist an rescue method to force re-sync:
```js
view.sync(); // re-sync dom nodes
```
```js
view.sync(true); // re-sync dom nodes and properties
```
-->

Please keep in mind that manual changes to the DOM has its limits:

> Generally do not __manually change__ dom properties or states which are __not covered by the template__. Changes that aren't covered by the template may gets lost when re-rendering (in few situations this will not being an issue).

<a name="cache-helpers"></a>
#### Caching Helpers

> Caching helpers will help you to bypass manual changes to the DOM without going out of sync.

You can also use these helpers for all changes to any DOM node independent of it is part of the template or not. Generally these helpers increase every DOM access. 

<a name="view.setAttribute"></a>
Set attribute of a node (will not replaces old attributes):
```js
Mikado.setAttribute(node, "href", "/foo");
```
```js
Mikado.setAttribute(node, {
    id: "foo",
    href: "/foo"
});
```

<a name="Mikado.getAttribute"></a>
Get attribute of a node:
```js
var attr = Mikado.getAttribute(node, "href");
```

<a name="Mikado.setClass"></a>
Set class name of a node (fully replaces old classes):
```js
Mikado.setClass(node, "class_a class_b");
```
```js
Mikado.setClass(node, ["class_a", "class_b"]);
```

<a name="Mikado.getClass"></a>
Get class names of a node (returns an array):
```js
var classlist = Mikado.getClass(node);
```

<a name="Mikado.setCSS"></a>
Set inline styles of a node (fully replaces old styles):
```js
Mikado.setCSS(node, "top: 0; padding-right: 10px");
```
```js
Mikado.setCSS(node, ["top: 0", "padding-right: 10px"]);
```

<a name="Mikado.getCSS"></a>
Get all inline styles of a node:
```js
var css = Mikado.getCSS(node);
```

<a name="Mikado.setStyle"></a>
Set inline styles of a node (will not replaces old styles):
```js
Mikado.setStyle(node, "padding-right", "10px");
```
```js
Mikado.setStyle(node, {"top": 0, "padding-right": "10px"});
```

<a name="Mikado.getStyle"></a>
Get a specific inline style of a node:
```js
var style = Mikado.getStyle(node, "padding-right");
```

<a name="Mikado.setText"></a>
Set text of a node:
```js
Mikado.setText(node, "This is a title.");
```

<a name="Mikado.getText"></a>
Get text of a node:
```js
var text = Mikado.getText(node);
```

<a name="Mikado.setHTML"></a>
Set inner html of a node:
```js
Mikado.setHTML(node, "<b>This is a title.</b>");
```

<a name="Mikado.getHTML"></a>
Get inner html of a node:
```js
var html = Mikado.getHTML(node);
```

<!--
<a name="view.sort"></a>
Sort data items/nodes by a field:
```js
view.sort("title");
```

Sort data items/nodes by descending order:
```js
view.sort("title", "desc");
```

Sort data items/nodes by a custom handler (should return negative, positive and zero offsets):
```js
view.sort(function(data_a, data_b){
    return data_a.time < data_b.time ? 1 : 
          (data_a.time > data_b.time ? -1 : 0)
});
```
-->

<a name="store"></a>
## Stores

Mikado provides 4 different type of stores. It is very useful to understand how they are handled.

#### 1. Internal Store

An internal store gets updated automatically by Mikado. This comes with a small extra cost. Use this store when you need a reference to the data store as an array of items which are currently rendered.

> When internal store is used, this store gets automatically updated by any of Mikados methods e.g. render/update/add/append/remove.

Enable internal store by passing the options during initialization:
```js
var view = new Mikado(template, { store: true });
```

Whenever you call the ___.render()___ function along with passed data, this data will updated (add/remove/change) to the internal store.
```js
view.render(data);
```

<a name="view.refresh"></a>
You can re-render/refresh the last/current state at any time without passing data again:
```js
view.refresh();
```

Or force an update to a specific index:
```js
view.refresh(index);
```

Or force an update to a specific node:
```js
view.refresh(node);
```

Access to the store:
```js
var store = view.store;
```

Do not de-reference the store, e.g.:
```js
var store = view.store;
// ...
store = [];
```

Instead do this:
```js
var store = view.store;
// ...
view.store = store = [];
```

<a name="options.loose"></a>
#### 2. Loose Store (Default)

When ___loose___ is enabled Mikado will use a data-to-dom binding strategy rather than keeping data separated from rendered elements/templates. This performs slightly faster and has lower memory footprint but you will also loose any data at the moment when the corresponding dom element was also removed from the screen (render stack). In most situation this is the expected behavior, but it depends on your application.

Initialize a loose store:
```js
var view = new Mikado(template, { store: true, loose: true });
```

To get a data item back from a node you cannot access `view.store[]` when ___loose___ option is enabled. You have to get the item from node or by index:
```js
var item = view.data(index);
```
```js
var item = view.data(node);
```

<a name="extern"></a>
#### 3. External/Custom Store

External stores differs from the other ones. An external store assumes to get updated from the outside and will not changed by Mikado. That means that you have to apply all changes to the external store before rendering. Use this store when:

- you like to use data-driven style
- you need sharing the data store to your application functions or libs
- you like to make the data store immutable for Mikado

> When external store is used, this store gets __not__ updated by any of Mikados methods e.g. render/update/add/append/remove.

There is one exception: when you use <a href="#proxy">proxy</a> (observable attributes), the external store will replaced by the proxyfied reference once (otherwise the proxy feature becomes useless).

You can also pass an reference to an external store. This store must be an Array-like type.
```js
var MyStore = [ /* Item Data */ ];
```

Pass in the external store when initializing:
```js
var view = new Mikado(root, template, {
    store: MyStore
});
```

#### 4. Reactive Store (Observable Array)

This is also an external store with all its attributes described above. Additionally this store reacts when indices gets changed (applies changes to DOM automatically). That makes reconciliation unnecessary but also has a noticeable extra cost for all other kind of updates. The main reason why this store is slower in the benchmark by a large margin is, that this store cannot apply a bulk of updates through a loop. It reacts at the moment the data was assigned/removed from an index. Still, this store could perform faster than all other ones depending on your application / current view.

The reactive store could also be used in a combination with the <a href="#proxy">proxy</a> feature. Using both provides you a complete reactive store where you do not need calling any of Mikados methods anymore like render/reconcile/update/add/append/remove. All this methods gets redundant, because the view is completely synchronized along the whole state of your store. This combination and how they are integrated in Mikado are unique. The "repaint" test from the benchmark ist just an empty function call and performs <a href="https://raw.githack.com/nextapps-de/mikado/master/bench/#modes">astronomical</a>.

Read the documentation about this kind of store <a href="#observable">here</a>.

<a name="export"></a>
#### Export / Import Views

<a name="view.export"></a>
You can export the data of a view to the local store.
```js
view.export();
```

<a name="view.import"></a>
You can import and render the stored data by:
```js
view.import().render();
```

> When exporting/importing templates, the ID is used as key. The template ID corresponds to its filename.

Actually you cannot export several instances of the same template which holds different data. Also the ___state___ is not included in the export.

<a name="view.state"></a>
## State

State pretty much acts like passing a <a href="#view.view">view</a> payload when rendering templates. State also holds an object but instead used to keep data across runtime. State data are also shared across all Mikado instances. State is directly assigned to each Mikado instance and do not has to pass during rendering. This all differ from using view payloads.

Define state properties:
```js
view.state.date = new Date();
view.state.today = function(){ return view.state.date === new Date() };
```

You can assign any value as state or function helpers. Do not de-reference the state from the Mikado instance. When using ___export()___ the state will just export non-object and non-functional values. You need to re-assign them when the application starts.

Using extern states:
```js
var state = {
    date: new Date(),
    today: function(){ return view.state.date === new Date() }
};
```
Assign extern states during initialization:
```js
var view = new Mikado(root, template, {
    state: state
});
```

<a name="callbacks"></a>
## Callbacks

Apply callbacks during initialization:
```js
var view = new Mikado(root, template, {
    on: {
        create: function(node){ console.log("created:", node) },
        insert: function(node){ console.log("inserted:", node) },
        update: function(node){ console.log("updated:", node) },
        change: function(node){ console.log("changed:", node) },
        remove: function(node){ console.log("removed:", node) },
    }
});
```

<table>
    <tr></tr>
    <tr>
        <td>Callback</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>create</td>
        <td>Called when a new template node was created.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>add</td>
        <td>Called when a new template node was added.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>update</td>
        <td>Called when a template node was updated.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>change</td>
        <td>Called when the contents of a template node has changed.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>remove</td>
        <td>Called when a template node was removed.</td>
    </tr>
</table>

<a name="load"></a>
## Transport / Load Templates

> Mikado fully supports server-side rendering. The template (including dynamic expressions) will compile to plain compatible JSON.

If your application has a lot of views, you can save memory and performance when loading them at the moment a user has requested this view.

> Templates are shared across several Mikado instances.

Load template asynchronously into the global cache:
```js
Mikado.load("https://my-site.com/tpl/template.json", function(error){
    if(error){
        console.error(error);
    }
    else{
        console.log("finished.");
    }
});
```

Load template asynchronously with Promises into the global cache:
```js
Mikado.load("https://my-site.com/tpl/template.json", true).then(function(){

    console.log("finished.");

}).catch(function(error){

    console.error(error);
});
```

Load template synchronously by explicit setting the callback to false:
```js
Mikado.load("https://my-site.com/templates/template.json", false);
```

Assign template to a new Mikado instance, mount and render:
```js
var view = Mikado.new("template");
view.mount(document.body).render(data);
```

__.load()__ loads and initialize a new template to an existing Mikado instance:
```js
view.load("https://my-site.com/templates/template.json");
```

__.init()__ assigns a new template to an instance:
```js
view.init("template");
```

__.mount()__ assigns a new root destination to an instance:
```js
view.mount(document.getElementById("new-root"));
```

__.unload()__ unloads a template by name (filename):
```js
view.unload("template");
```

Chain methods:
```js
view.mount(document.body).init("template").render(data);
```

<a name="static"></a>
## Static Templates

When a template has no dynamic expressions (within curly brackets) which needs to be evaluated during runtime Mikado will handle those templates as _static_ and skips the dynamic render part. Static views could be rendered without passing data.

<a name="mikado.once"></a>
#### Once (One-time rendering)
When a template just needs to be rendered once you can create, mount, render, unload and destroy (full cleanup) as follows:
```js
Mikado.new(template)
      .mount(root)
      .render()
      .unload() // unload before destroy!
      .destroy();
```

Destroy has a parameter flag to automatically unload before destroy:
```js
Mikado.new(root, template)
      .render()
      .destroy(true);
```

You can also simply use a shorthand function:
```js
Mikado.once(root, template); // static view
```
```js
Mikado.once(root, template, data); // dynamic view
Mikado.once(root, template, data, payload, callback);
```

When destroying a template, template definitions will still remain in the global cache. Maybe for later use or when another instances uses the same template (which is generally not recommended).

When unloading templates explicitly the template will also removes completely. The next time the same template is going to be re-used it has to be re-loaded and re-parsed again. In larger applications it might be useful to unload views to free memory when they was closed by the user.

<a name="compiler-service"></a>
## Compiler Service / Live Templates

Mikado provides you a webserver to serve templates via a simple RESTful API. This allows you to send views live from a server. Also this can be used for live reloading templates in a local development environment.

Install Mikado Server via NPM:
```npm
npm install mikado-server
```

Start the compiler server:

```cmd
npx mikado-server
```

<!--
Instead of `npx mikado server` you can also use `npx mikado-server` alternatively.
-->

The service is listening on localhost. The API has this specification:

`{host}:{port}/:type/path/to/template.html`

Examples:
- localhost:3000/json/template/app.html
- localhost:3000/json/template/app (_WIP_)
- localhost:3000/template/app.json (_WIP_)

They all have same semantics, you can use different forms for the same request.

Types:
<table>
    <tr>
        <td><b>json</b></td>
        <td>Assign them manually via <a href="#mikado.register">Mikado.register</a> or just render the template <a href="#mikado.once">once</a>.</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>es6</b></td>
        <td>Import as an ES6 compatible module.</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>module</b></td>
        <td>A synonym for es6.</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>es5</b></td>
        <td>Uses Mikado from the global namespace. This requires a non-ES6 build of mikado or import "bundle.js", both <u>before</u> loading this template.</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>js</b></td>
        <td>A synonym for es5.</td>
    </tr>
</table>

<a name="localdev"></a>
#### Local Development

The compiler service is also very useful to render templates ony the fly when modifying the source code. Use a flag to switch between development or production environment in your source code, e.g.:

```js
// production:
import tpl_app from "./path/to/app.es6.js";
let app;

if(DEBUG){
    // development:
    Mikado.load("http://localhost:3000/json/path/to/app.html", false);
    app = Mikado.new("app");
}
else{
    app = Mikado.new(tpl_app);
}

// same code follows here ...
```

You can also import them as ES6 modules directly via an asynchronous IIFE:
```js
let tpl_app;

(async function(){
    if(DEBUG){
        // development:
        tpl_app = await import('http://localhost:3000/es6/path/to/app.html');
    }
    else{
        // production:
        tpl_app = await import("./path/to/app.html");
    }
}());

// same code follows here ...
const app = Mikado.new(tpl_app);
```

#### Server-Side Rendering (SSR)

_WIP_

Use the json format to delegate view data from server to the client. Actually just static templates are supported. An express middleware is actually in progress to create templates with dynamic expressions.

<a name="includes"></a>
## Includes

Partials gets its own instance under the hood. This gains performance and also makes template factories re-usable when same partials are shared across different views.

> Be aware of circular includes. A partial cannot include itself (or later in its own chain). Especially when your include-chain growths remember this rule.

Assume you've created a partial template. Make sure the template is providing one single root as the outer bound.

You have to register all partial templates once __before__ you initialize the templates which will including them:
```js
import tpl_header from "./tpl/header.es6.js";
import tpl_article from "./tpl/article.es6.js";
import tpl_footer from "./tpl/footer.es6.js";

Mikado.register(tpl_header);
Mikado.register(tpl_article);
Mikado.register(tpl_footer);
```

When using templates in ES5 compatible format, they are automatically registered by default. You can also use the runtime compiler and pass the returned template to the register method.

Now you can include partials with a pseudo element:
```html
<section>
    <include>{{ header }}</include>
    <include>{{ article }}</include>
    <include>{{ footer }}</include>
</section>
```

Use the template name (filename) for includes.

> The pseudo element ___\<include\>___ will extract into place and is not a part of the component. You cannot use dynamic expressions within curly brackets, just provide the name of the template.

Equal to:
```html
<section>
    <include from="header"></include>
    <include from="article"></include>
    <include from="footer"></include>
</section>
```

> You __can't__ use self-closing custom elements accordingly to the HTML5 specs e.g. `<include from="title"/>`.

You can also include to a root node which is part of the component by an attribute:
```html
<section>
    <header include="header"></header>
    <article include="article"></article>
    <footer include="footer"></footer>
</section>
```

<a name="loop-partials"></a>
### Loop Partials

Assume the template example from above is a tweet (title, article, footer).

```html
<section>
    <title>{{ data.title }}</title>
    <tweets include="tweet" for="data.tweets">
        <!-- tweet -->
        <!-- tweet -->
        <!-- tweet -->
    </tweets>
</section>
```

This expression will render the template "tweet" through an array of data items/tweets. The template "tweet" is getting the array value ___data.tweets___ as ___data___.

The ___max___ attribute could be used optionally to limit the partial loop:
```html
<tweets include="tweet" for="data.tweets" max="5">
```

The ___max___ attribute could also be negative to reverse the boundary direction, e.g. loop through the last 5 items:
```html
<tweets include="tweet" for="data.tweets" max="-5">
```

<a name="inline-loops"></a>
### Inline Loops

You can also loop through an inline partial. Mikado will extracting and referencing this partial to its own instance under the hood.

```html
<main>
    <title>{{ data.title }}</title>
    <tweets for="data.tweets">
        <section>
            <header include="header"></header>
            <article include="article"></article>
            <footer include="footer"></footer>
        </section>
    </tweets>
</main>
```

You can also nest loops:
```html
<tweets for="data.tweets">
    <tweet>
        <h1>{{ data.title }}</h1>
        <title>Comments:</title>
        <div for="data.comments">
            <comment>
                <p>{{ data.content }}</p>
                <title>Replies:</title>
                <div for="data.replies">
                    <p>{{ data.content }}</p>
                </div>
            </comment>
        </div>
    </tweet>
</tweets>
```

> Every looped partial has to provide __one single root__ as the outer bound.

In this example every for-expression is wrong (you will find the right example above):
```html
<tweets for="data.tweets">
    <h1>{{ data.title }}</h1>
    <title>Comments:</title>
    <div for="data.comments">
        <p>{{ data.content }}</p>
        <title>Replies:</title>
        <div for="data.replies">
            {{ data.content }}
        </div>
    </div>
</tweets>
```

<a name="conditional" id="conditional"></a>
## Conditional Branches

```html
<main if="data.tweet.length">
    <title>Tweets: {{ data.tweet.length }}</title>
</main>
<main if="!data.tweet.length">
    <title>No tweets found.</title>
</main>
```

```html
<main>
    <title>{{ data.title }}</title>
    <tweets if="data.tweets.length" for="data.tweets">
        <section>{{ data.content }}</section>
    </tweets>
</main>
```

```html
<main>
    <title>{{ data.title }}</title>
    <tweets for="data.tweets">
        <section if="data.content">{{ data.content }}</section>
    </tweets>
</main>
```

Think in real code branches, instead of doing this:
```html
<main>
    {{@ var result = (function(){
        return "some big computation";
    }()) }}
    <section if="data.content">{{ result }}</section>
</main>
```

Doing this:
```html
<main>
    <section if="data.content">
        {{ (function(){
            return "some big computation";
        }()) }}
    </section>
</main>
```

> Conditional branches will skip its expressions when not taken.

As well as try to assign computations outside a loop:
```html
<main>
    {{@ var result = data.tweets.length && (function(){
        return "some big computation";
    }()) }}
    <tweets for="data.tweets">
        <section>{{ result }}</section>
    </tweets>
</main>
```

<a name="proxy" id="proxy"></a>
## Reactive Proxy (Observer)

Mikado provides you a reactive way to listen and apply changes of data to the DOM. It is based on the new ES6 proxy feature which gives awesome performance and fully falls back to classical observer when proxy is not available. Using an reactive strategy can additionally boost performance beyond a factor of 100 when updating data. It depends on you application / current view: this feature has an advantage when updating data has to process more often than creating new.

__Template markup__:
```html
<table>
    <tr>
        <td>Name:</td>
        <td>{{= data.name }}</td>
    </tr>
    <tr>
        <td>Email:</td>
        <td>{{= data.email }}</td>
    </tr>
</table>
```

> The expression for an observable property has to start with: `{{=`

Using proxy requires using one of the 3 store strategies.

__1. Use with internal store:__
```js
var view = new Mikado(template, { store: true });
view.render([...]);
```

When data changes, the corresponding dom element will automatically change:
```js
view.store[0].name = "New Name";
```

__2. Use with external store:__
```js
var data = [...];
var view = new Mikado(template, { store: data });
view.render(data);
```

When data changes, the corresponding dom element will automatically change:
```js
data[0].name = "New Name";
```
```js
view.store[0].name = "New Name";
```

__3. Use with loose store:__
```js
var view = new Mikado(template, { store: true, loose: true });
view.render([...]);
```

When data changes, the corresponding dom element will automatically change:
```js
view.data(0).name = "New Name";
```

<a name="limitations"></a>
### Limitations

Proxy actually comes with some limitations on template expressions. Improving those restrictions is already work in progress and will release soon.

1.&nbsp;Fields from deeply nested data objects are not reactive:
```js
var data = {
    id: "foobar", // <-- observable
    content: {    // <-- observable
        title: "title",  // <-- not
        body: "body",    // <-- not
        footer: "footer" // <-- not
    }
};
```

2.&nbsp;Conditional or advanced template expressions are not supported:
```html
<table>
    <tr>
        <td>Name:</td>
        <!-- Supported: -->
        <td>{{= data.name }}</td>
    </tr>
    <tr>
        <td>Tweets:</td>
        <!-- Not Supported: -->
        <td>{{= data.tweets ? data.tweets.length : 0 }}</td>
    </tr>
</table>
```

Just use plain property notation within curly brackets.

<a name="stealth"></a>
### Stealth Mode

Whenever __all__ your template expressions are just using proxy notation it enables the "stealth" mode which boost performance from every update process to the absolute maximum. This mode has no advantage when every render loop has to apply new items.

This enables stealth mode:
```html
<item>
    <caption>Name:</caption>
    <p>{{= data.name }}</p>
    <caption>Email:</caption>
    <p>{{= data.mail }}</p>
</item>
```

This not:
```html
<item>
    <caption>Name:</caption>
    <p>{{= data.name }}</p>
    <caption>Email:</caption>
    <p>{{ data.mail }}</p>
</item>
```

Also using conditionals, loops and inline javascript will prevent from switching to the stealth mode. Just includes (without loop) could be used additionally to the proxy notation, but it requires all fields also observed by the partial which is included.

<a name="observable"></a>
### Observable Array (Virtual NodeList)

Additionally to react on changes of properties you can create an observable Array which acts like a synchronized NodeList. It uses ES6 Proxy under the hood which fully falls back to classical observer, when not available.

> Semantically the observable Array is equal to an array-like Javascript array.

Create an observable array:
```js
var array = Mikado.array();
```

Create an observable array with initial data:
```js
var items = [...];
var array = Mikado.array(items);
```

Bind this store to a Mikado instance:
```js
var view = Mikado(target, template, { store: array });
```

Now the observable array ist linked with your instance. Whenever you change the array all changes applies automatically to the corresponding template.

You can use all common array built-ins, e.g.:
```js
array.push({ ... });
```
```js
var last = array.pop();
```
```js
array.unshift({ ... });
```
```js
array.splice(0, 1, { ... });
```

The best is you can __get and set via array index access__ which is a rare available feature (including non-proxy fallback):
```js
array[0] = { ... };
```
```js
array[array.length] = { ... };
```
```js
var first = array[0];
```

A list of all supported array prototypes:
- length
- push
- pop
- shift
- unshift
- slice
- splice
- concat
- indexOf
- lastIndexOf
- filter
- map
- reverse
- sort
- swap

These methods are basically implemented, without some extensions like parameter chaining. They may come in a future update .e.g `array.push(a, b, c)` is not available, instead you have to call push for each item on by one.

The method `array.swap(a, b)` is an optionally performance shortcut.

There are some methods which differs slightly from the original implementation. These methods will apply changes ___in place___ and returning the original reference instead of applying on a copy:

- concat
- filter
- map

When you need the original behavior you can simply do that by:
```js
var new_array = [ ... ];
var copy = Array.prototype.concat.call(array, new_array);
```
```js
var copy = Array.prototype.filter.call(array, function(){ ... });
```

There is a limitation when falling back to the non-proxy polyfill. You cannot fill sparse arrays or access indexes which are greater than the current `array.length`. There is just one undefined index which could always accessed (by read/write) that is the last "undefined" index on an array when you call `array[array.length]`. This index is a special marker which increase the "virtual" array size. Whenever you assign a value to this special index the size of the observable index growth automatically and the next "undefined" index in the queue becomes this marker. This limitation is not existing when ES6 proxy is available.

Also there are some drawbacks when reflection is used:
```js
var array = Mikado.array();
console.log(array.constructor === Array); // -> false
console.log(array.prototype === Array.prototype); // -> false
console.log(array instanceof Array); // -> false
```

The proxy feature theoretically allows those reflection but could not be used to keep the polyfill working in addition of sharing mostly of the same codebase.

<a name="bind" id="bind"></a>
## Bind Input Elements

_WIP (release when reaching 2500 Github stars)_

The attribute ___bind___ provides you a 2-way-binding of input elements with your data store.

```html
<main>
    <input type="text" bind="{{ data.name }}">
    <input type="checkbox" bind="{{ data.status }}">
    <input type="radio" value="female" bind="{{ data.gender }}">
    <input type="radio" value="male" bind="{{ data.gender }}">
</main>
```

When data is changed, the input elements will automatically update, as well as other turn around, when the input elements gets new data the store will automatically update.

<a name="best-practices"></a>
## Best Practices

A Mikado instance has a stronger relation to the template as to the root element. Please keep this example in mind:

This is good:
```js
var view = new Mikado(template);

view.mount(root_a).render(data);
view.mount(root_b).render(data);
view.mount(root_c).render(data);
```

This is okay, but instead of this:
```js
view.mount(root);
view.init(tpl_a).render(data);
view.init(tpl_b).render(data);
view.init(tpl_c).render(data);
```

Doing this:
```js
var view_a = new Mikado(tpl_a);
var view_b = new Mikado(tpl_b);
var view_c = new Mikado(tpl_c);

view_a.mount(root_c).render(data);
view_b.mount(root_b).render(data);
view_c.mount(root_a).render(data);
```

Ideally every template should have initialized by one Mikado instance and should be re-mounted when using in another context. Re-mounting is very fast but re-assigning templates is not as fast.

<a name="memory"></a>
#### Memory Optimizations

<!--
IT might be useful to understand the memory allocation of several settings.

The absolute lowest memory footprint (when idle):
```js
var view = new Mikado(template, { 
    store: false,
    cache: false, 
    pool: false,
    prefetch: false
});
```

The most memory efficient memory allocation (during runtime):
```js
var view = new Mikado(template, { 
    cache: true, 
    pool: true
});
```

Mikado provides you some helpers to apply manually to get the most out of both. Stick with the second example above (enable ___cache___ and ___pool___).
-->

Clear shared pools of the current template:
```js
view.purge();
```

<!--
Clear shared pools of all templates:
```js
Mikado.purge();
```

Clear shared pools of a specific template:
```js
Mikado.purge(template);
```
-->

Clear cache:
```js
view.sync(/* uncache? */ true);
```

Destroy a view:
```js
view.destroy();
```

Unload/unregister a template definition:
```js
view.unload();
```

Destroy a view + unload:
```js
view.destroy(/* unload? */ true);
```

<a name="reconcile"></a>
## Reconcile (Diffing)

Mikado comes with its own new diffing algorithm which gains performance of reconcile/re-arrangement. The algorithm is based on a concept <a href="https://github.com/nextapps-de/mikado/blob/master/doc/reconcile.md#2-longest-distance">"Longest Distance"</a> which was invented by me, the author of this library. I also discovered two other concepts from scratch from where I have also implemented the <a href="https://github.com/nextapps-de/mikado/blob/master/doc/reconcile.md#3-3-way-splice">"3-Way-Splice"</a>, but longest distance has slightly better overall performance. Although by a very small margin. Theoretically the splice concept has some advantages but it isn't that easy to make them capable.

Mikados reconcile provides you the most effective diffing today (you can take the row "order" from the <a href="#benchmark">benchmark</a> as a reference).

<a name="concept"></a>
## Concept of Shared Pools

The are four kinds of synchronized pools under the hood. Three of them are shared across all template instances to make them re-usable. That also save memory and skip redundant re-calculations.

<br><img src="https://cdn.jsdelivr.net/gh/nextapps-de/mikado@3fb04d360aa4c7280cd8e7dd4f401a462132780f/doc/concept.svg" alt="Mikado Shared Pool (Concept)"><br><br>

#### Factory Pool

The factory pool shares partials or same template definitions. When partials or templates are used more than once they will point to the same instance. That will save memory, skip redundant re-calculations and also improve runtime execution, because different jobs can now run through the same process (less reference spread).

#### Template Pool

The template pool is a feature accordingly to the option <a href="#reuse">reuse</a> and extends the strategy of re-using. Templates has to be created by the factory just <u>once</u> and stay available for re-using along the whole runtime.

#### Keyed Pool

The keyed pool is basically the same concept like template pool, but it has keyed access and works differently than the template pool (which is queued and has indexed access). The keyed pool and the template pool are synchronized. It depends on the options which was set.

#### Live Pool

The live pool contains all elements which are actually rendered on screen (in use). That will keep track of not sharing elements which are already in use by another view. When elements were removed, they will move from live pool to the shared pools. When the option ___reuse___ was set to false, the live pool will also share its elements to the next render loop of the same view.

#### Some notes about pools

Pooling just extends concepts which are already exist/used:

1. The queued pool extends the feature of "recycling" (reusing) nodes
2. The keyed pool extends the feature of keeping components which are referential keyed

_"Does pooling have any advantages?"_ yes, absolutely. Otherwise recycling or keyed wouldn't have any advantage at all. So semantically there is nothing changed when using pools.

_"How does pooling improve performance?"_ the benchmark suite from here gets a benefit in 4 from 11 test cases by using pools (create, replace, append, toggle). In all other tests pooling has no effect, except it has an extra cost because of applying pool transitions. But that isn't the main essence behind pools. Everyone who is thinking pooling exist to just boost this benchmark did not understand this <a href="#concept">concept</a>. The most important capability of Mikados pools isn't covered by any of this tests yet. Because the true advantage comes in when using partials, includes and partial loops. But those aren't strictly compared anywhere. If there was a benchmark which measures the performance of partial loops and __mixin them in different contexts__ (by example) I'm pretty sure, that Mikado gains an astronomical performance factor over all others. Sadly I haven't the time to provide such a comparison. In the future someone might be release a benchmark which covers this case, I would go in immediately.

## Motivation

This library was build by reversed engineering with these primary goals as its base:
1. providing a clean, simple and non-cryptic tool for developers who focus on living standards and common styles
2. designer-readable templates based on pure html (most famous and compatible markup in the web)
3. providing the best overall performance
4. can be flexibly integrated into every stack

## Milestones
There are some features in draft and it points out that those features requires more effort to implement. I need some motivation, so I will wait for this library gets more popular.
<table>
    <tr>
        <td>1000&nbsp;Github&nbsp;Stars</td>
        <td>Providing pseudo attributes <b>else</b> and <b>elseif</b> within templates to chain conditionals.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>2500&nbsp;Github&nbsp;Stars</td>
        <td>New attribute <a href="#bind">bind</a> for input elements (reactive 2-way binding of input elements).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>5000&nbsp;Github&nbsp;Stars</td>
        <td>Express middleware / standalone webserver for high performance bi-directional server-side rendering (SSR).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>10k&nbsp;Github&nbsp;Stars</td>
        <td>A reboot of <a href="https://github.com/nextapps-de/xone">Xone</a> on top of Mikado. Xone is a full-stack mobile application SDK which seamlessly runs in browser and also supports Cordova and NativeScript from the same codebase.</td>
    </tr>
</table>

<a name="builds" id="builds"></a>
## Custom Builds

Perform a full build:
```bash
npm run build
```

Perform a light build:
```bash
npm run build:light
```

Perform a custom Build:
```bash
npm run build:custom ENABLE_CACHE=false LANGUAGE_OUT=ECMASCRIPT5 USE_POLYFILL=true
```

> On custom builds each build flag will be set to _false_ by default.

The custom build will be saved to dist/mikado.custom.xxxxx.js (the "xxxxx" is a hash based on the used build flags).

The destination folder of the build is: _/dist/_

##### Supported Build Flags

<table>
    <tr></tr>
    <tr>
        <td>Flag</td>
        <td>Values</td>
        <td>Info</td>
    </tr>
    <tr>
        <td>DEBUG</td>
        <td>true, false</td>
        <td>Log debugging infos</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_CACHE</td>
        <td>true, false</td>
        <td>DOM Cache</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_EVENTS</td>
        <td>true, false</td>
        <td>Template event bindings</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_STORAGE</td>
        <td>true, false</td>
        <td>Template data binding</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_HELPERS</td>
        <td>true, false, string</td>
        <td>DOM Manipulation helpers (supports comma separated string)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_CACHE_HELPERS</td>
        <td>true, false</td>
        <td>DOM Cache helpers</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_ASYNC</td>
        <td>true, false</td>
        <td>Asynchronous rendering (Promise Support)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_TRANSPORT</td>
        <td>true, false</td>
        <td>Load templates through the network</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_TEMPLATE_EXTENSION</td>
        <td>true, false</td>
        <td>Use loops, includes and conditionals within templates</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_REACTIVE</td>
        <td>true, false</td>
        <td>Use reactive data binding</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_COMPILE</td>
        <td>true, false</td>
        <td>Use runtime template compiler</td>
    </tr>
    <tr>
        <td><br><b>Compiler Flags</b></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>USE_POLYFILL</td>
        <td>true, false</td>
        <td>Include Polyfills (based on Ecmascript 5)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>LANGUAGE_OUT<br><br><br><br><br><br><br><br></td>
        <td>ECMASCRIPT3<br>ECMASCRIPT5<br>ECMASCRIPT5_STRICT<br>ECMASCRIPT6<br>ECMASCRIPT6_STRICT<br>ECMASCRIPT_2015<br>ECMASCRIPT_2017<br>STABLE</td>
        <td>Target language</td>
    </tr>
</table>

<!-- Crafted for the next decade of high performance applications. Forgot everything you may ever heard about web templating performance. -->

---

Copyright 2019 Nextapps GmbH<br>
Released under the <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache 2.0 License</a><br>

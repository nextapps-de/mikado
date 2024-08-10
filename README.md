<h1><img src="https://cdn.jsdelivr.net/gh/nextapps-de/mikado@master/doc/mikado-animated.svg?v=3" alt="Mikado - Webs fastest templating engine" width="550px"><p></p></h1>
<h3>Mikado is the webs fastest template engine for building user interfaces. Carefully crafted to get the most out of the browser. Also providing the fastest Express Render Engine of today. Super-lightweight, outstanding performance, no dependencies.</h3>

<a target="_blank" href="https://www.npmjs.com/package/mikado"><img src="https://img.shields.io/npm/v/mikado.svg"></a>
<img src="https://img.shields.io/badge/build-passing-brightgreen">
<img src="https://img.shields.io/badge/coverage-90%25-brightgreen">
<img src="https://img.shields.io/badge/typed-93%25-brightgreen">
<a target="_blank" href="https://github.com/nextapps-de/mikado/issues"><img src="https://img.shields.io/github/issues/nextapps-de/mikado.svg"></a>
<a target="_blank" href="https://github.com/nextapps-de/mikado/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/mikado.svg"></a>

<a href="#get-started">Getting Started</a> &ensp;&bull;&ensp;
<a href="#options">Options</a> &ensp;&bull;&ensp;
<a href="#api">API</a> &ensp;&bull;&ensp;
<a href="#benchmark">Benchmark</a> &ensp;&bull;&ensp;
<a href="#compiler">Template Compiler</a> &ensp;&bull;&ensp;
<a href="#ssr">Server-Side-Rendering</a> &ensp;&bull;&ensp;
<a href="#express">Express Render Engine</a> &ensp;&bull;&ensp;
<a href="#proxy">Reactive</a> &ensp;&bull;&ensp;
<a href="#hydration">Hydration</a> &ensp;&bull;&ensp;
<a href="#shadow">Web Components (Shadow DOM)</a> &ensp;&bull;&ensp;
<a href="CHANGELOG.md">Changelog</a>

When you are coming from any previous version: <a href="doc/migrate-0.8.md">Migration Guide 0.8.x</a>

**Benchmark:**

- <a href="#benchmark">Stress Test Benchmark</a>
- https://krausest.github.io/js-framework-benchmark/current.html

**Demo:**

- TodoMVC App: <a href="examples/todomvc/">Project</a>&ensp;/&ensp;<a href="examples/todomvc/src/">Source</a>&ensp;/&ensp;<a href="https://raw.githack.com/nextapps-de/mikado/master/examples/todomvc/dist/index.html">Demo</a>

<!--
1. <a href="demo/basic/basic.html">Basic Example + Runtime Compiler (HTML5 Template)</a>
2. <a href="demo/basic/compiler.html">Basic Example + Runtime Compiler (String Template)</a>
3. <a href="demo/basic/demo.html">Basic Example + Events (ES5)</a>
4. <a href="demo/basic/demo.es6.html">Basic Example + Events (ES6 Modules)</a>
5. <a href="demo/basic/demo.dev.html">Basic Example + Events (Development Sources)</a>
6. TodoMVC App: <a href="demo/todomvc/">Source Code</a>&ensp;/&ensp;<a href="https://raw.githack.com/nextapps-de/mikado/master/demo/todomvc/index.html">Run Demo</a>
7. js-framework-benchmark: <a href="https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/keyed/mikado">keyed</a>&ensp;/&ensp;<a href="https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/non-keyed/mikado">non-keyed</a>&ensp;/&ensp;<a href="https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/keyed/mikado-proxy">keyed (proxy)</a>
-->

## Support this Project

Mikado was getting so much positive feedback and also feature requests. Help keeping Mikado active by a personal donation.

<a href="https://opencollective.com/mikado/donate" target="_blank" style="margin-right: 10px"><img src="doc/opencollective.png" height="32" alt="Donate using Open Collective"></a>
<a href="https://github.com/sponsors/ts-thomas/" target="_blank" style="margin-right: 10px"><img src="doc/github-sponsors.png" height="32" alt="Donate using Github Sponsors"></a>
<a href="https://liberapay.com/ts-thomas/donate" target="_blank" style="margin-right: 10px"><img src="doc/liberapay.svg" height="32" alt="Donate using Liberapay"></a>
<a href="https://www.patreon.com/user?u=96245532" target="_blank" style="margin-right: 10px"><img src="doc/patron.png" height="32" alt="Donate using Patreon"></a>
<a href="https://salt.bountysource.com/teams/ts-thomas" target="_blank" style="margin-right: 10px"><img src="doc/bountysource.svg" height="32" alt="Donate using Bountysource"></a>
<a href="https://www.paypal.com/donate/?hosted_button_id=GEVR88FC9BWRW" target="_blank"><img src="doc/paypal.png" height="32" alt="Donate using PayPal"></a>

## Table of contents

Rendering has great **impact** on application performance, especially **on mobile devices**. Mikado takes <a href="#benchmark">templating performance</a> to a new level and provides you **keyed**, **non-keyed** recycling and also **reactive paradigm** switchable out of the box.
Additionally, Mikado provides a **server-side-rendering** approach on a top-notch performance level along full support for **hydration** to inject templates progressively within the client's runtime.
Server and client are sharing the same template definitions simply written in **HTML-like markup**.
The server side approach will also come with the **fastest middleware render engine for Express** you can get today.
Packed with a smart routing feature for event delegation and full support for web components by using the Shadow DOM, Mikado gives you everything you'll need to build <a href="#concept">realtime applications</a> on a cutting edge performance level.

1. <a href="#get-latest">Get Latest</a>
2. <a href="#feature-comparison">Feature Comparison: Mikado Light</a>
3. <a href="#benchmark">Benchmark Ranking (Rendering Performance)</a>
4. <a href="#api">API Overview</a>
5. <a href="#options">Mikado Options</a>
6. <a href="#get-started">Getting Started (Basic Example)</a>
7. <a href="#conventions">Rules and Conventions</a>
8. <a href="#advanced_example">Advanced Example</a>
9. <a href="#compiler">Template Compiler</a>
    - <a href="#identifier">Reserved Keywords</a>
    - <a href="#compiler-flags">Compiler Flags</a>
    - <a href="#auto-naming">Auto Naming</a>
    - <a href="#prebuilt-cache">Prebuilt Cache</a>
    - <a href="#watcher">Watcher (Auto-Compile)</a>
    - <a href="#runtime-compiler">Runtime Compiler</a>
10. <a href="#expressions">Template Expressions</a>
    - <a href="#insertion">Value Insertion</a>
    - <a href="#inline-js">JS Inline Code</a>
    - <a href="#truthy">Truthy Values</a>
    - <a href="#escape-ssr">Escape Values (SSR)</a>
    - <a href="#html">HTML Contents</a>
    - <a href="#sanitize">Sanitizer</a>
    - <a href="#bindings">Reactive Bindings</a>
11. <a href="#event">Routing & Event Delegation</a>
    - <a href="#bubbling">Event Bubbling</a>
    - <a href="#event-cache">Event Cache</a>
    - <a href="#view.listen">Explicit Register Event Delegation</a>
    - <a href="#event-control">Control Native Events</a>
    - <a href="#view.dispatch">Dispatch Routes</a>
12. Recycling Modes:
    - <a href="#non-keyed">Non-Keyed Recycling</a>
    - <a href="#keyed">Keyed Recycling</a>
13. Views:
    - <a href="#mikado.new">Create Views</a>
    - <a href="#view.mount">Mount Views</a>
    - <a href="#view.destroy">Destroy Views</a>
    - <a href="#view.render">Render Templates</a>
    - <a href="#view.create">Create Components</a>
    - <a href="#modify-views">Modify Views</a>
    - <a href="#helpers">Common View Helpers</a>
    - <a href="#manipulate">Manipulate Views</a>
14. <a href="#cache">DOM State Caching</a>
    - <a href="#cache-concept">State Caching Concept</a>
    - <a href="#cache-helpers">DOM Cache Helpers</a>
15. <a href="#view.state">View State</a>
16. <a href="#callbacks">Custom Callbacks</a>
17. <a href="#static">Static Templates</a>
    - <a href="#mikado.once">Once (One-time rendering)</a>
18. <a href="#ssr">Server-Side Rendering (SSR)</a>
    - <a href="#ssr-exclusive">SSR-exclusive Mode</a>
19. <a href="#express">Express Render Engine</a>
    - <a href="#express-options">Custom Options</a>
    - <a href="#express-render">Render Views</a>
20. Template Features:
    - <a href="#expressions">Template Expressions</a>
    - <a href="#includes">Includes</a>
    - <a href="#loop-partials">Loop Partials</a>
    - <a href="#inline-loops">Inline Loops</a>
    - <a href="#conditional">Conditional Template Structures</a>
21. Reactive Features:
    - <a href="#proxy">Reactive Properties (Proxy)</a>
    - <a href="#observable">Reactive Array (Virtual NodeList)</a>
    - <a href="#limitations">Limitations</a>
    - <a href="#strict-proxy">Strict-Proxy Mode</a>
    - <a href="#array.transaction">Transactions</a>
22. <a href="#pools">Template Pools</a>
23. <a href="#hydration">Hydration</a>
24. <a href="#shadow">Web Components (Shadow DOM)</a>
25. <a href="#full-template">Full Template Example</a>
26. <a href="#best-practices">Best Practices</a>
27. <a href="#concept">Concept of Shared Components</a>
28. <a href="#builds">Custom Builds</a>
    - <a href="#build-flags">Supported Build Flags</a>

<a name="get-latest"></a>

## Get Latest

> Do not use the "src" folder of this repo. It isn't meant to be used directly, instead it needs compilation. You can easily perform a <a href="#builds">custom build</a>, but don't use the source folder for production. You will need at least any kind of compiler which resolve the compiler flags within the code. The "dist" folder is containing every version which you probably need including unminified modules.

<table>
    <tr></tr>
    <tr>
        <td>Build</td>
        <td>File</td>
        <td>CDN</td>
    </tr>
    <tr>
        <td>mikado.bundle.debug.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/mikado.bundle.debug.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.bundle.debug.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.bundle.debug.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.bundle.min.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/mikado.bundle.min.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.bundle.min.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.bundle.min.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.bundle.module.debug.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/mikado.bundle.module.debug.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.bundle.module.debug.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.bundle.module.debug.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.bundle.module.min.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/mikado.bundle.module.min.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.bundle.module.min.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.bundle.module.min.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.es5.debug.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/mikado.es5.debug.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.es5.debug.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.es5.debug.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.es5.min.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/mikado.es5.min.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.es5.min.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.es5.min.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.light.debug.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/mikado.light.debug.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.light.debug.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.light.debug.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.light.min.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/mikado.light.min.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.light.min.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.light.min.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.light.module.debug.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/mikado.light.module.debug.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.light.module.debug.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.light.module.debug.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.light.module.min.js</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/mikado.light.module.min.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.light.module.min.js" target="_blank">https://rawcdn.githack.com/nextapps-de/mikado/0.8.4/dist/mikado.light.module.min.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>Javascript Modules</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/module/" target="_blank">Download</a></td>
        <td><a href="https://github.com/nextapps-de/mikado/tree/0.8.4/dist/module" target="_blank">https://github.com/nextapps-de/mikado/tree/0.8.4/dist/module</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>Javascript Modules (Minified)</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/module-min/" target="_blank">Download</a></td>
        <td><a href="https://github.com/nextapps-de/mikado/tree/0.8.4/dist/module-min" target="_blank">https://github.com/nextapps-de/mikado/tree/0.8.4/dist/module-min</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>Javascript Modules (Debug)</td>
        <td><a href="https://github.com/nextapps-de/mikado/raw/0.8.4/dist/module-debug/" target="_blank">Download</a></td>
        <td><a href="https://github.com/nextapps-de/mikado/tree/0.8.4/dist/module-debug" target="_blank">https://github.com/nextapps-de/mikado/tree/0.8.4/dist/module-debug</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mikado.custom.js</td>
        <td colspan="2"><a href="#builds">Read more about "Custom Build"</a></td>
    </tr>
</table>

> All debug versions are providing debug information through the console and gives you helpful advices on certain situations.

### Bundles

> Bundles export all their features as static functions to the public class namespace "Mikado" e.g. `Mikado.register()`.

The abbreviations used at the end of the filenames indicates:

- `bundle` All features included, Mikado is available on `window.Mikado`
- `light` Only basic features are included, Mikado is available on `window.Mikado`
- `es5` bundle has support for EcmaScript5, Mikado is available on `window.Mikado`
- `module` bundle is a Javascript module, Mikado is available by `import Mikado from "./mikado.bundle.module.min.js"`
- `min` bundle is minified
- `debug` bundle has enabled debug mode (only for development purposes, do not use for production)

### Module

When using modules you can choose from 2 variants: `mikado.xxx.module.min.js` has all features bundled on the public class namespace e.g. `Mikado.register()`, whereas the folder `/dist/module/` export most of the features as functions which needs to be imported explicitly by `import { register } from "./dist/module/mikado.js"`.

Also, for each variant there exist:
1. A debug version for the development
2. A pre-compiled minified version for production

### Browser

Load the bundle by a script tag:

```html
<script src="dist/mikado.bundle.min.js"></script>
<script>
  // ... access Mikado
</script>
```

### NPM

Install Mikado via NPM:

```npm
npm install mikado
```

The **_dist_** folder are located in `node_modules/mikado/dist/`.

### Javascript Modules
 
Use the bundled version exported as a module:

```html
<script type="module">
    import Mikado from "./dist/mikado.bundle.module.min.js";
    // bundled access by e.g. Mikado.register()
</script>
```

Also, pre-compiled non-bundled production-ready modules are located in `dist/module-min/`.

```html
<script type="module">
    import Mikado, { register } from "./dist/module-min/mikado.js";
    // bundled access by Mikado.register isn't available
    // requires direct access by e.g. register()
</script>
```

You can also load modules via CDN:

```html
<script type="module">
    import Mikado from "https://unpkg.com/mikado@0.8.404/dist/module/mikado.js";
</script>
```

> Loading modules via CDN commonly expects to build/bundle your app properly before distribution. Do not load them via CDN in production.

<a name="feature-comparison"></a>

### Feature Comparison "Bundle vs. Light"

<table>
    <tr></tr>
    <tr>
        <td>Feature</td>
        <td>mikado.bundle.js</td>
        <td>mikado.light.js</td>
    </tr>
    <tr>
        <td>
            Template Render Engine
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
            <a href="#pool">Shared Pools / Live Pools</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#keyed">Keyed Recycle</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#recycle">Non-keyed Recycle</a>
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
            <a href="#hydration">Hydration</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#expression">Template Expressions</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#conditional">Conditional Template Structures</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#include">Includes/Partials/Loops</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#shadow">Shadow DOM</a>
        </td>
        <td>✓</td>
        <td>✓</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#shadow">Web Components</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#runtime-compiler">Runtime Compiler</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#event">Event Delegation + Routes</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#proxy">Reactive (Proxy, Observer)</a>
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
            <a href="#manipulate">View Manipulation Helpers</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#helper">DOM Cache Helpers</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr>
        <td>File Size (gzip)</td>
        <td>9.3 kb</td>
        <td>3.7 kb</td>
    </tr>
</table>

<a name="benchmark"></a>

## Benchmark Ranking (Rendering Performance)

Run the benchmark (non-keyed recycle):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/bench/">https://raw.githack.com/nextapps-de/mikado/bench/</a><br>

Run the benchmark (keyed recycle):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/bench/#keyed">https://raw.githack.com/nextapps-de/mikado/bench/#keyed</a><br>

Run the benchmark (internal/data-driven):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/bench/#internal">https://raw.githack.com/nextapps-de/mikado/bench/#internal</a><br>

The values represent operations per second, each benchmark task has to process a data array of 100 items. Higher values are better, except for memory (the sum of allocated memory during the whole test).

#### Keyed Test Results

<table>
    <tr></tr>
    <tr>
        <td><sub>Library</sub></td>
        <td align="center"><sub>RAM</sub></td>
        <td align="center"><sub>Create</sub></td>
        <td align="center"><sub>Replace</sub></td>
        <td align="center"><sub>Update</sub></td>
        <td align="center"><sub>Order</sub></td>
        <td align="center"><sub>Repaint</sub></td>
        <td align="center"><sub>Add</sub></td>
        <td align="center"><sub>Remove</sub></td>
        <td align="center"><sub>Toggle</sub></td>
        <td align="center"><sub>Clear</sub></td>
        <td align="center"><sub>Score</sub></td>
        <td align="center"><sub>Index</sub></td>
    </tr>
    <tr>
        <td><sub>mikado</sub></td>
        <td align="right"><sub>55</sub></td>
        <td align="right"><sub>3589</sub></td>
        <td align="right"><sub>2780</sub></td>
        <td align="right"><sub>199816</sub></td>
        <td align="right"><sub>134262</sub></td>
        <td align="right"><sub>536052</sub></td>
        <td align="right"><sub>93062</sub></td>
        <td align="right"><sub>93058</sub></td>
        <td align="right"><sub>92151</sub></td>
        <td align="right"><sub>51219</sub></td>
        <td align="right"><b><sub>3202</sub></b></td>
        <td align="right"><b><sub>92</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>solid</sub></td>
        <td align="right"><sub>44</sub></td>
        <td align="right"><sub>2438</sub></td>
        <td align="right"><sub>2230</sub></td>
        <td align="right"><sub>20362</sub></td>
        <td align="right"><sub>13101</sub></td>
        <td align="right"><sub>34436</sub></td>
        <td align="right"><sub>4595</sub></td>
        <td align="right"><sub>24891</sub></td>
        <td align="right"><sub>7858</sub></td>
        <td align="right"><sub>70825</sub></td>
        <td align="right"><b><sub>312</sub></b></td>
        <td align="right"><b><sub>37</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>inferno</sub></td>
        <td align="right"><sub>46</sub></td>
        <td align="right"><sub>2551</sub></td>
        <td align="right"><sub>2151</sub></td>
        <td align="right"><sub>14722</sub></td>
        <td align="right"><sub>13900</sub></td>
        <td align="right"><sub>16796</sub></td>
        <td align="right"><sub>4780</sub></td>
        <td align="right"><sub>20727</sub></td>
        <td align="right"><sub>7724</sub></td>
        <td align="right"><sub>54176</sub></td>
        <td align="right"><b><sub>238</sub></b></td>
        <td align="right"><b><sub>34</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>mithril</sub></td>
        <td align="right"><sub>45</sub></td>
        <td align="right"><sub>1672</sub></td>
        <td align="right"><sub>1505</sub></td>
        <td align="right"><sub>15406</sub></td>
        <td align="right"><sub>13868</sub></td>
        <td align="right"><sub>16638</sub></td>
        <td align="right"><sub>3599</sub></td>
        <td align="right"><sub>21109</sub></td>
        <td align="right"><sub>5653</sub></td>
        <td align="right"><sub>41525</sub></td>
        <td align="right"><b><sub>223</sub></b></td>
        <td align="right"><b><sub>28</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>stage0</sub></td>
        <td align="right"><sub>56</sub></td>
        <td align="right"><sub>2030</sub></td>
        <td align="right"><sub>2446</sub></td>
        <td align="right"><sub>11213</sub></td>
        <td align="right"><sub>9749</sub></td>
        <td align="right"><sub>11033</sub></td>
        <td align="right"><sub>4427</sub></td>
        <td align="right"><sub>18083</sub></td>
        <td align="right"><sub>7209</sub></td>
        <td align="right"><sub>90434</sub></td>
        <td align="right"><b><sub>199</sub></b></td>
        <td align="right"><b><sub>35</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>redom</sub></td>
        <td align="right"><sub>81</sub></td>
        <td align="right"><sub>1517</sub></td>
        <td align="right"><sub>1421</sub></td>
        <td align="right"><sub>10242</sub></td>
        <td align="right"><sub>9614</sub></td>
        <td align="right"><sub>10870</sub></td>
        <td align="right"><sub>2857</sub></td>
        <td align="right"><sub>16062</sub></td>
        <td align="right"><sub>4875</sub></td>
        <td align="right"><sub>28075</sub></td>
        <td align="right"><b><sub>160</sub></b></td>
        <td align="right"><b><sub>22</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>domc</sub></td>
        <td align="right"><sub>124</sub></td>
        <td align="right"><sub>3600</sub></td>
        <td align="right"><sub>3424</sub></td>
        <td align="right"><sub>3437</sub></td>
        <td align="right"><sub>3472</sub></td>
        <td align="right"><sub>3512</sub></td>
        <td align="right"><sub>3592</sub></td>
        <td align="right"><sub>6670</sub></td>
        <td align="right"><sub>4540</sub></td>
        <td align="right"><sub>100302</sub></td>
        <td align="right"><b><sub>120</sub></b></td>
        <td align="right"><b><sub>38</sub></b></td>
    </tr>
    <tr>
        <td><sub>innerhtml</sub></td>
        <td align="right"><sub>67</sub></td>
        <td align="right"><sub>2791</sub></td>
        <td align="right"><sub>2676</sub></td>
        <td align="right"><sub>2471</sub></td>
        <td align="right"><sub>2823</sub></td>
        <td align="right"><sub>2799</sub></td>
        <td align="right"><sub>2943</sub></td>
        <td align="right"><sub>5752</sub></td>
        <td align="right"><sub>3901</sub></td>
        <td align="right"><sub>103405</sub></td>
        <td align="right"><b><sub>105</sub></b></td>
        <td align="right"><b><sub>35</sub></b></td>
    </tr>
    <tr>
        <td><sub>surplus</sub></td>
        <td align="right"><sub>92</sub></td>
        <td align="right"><sub>2969</sub></td>
        <td align="right"><sub>2577</sub></td>
        <td align="right"><sub>2281</sub></td>
        <td align="right"><sub>2386</sub></td>
        <td align="right"><sub>2379</sub></td>
        <td align="right"><sub>2285</sub></td>
        <td align="right"><sub>4197</sub></td>
        <td align="right"><sub>3023</sub></td>
        <td align="right"><sub>86916</sub></td>
        <td align="right"><b><sub>91</sub></b></td>
        <td align="right"><b><sub>32</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>doohtml</sub></td>
        <td align="right"><sub>71</sub></td>
        <td align="right"><sub>2397</sub></td>
        <td align="right"><sub>2308</sub></td>
        <td align="right"><sub>2208</sub></td>
        <td align="right"><sub>2208</sub></td>
        <td align="right"><sub>2229</sub></td>
        <td align="right"><sub>2275</sub></td>
        <td align="right"><sub>4285</sub></td>
        <td align="right"><sub>2945</sub></td>
        <td align="right"><sub>63162</sub></td>
        <td align="right"><b><sub>82</sub></b></td>
        <td align="right"><b><sub>29</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>sinuous</sub></td>
        <td align="right"><sub>151</sub></td>
        <td align="right"><sub>2038</sub></td>
        <td align="right"><sub>2112</sub></td>
        <td align="right"><sub>2454</sub></td>
        <td align="right"><sub>2459</sub></td>
        <td align="right"><sub>2461</sub></td>
        <td align="right"><sub>2506</sub></td>
        <td align="right"><sub>4820</sub></td>
        <td align="right"><sub>3276</sub></td>
        <td align="right"><sub>59556</sub></td>
        <td align="right"><b><sub>81</sub></b></td>
        <td align="right"><b><sub>25</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>jquery</sub></td>
        <td align="right"><sub>103</sub></td>
        <td align="right"><sub>2195</sub></td>
        <td align="right"><sub>1919</sub></td>
        <td align="right"><sub>1893</sub></td>
        <td align="right"><sub>2092</sub></td>
        <td align="right"><sub>2093</sub></td>
        <td align="right"><sub>2084</sub></td>
        <td align="right"><sub>3903</sub></td>
        <td align="right"><sub>2594</sub></td>
        <td align="right"><sub>19220</sub></td>
        <td align="right"><b><sub>66</sub></b></td>
        <td align="right"><b><sub>21</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>lit-html</sub></td>
        <td align="right"><sub>199</sub></td>
        <td align="right"><sub>1410</sub></td>
        <td align="right"><sub>1329</sub></td>
        <td align="right"><sub>1349</sub></td>
        <td align="right"><sub>1351</sub></td>
        <td align="right"><sub>1333</sub></td>
        <td align="right"><sub>1393</sub></td>
        <td align="right"><sub>2415</sub></td>
        <td align="right"><sub>1764</sub></td>
        <td align="right"><sub>20837</sub></td>
        <td align="right"><b><sub>46</sub></b></td>
        <td align="right"><b><sub>15</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>ractive</sub></td>
        <td align="right"><sub>1870</sub></td>
        <td align="right"><sub>739</sub></td>
        <td align="right"><sub>672</sub></td>
        <td align="right"><sub>690</sub></td>
        <td align="right"><sub>686</sub></td>
        <td align="right"><sub>691</sub></td>
        <td align="right"><sub>725</sub></td>
        <td align="right"><sub>1247</sub></td>
        <td align="right"><sub>917</sub></td>
        <td align="right"><sub>7394</sub></td>
        <td align="right"><b><sub>22</sub></b></td>
        <td align="right"><b><sub>7</sub></b></td>
    </tr>
    <tr></tr>
    <tr>
        <td><sub>knockout</sub></td>
        <td align="right"><sub>1081</sub></td>
        <td align="right"><sub>399</sub></td>
        <td align="right"><sub>289</sub></td>
        <td align="right"><sub>291</sub></td>
        <td align="right"><sub>291</sub></td>
        <td align="right"><sub>280</sub></td>
        <td align="right"><sub>355</sub></td>
        <td align="right"><sub>524</sub></td>
        <td align="right"><sub>429</sub></td>
        <td align="right"><sub>3424</sub></td>
        <td align="right"><b><sub>12</sub></b></td>
        <td align="right"><b><sub>4</sub></b></td>
    </tr>
</table>

The **_index_** is a statistic rank having a maximum possible value of 100, this requires a library to be the best in each test category (regardless how much better).
The **_score_** value is based on median factorization, here a score of 100 represents the statistical midfield.

<a name="api"></a>

## API Overview

> Most of these methods are optional, you can just use **_view.render(data)_** to apply all changes automatically.

Constructor:

- new <a href="#mikado.new">**Mikado**(template, \<options\>)</a> : <small>_view_</small>
- new Mikado.<a href="#observable">**Array**(array)</a> : <small>_observable_</small>

Instance properties:

- view.<a href="#view.name">**name**</a> <small>_readonly_</small>
- view.<a href="#view.root">**root**</a> <small>_readonly_</small>
- view.<a href="#view.length">**length**</a> <small>_readonly_</small>
- view.<a href="#view.state">**state**</a> <small>_readonly_</small>

Static properties (not included in mikado.light.js):

- Mikado.<a href="#mikado.eventCache">**eventCache**</a> : <small>_boolean_</small>
- Mikado.<a href="#mikado.eventBubble">**eventBubble**</a> : <small>_boolean_</small>

Static methods:

- Mikado.<a href="#mikado.once">**once**(root, template, \<data\>, \<state\>, \<callback\>)</a>
- Mikado.<a href="#mikado.register">**register**(template, \<options\>)</a>
- Mikado.<a href="#mikado.unregister">**unregister**(template)</a>

Static methods (not included in mikado.light.js):

<!-- - <a href="#mikado.compile">**compile**(\<template | string\>)</a> -->
- Mikado.<a href="#mikado.route">**route**(name, function, \<options\>)</a>
- Mikado.<a href="#mikado.listen">**listen**(event, \<options\>)</a>
- Mikado.<a href="#mikado.unlisten">**unlisten**(event)</a>
- Mikado.<a href="#mikado.dispatch">**dispatch**(route, \<target\>, \<event\>)</a>
- Mikado.<a href="#mikado.escape">**escape**(text)</a> : <small>_string_</small>
- Mikado.<a href="#mikado.sanitize">**sanitize**(text)</a> : <small>_string_</small>

Instance methods:

- view.<a href="#view.mount">**mount**(root, \<hydrate\>)</a>
- view.<a href="#view.render">**render**(\<data\>, \<state\>, \<callback\>)</a>
- view.<a href="#view.create">**create**(data, \<state\>, \<index\>)</a> : <small>_node_</small>
- view.<a href="#view.add">**add**(data, \<state\>, <position\>)</a>
- view.<a href="#view.append">**append**(data, \<state\>, <position\>)</a>
- view.<a href="#view.update">**update**(node | index, data, \<state\>)</a>
- view.<a href="#view.replace">**replace**(node | index, data, \<state\>)</a>
- view.<a href="#view.remove">**remove**(node, <count\>)</a>
- view.<a href="#view.clear">**clear**()</a>
- view.<a href="#view.node">**node**(index)</a> : <small>_node_</small>
- view.<a href="#view.index">**index**(node)</a> : <small>_number_</small>
- view.<a href="#view.flush">**flush**()</a>
- view.<a href="#view.destroy">**destroy**()</a>

Instance methods (not included in mikado.light.js):

- view.<a href="#view.route">**route**(name, function, \<options\>)</a>
- view.<a href="#view.listen">**listen**(event, \<options\>)</a>
- view.<a href="#view.unlisten">**unlisten**(event)</a>
- view.<a href="#view.dispatch">**dispatch**(name, \<target\>, \<event\>)</a>

View manipulation helpers (optional, not included in mikado.light.js):

- view.<a href="#view.move">**move**(node | index, position)</a>
- view.<a href="#view.shift">**shift**(node | index, offset)</a>
- view.<a href="#view.up">**up**(node | index)</a>
- view.<a href="#view.down">**down**(node | index)</a>
- view.<a href="#view.first">**first**(node | index)</a>
- view.<a href="#view.last">**last**(node | index)</a>
- view.<a href="#view.before">**before**(node | index, node | index)</a>
- view.<a href="#view.after">**after**(node | index, node | index)</a>
- view.<a href="#view.swap">**swap**(node | index, node | index)</a>

Static DOM Cache helpers (optional, not included in mikado.light.js):

- Mikado.<a href="#Mikado.setText">**setText**(node, text)</a>
- Mikado.<a href="#Mikado.getText">**getText**(node)</a> : <small>_string_</small>
- Mikado.<a href="#Mikado.setHtml">**setHtml**(node, html)</a>
- Mikado.<a href="#Mikado.getHtml">**getHtml**(node)</a> : <small>_string_</small>


- Mikado.<a href="#Mikado.setClass">**setClass**(node, [classnames])</a>
- Mikado.<a href="#Mikado.getClass">**getClass**(node)</a> : <small>_[string]_</small>
- Mikado.<a href="#Mikado.addClass">**addClass**(node, classname)</a>
- Mikado.<a href="#Mikado.addClass">**addClass**(node, [classnames])</a>
- Mikado.<a href="#Mikado.hasClass">**hasClass**(node, classname)</a> : <small>_boolean_</small>
- Mikado.<a href="#Mikado.removeClass">**removeClass**(node, classname)</a>
- Mikado.<a href="#Mikado.removeClass">**removeClasses**(node, [classnames])</a>
- Mikado.<a href="#Mikado.toggleClass">**toggleClass**(node, classname, \<state\>)</a>
- Mikado.<a href="#Mikado.toggleClass">**toggleClasses**(node, [classnames], \<state\>)</a>
- Mikado.<a href="#Mikado.toggleClass">**toggleClasses**(node, {classname: state})</a>


- Mikado.<a href="#Mikado.setStyle">**setStyle**(node, property, value)</a>
- Mikado.<a href="#Mikado.setStyle">**setStyles**(node, {property: value})</a>
- Mikado.<a href="#Mikado.getStyle">**getStyle**(node, property)</a> : <small>_string_</small>
- Mikado.<a href="#Mikado.setCss">**setCss**(node, css)</a>
- Mikado.<a href="#Mikado.getCss">**getCss**(node)</a> : <small>_string_</small>


- Mikado.<a href="#Mikado.setAttribute">**setAttribute**(node, attribute, value)</a>
- Mikado.<a href="#Mikado.setAttribute">**setAttribute**(node, {attribute: value})</a>
- Mikado.<a href="#Mikado.getAttribute">**getAttribute**(node, attribute)</a> : <small>_string | null_</small>
- Mikado.<a href="#Mikado.hasAttribute">**hasAttribute**(node, attribute)</a> : <small>_boolean_</small>
- Mikado.<a href="#Mikado.removeAttribute">**removeAttribute**(node, attribute)</a>
- Mikado.<a href="#Mikado.removeAttribute">**removeAttribute**(node, [attributes])</a>

Observable constructor (optional, not included in mikado.light.js):

- new <a href="#mikado.array">**Mikado.Array**(\<array\>)</a> : <small>_observable_</small>

Observable array-like methods (optional, not included in mikado.light.js):

- observable.<a href="#array.length">**length**</a> : <small>_number_</small>
- observable.<a href="#array.mount">**mount**(view)</a>
- observable.<a href="#array.concat">**concat**([object])</a>
- observable.<a href="#array.push">**push**(object)</a>
- observable.<a href="#array.splice">**splice**</a> : <small>_[Object]_</small>
- observable.<a href="#array.pop">**pop**</a> : <small>_Object_</small>
- observable.<a href="#array.shift">**shift**</a> : <small>_Object_</small>
- observable.<a href="#array.unshift">**unshift**(object)</a>
- observable.<a href="#array.slice">**slice**(\<index\>, \<count\>)</a>
- observable.<a href="#array.set">**set**([object])</a>
- observable.<a href="#array.sort">**sort**(fn)</a>
- observable.<a href="#array.reverse">**reverse**()</a>
- observable.<a href="#array.swap">**swap**(idx_a, idx_b)</a>
- observable.<a href="#array.map">**map**(fn)</a>
- observable.<a href="#array.filter">**filter**(fn)</a>
- observable.<a href="#array.indexOf">**indexOf**(object)</a> : <small>_number_</small>
- observable.<a href="#array.lastIndexOf">**lastIndexOf**(object)</a> : <small>_number_</small>
- observable.<a href="#array.includes">**includes**(object)</a> : <small>_boolean_</small>
- observable.<a href="#array.forEach">**forEach**(fn)</a>
- observable.<a href="#array.transaction">**transaction**(fn)</a>

<a name="options"></a>

## Mikado Options

> Each Mikado instance, also named includes/partials can have their own options. Except inline partials always inherits the same options from its parent. For this reason you should prefer named includes over inlining in certain situations.

<table>
    <tr></tr>
    <tr>
        <td>Option</td>
        <td>Description</td>
        <td>Default</td>
    </tr>
    <tr>
        <td><b>root</b><br><b>mount</b></td>
        <td>The destination root element on where the template should be rendered.</td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>template</b></td>
        <td>You will need to assign a template to the Mikado instance (or the name of the template when already registered/loaded).</td>
        <td></td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>async</b></td>
        <td>Perform the <code>.render(data)</code> task asynchronously and return a Promise.</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>cache</b></td>
        <td>Enable/disable <a href="#cache">DOM state caching</a> which can greatly increase performance by a factor up to 25. When enabled make sure to use the <a href="#cache">DOM Cache Helpers</a> when manipulating the DOM directly on properties which are also covered by template expressions.</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>observe</b></td>
        <td>When using <code>Mikado.Array()</code> for reactive approach you will need to pass this array instance to this property.</td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>recycle</b></td>
        <td>When enabled all dom elements which are already rendered will be re-used (recycled) for the next render task. This performs better, but it may produce issues when manual dom manipulations was made which are not fully covered by the template. Alternatively use the <code>keyed</code> strategy, which limits recycling of components by matching the same data key (e.g. ID).</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>state</b></td>
        <td>Pass an extern object which should be referenced as the <code>state</code> used within template expressions.</td>
        <td>{ }</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>pool</b></td>
        <td>Pooling can greatly enhance both the keyed and non-keyed recycle strategy.</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>hydrate</b></td>
        <td>Progressively enables hydration of already existing DOM structures when mounted. Make sure the existing DOM structure is based on the same template. When something differs from the given template schema, the hydration will stop and silently falls back into the default build strategy.</td>
        <td>false</td>
    </tr>
</table>

<a name="get-started"></a>

## Getting Started (Basic Example)

The Mikado Compiler requires Node.js to be installed. This is probably the simplest step in this guide.

Install Mikado from NPM (this will also install the compiler):

```npm
npm install mikado
```

Assume there is an array of data items to render (or just one item as an object):

```js
const data = [{
    username: "User A",
    tweets: ["foo", "bar", "foobar"]
},{
    username: "User B",
    tweets: ["foo", "bar", "foobar"]
},{
    username: "User C",
    tweets: ["foo", "bar", "foobar"]
}];
```

Accordingly, a template **_tpl/partial/user.html_** might look like:

```html
<table>
  <tr>
    <td>User:</td>
    <td>{{ data.username }}</td>
  </tr>
  <tr>
    <td>Tweets:</td>
    <td>{{ data.tweets.length }}</td>
  </tr>
</table>
```

### Compile the template:

In your console type this command line:

```cmd
npx mikado-compile ./tpl/
```

### Load library and initialize template as ES6 modules:

```html
<script type="module">
    import Mikado from "mikado.bundle.module.min.js";
    import template from "tpl/partial/user.js";
    const view = new Mikado(template, {/* options */});
</script>
```

### Load library and initialize template as legacy ES5:

```html
<script src="mikado.bundle.min.js"></script>
<script src="tpl/partial/user.es5.js"></script>
<script>
    var view = new Mikado("user/list", {/* options */});
</script>
```

> The name of a template inherits from its corresponding filename starting by the folder you've passed through the `--src` flag when calling the compiler.

After creation, you need mount the Mikado view instance to an HTML element as a destination for your render tasks:

```js
view.mount(HTMLelement);
view.render(data);
```

You can also chain methods:

```js
Mikado(template).mount(HTMLelement).render(data);
```

<a name="conventions"></a>

## Rules and Conventions

There is just a single convention you always need to keep in mind:

> **Every template has to provide one single root element as the outer boundary.**

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

Wrapping everything into a single outer root element by doing this:

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

You can also use a `<div>` or any other element as a template root (also custom elements). The root element can also hold two special attributes `key` and `cache`. We will come later to it.

<a name="advanced_example"></a>

## Advanced Example

A bit more complex template:

```html
<section id="{{ data.id }}" class="{{ this.state.theme }}" data-index="{{ index }}">
  {{@ var is_today = data.date === state.today }}
  <div class="{{ data.class }} {{ is_today ? 'on' : 'off' }}">
    <div class="title" style="font-size: 2em">{{ data.title.toUpperCase() }}</div>
    <div class="content {{ index % 2 ? 'odd' : 'even' }}">{{# data.content }}</div>
    <div class="footer">{{ state.parseFooter(data) }}</div>
  </div>
</section>
```

You can use <u>any</u> Javascript within the {{ ... }} curly bracket notation. The scope is limited by the template, so variables from one template can't be accessed within another template (use `state` for this purpose).

> To pass HTML markup as a string, the curly brackets needs to be followed by **#** e.g. `{{# ... }}`. For better performance, relevant tasks avoid passing HTML contents as a string.

> To use Javascript outside an element's context you need to prevent concatenation of the returned value. For this purpose, the curly brackets need to be followed by **@** e.g. `{{@ ... }}`.

<a name="identifier"></a>

Within a template there are several **reserved keywords** you can use as an identifier:

<table>
    <tr></tr>
    <tr>
        <td>Identifier</td>
        <td>Description</td>
    </tr>
    <tr>
        <td><b>data</b></td>
        <td>A full reference to the passed data item. Within loops the keyword data points to each of the looped data items.</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>state</b></td>
        <td>An optional payload used to manually pass in custom specific values or helper functions. The state will be delegated through all nested templates.</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>index</b></td>
        <td>Represents the index of the currently rendered data item (starting by 0 for the first item).</td>
    </tr>
    <!--
    <tr></tr>
    <tr>
        <td><b>self</b></td>
        <td>Points to the current rendered element itself. Using "js" node property or by using the {{@ marker grants you to have "self" available.</td>
    </tr>
    -->
    <tr></tr>
    <tr>
        <td><b>this</b></td>
        <td>Provides you access to the Mikado view instance (e.g. this.state).</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>window</b></td>
        <td>Gives access to the global namespace.</td>
    </tr>
    <tr>
        <td>_p<br>_v<br>_x<br>_o<br>_f<br>_inc</td>
        <td>private identifiers, used by internal processing</td>
    </tr>
</table>

You cannot change the names of those preserved keywords, also make sure you didn't override them.

It is recommended to pass custom functions via the _state_ object (see example above `state.parseFooter = function(str){ return str; }`). Alternatively you can also nest more complex computations inline as an IIFE and return the result.

```html
<div class="date">{{ 
    (function(){ 
        var date = new Date();
        // perform some code ...
        return date.toLocaleString();
    }())
}}</div>
```

To finish the example from above you need one single data object or an array of **_data_** items:

```js
var data = [{
    "id": "230BA161-675A-2288-3B15-C343DB3A1DFC",
    "date": "2019-01-11",
    "class": "yellow, green",
    "title": "Sed congue, egestas lacinia.",
    "content": "<p>Vivamus non lorem <b>vitae</b> odio sagittis amet ante.</p>",
    "footer": "Pellentesque tincidunt tempus vehicula."
}];
```

Provide the optional **_state_** payload which includes specific values and helper methods used within template expressions:

```js
const state = {
  today: "2019-01-11",
  theme: "custom",
  parseFooter: function(data) {
    return data.footer;
  }
};
```

Mount the view to a target element as a destination for all the render tasks:

```js
view.mount(HTMLelement);
```

Render a mounted template:

```js
view.render(data, state);
```

Render asynchronously automatically by just providing a callback function:

```js
view.render(data, state, function() {
  console.log("finished.");
});
```

To render asynchronously by using promises you need to set the callback value to `true`:

```js
// callback "true" will use Promises
view.render(data, state, true).then(function() {
    console.log("finished.");
});

// same, but uses async/await:
await view.render(data, state, true);
console.log("finished.");
```

When async should be the default strategy for all render tasks then you can also set the **_async_** option flag:

```js
const view = new Mikado(template, { async: true });
await view.render(data, state);
console.log("finished.");
```

<a name="compiler"></a>

## Compile Templates

<a name="compiler"></a>

Define an HTML-like template and use double curly brackets to markup dynamic expressions which should be calculated and replaced during runtime:

```html
<table>
  <tr>
    <td>User:</td>
    <td>{{ data.username }}</td>
  </tr>
  <tr>
    <td>Tweets:</td>
    <td>{{ data.tweets.length }}</td>
  </tr>
</table>
```

Save this template e.g. to _tpl/partial/user.html_

> The preserved keyword **_data_** is a reference to the passed data item. You can access the whole nested object.

Mikado comes with a builtin template compiler you can simply access by typing `npx mikado-compile` into your console. The compiler uses a very simple command-line interface (CLI) running on Node.js to perform compilation tasks. The template compiles into a native javascript file which needs to be passed during creation of a Mikado instance. The same markup is also used for the server-side rendering part, so you can share the same template sources for client and server rendering.

Show help to list all available commands:

```cmd
npx mikado-compile --help
```

Compile the template through the command line by:

```cmd
npx mikado-compile tpl/partial/user.html
```

**Basic Notation:**
> npx mikado-compile _source \<destination\>_

<!--
Instead of `npx mikado compile` you can also use `npx mikado-compile` alternatively. When a destination was not set, the input folder will be used instead.
-->

When no destination folder was set, the compiled files will be saved to the source folder. After compilation, you will have 3 different files:

1. **list.js** the template compiled as a ES6 module (which needs to be imported)
2. **list.es5.js** the template compiled as ES5 compatible Javascript (which automatically register when loaded by script tag)
3. **list.html** the source template you have implemented (do not delete it)

**Extended Notation:**
> npx mikado-compile --src _{ source }_ --dest _{ destination }_ --extension html --type module  --compact

<a name="compiler-flags"></a>
Compiler Flags:

- `--type module`, `-t module` export as javascript modules (recommended)
- `--type es5`, `-t es5` export as ES5-compatible package
- `--extension html`, `--ext html`, `-e html` the file extension which should be compiled
- `--inline`, `-i` or `--compact`, `-c` switch the build strategy to optimize either the performance (inline) or size (compact)
- `--force`, `-f` force overwriting existing files
- `--pretty`, `-p` do not minify the compiled result
- `--watch`, `-w` start the watcher for automatically compile when files has changed (just for development purposes)

Supported flags as attributes on the template root:

```html
<!-- switch the build strategy to prebuilt enabled cache -->
<table cache="true"></table>
```
```html
<!-- switch the build strategy to prebuilt disabled cache -->
<table cache="false"></table>
```

Using the flag attributes are the most performant variants but also cost you some flexibility, because the cache strategy couldn't be changed in runtime, it needs to change in markup before compilation.

<a name="auto-naming"></a>

### Auto Naming

There is a new naming system which will apply by default. The name of your html files will be used as unique identifiers of your templates.
Because several folders can include same filenames, the template name inherits from the full path you pass in as `--src`.

Assuming the following file structure:
```
tpl/view/start.html
tpl/view/user.html
tpl/view/cart.html
tpl/partial/start.html
tpl/partial/user.html
tpl/partial/cart.html
```

The command should define the path `/tpl/` as the source root because it is the most inner folder which covers all files:
```cmd
npx mikado-compile ./tpl/
```

The template names then becomes `view/start`, `view/user`, `view/cart` and `partial/start`, `partial/user`, `partial/cart` for the partials. So when including just use this name in your expression `<table include="partial/user">`

The wrong way is to compile the folder /view/ and /partial/ separately, because their template names will be same.
```cmd
npx mikado-compile ./tpl/view/
npx mikado-compile ./tpl/partial/
```
This might also work, but it is better not to do.

<a name="prebuilt-cache"></a>

### Prebuilt Cache Strategy

The option `{ cache: true/false }` when creating a Mikado instance could be better declared withing templates on their root element, let the compiler produce more optimized code for this strategy.

```html
<table cache="true">
    <!-- ... -->
</table>
```

Also use this approach when set `cache="false"`:

```html
<table cache="false">
    <!-- ... -->
</table>
```

<a name="watcher"></a>

### Watcher (Auto-Compile)

A perfect fit for your local development environment is spawning a watcher to automatically compile files when they get changed. Just use the same command line you would also use for a full compilation and append the flag `--watch` or `-w` to it:

```cmd
npx mikado-compile ./tpl/ --watch
```

Don't close the console, otherwise the watcher will stop. You can stop the watcher explicitly by pressing `CTRL + C`.

<a name="expressions"></a>

## Template Expressions

> The template notation expects double curly brackets `{{ ... }}` for any kind of dynamic expressions.

> Except when using {{@ ... }} for inline code notation, the returned value of every dynamic expression will be replaced to its position.

<a name="insertion"></a>

### Value Insertion `{{ ... }}`

```html
<div>{{ data.value }}</div>
```

```js
view.render({ value: "test" });
```

You can also combine multiple expressions with non-expression contents:

```html
<div>The title "{{ data.title }}" has the value: {{ data.value }}</div>
```

```js
view.render({ title: "title", value: "test" });
```

You can also mix text nodes with elements on the same root element:

```html
<div>Title: <b>{{ data.title }}</b><br>Value: {{ data.value }}</div>
```

```js
view.render({ title: "title", value: "test" });
```

Also, you can use expressions within every attribute:

```html
<div data-id="{{ data.title }}" class="{{ data.class }}">{{ data.value }}</div>
```
```js
view.render({ id: 1, value: "test", class: "test" });
```

Every Javascript syntax is allowed withing expression:

```html
<div style="color: {{ data.active ? 'green' : 'black' }}; {{ data.value ? '' : 'display: none;' }}"></div>
```
```js
view.render({ active: true, value: "not empty" });
```

Since expressions just need to return a value you can also use IIFE:

```html
<div>{{ 
    (function(){ 
        var date = new Date();
        // perform some code ...
        return date.toLocaleString();
    }())
}}</div>
```
```js
view.render();
```

<a name="inline-js"></a>

### JS Inline Code `{{@ ... }}`

The inline code expression is the only one which doesn't return a value to be rendered in place, it just executes.

```html
<div>
    {{@ const value = data.title.toUpperCase(); }}
    <h1>{{ value }}</h1>
</div>
```
```js
view.render({ title: "title" });
```

The scope is limited to the template scope, but you can assign to `state` alternatively to share values across nested instances:

```html
<div>
    {{@ state.value = data.title.toUpperCase(); }}
    <div include="header">
        <!-- contents of header.html:
        <h1>{{ state.value }}</h1>
        -->
    </div>
</div>
```
```js
view.render({ title: "title" });
```

<a name="truthy"></a>

### Truthy Values `{{? ... }}`

This will just output the result when it is not `null`, `undefined`, `NaN` or `false`.

```html
<div>{{? data.value }}</div>
```
```js
view.render([{
    value: null
},{
    value: NaN
},{
    value: undefined
},{
    value: false
}]);
```

<a name="escape-ssr"></a>

### Escape Values `{{! ... }}` (SSR only)

This will escape the value before return. This is just important for the server-side-rendering part, the client automatically escape contents by default (except when using the HTML-expression).

```html
<div>{{! data.value }}</div>
```
```js
view.render({ value: "<b>html is not allowed</b>" });
```

<a name="html"></a>

### HTML Contents `{{# ... }}`

This will allow for inserting HTML returned string.

> Be aware of this can potentially lead into security issues like XSS. Use carefully!

```html
<div>{{# data.value }}</div>
```
```js
view.render({ value: "<b>html is allowed</b>" });
```

<a name="mikado.escape"></a><a name="mikado.sanitize"></a>

#### Sanitizer

Mikado provides you high performant helper function you can use in this context to escape contents or to sanitize.

```js
view.render({ 
    value: "<b>html allowed</b><br>" + Mikado.escape("<b>not allowed</b>")
});
```

```js
view.render({ 
    value: "<b>html allowed</b><br>" + Mikado.sanitize("<b>not allowed</b>")
});
```

Using the sanitizer will remove the tags completely, whereas when escaping the content aren't removed but just escaped.

<a name="bindings"></a>

### Reactive Bindings `{{= ... }}`

Define properties by using pure data object notation without any javascript inside:

```html
<div class="{{= data.class }}">{{= data.value }}</div>
```
```js
// store must be an array of elements:
const store = [{ class: "active", value: "foo" }];
// it needs a initial render if store isn't empty:
view.render(store);
// the store array now was proxified!
```

Now you can change the properties of `store` and the corresponding DOM elements will change automatically:

```js
store[0].class = "inactive";
store[0].value = "bar";
```

<a name="runtime-compiler"></a>

## Runtime Compiler

Alternatively of using the `npx mikado-compile` you can also compile templates during runtime.

> If a page has set a `Content-Security-Policy` (CSP) header field, using the runtime compiler has disadvantage when not configure `script-src 'unsafe-eval'`. It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful.

The runtime compiler uses the performance optimized `inline` strategy for every task, you can't switch it. The compiler property flag `cache="true"` or `cache="false"` on a template root is not supported, therefore you can't use 2 of the most performant strategies. But they are just slightly faster, so this shouldn't be an issue.

Those features aren't supported by the runtime compiler:

- `cache="true"` or `cache="false"` on a template root
- using any other compiler strategy than `inline`
- detect and replace repeating inline includes
- detect and solve/unroll non-dynamic expressions, e.g. ``<h1>{{ "foor" + "bar " }}</h1>`` will transform to a static content `<h1>foobar</h1>` and removes the expression completely
- runtime-ready templates aren't available on page load (they need to compile)
- the runtime compiler does not pass the <a href="https://github.com/nextapps-de/mikado/blob/master/test/tpl/crazy.html">"crazy template"</a> test

#### Examples

Define some HTML template structure:

```html
<template id="user-list">
  <!-- just a single outer root element allowed: --> 
  <table>
    <tr>
      <td>User:</td>
      <td>{{ data.user }}</td>
    </tr>
    <tr>
      <td>Tweets:</td>
      <td>{{ data.tweets.length }}</td>
    </tr>
  </table>
</template>
```

> Template definitions used by the runtime compiler needs manual naming when used as named includes.

The template name will derive from `<template id="user-list">` or `<template name="user-list">` and becomes `user-list`. 
When using named includes you will need to use this name for referencing, e.g. `<div include="user-list">"`.

Compile the template and use it for creating a Mikado view instance:

```js
const template = document.getElementById("user-list");
const tpl = Mikado.compile(template);
const view = new Mikado(tpl, { /* options */ });

view.render(data);
```

When the template was get through element ID you can use a shortcut:

```js
const tpl = Mikado.compile("user-list");
```

Also, you can compile the template and use it for registration as a named include referenced by another template e.g. `<div include="user-list">"`:

```js
Mikado.register(Mikado.compile("user-list"));
```

You can use non-template elements for defining templates also:

```css
#user-list{ display: none }
```

```html
<!-- just a single outer root element allowed: --> 
<table id="user-list">
  <tr>
    <td>User:</td>
    <td>{{ data.user }}</td>
  </tr>
  <tr>
    <td>Tweets:</td>
    <td>{{ data.tweets.length }}</td>
  </tr>
</table>
```

Last but not least you can pass the template markup as a string:

```js
const tpl_str = `
<table name="user-list">
  <tr>
    <td>User:</td>
    <td>{{ data.user }}</td>
  </tr>
  <tr>
    <td>Tweets:</td>
    <td>{{ data.tweets.length }}</td>
  </tr>
</table>`;

const tpl = Mikado.compile(tpl_str);
const view = new Mikado(tpl, { /* options */ });

view.render(data);
```

### Using Inline Code

The runtime compiler does not support all places of inserting inline code expressions. In some situations it might produce issues like here:

```html
<table id="user-list">
  <tbody foreach="data.entries">
  {{@
    /* the browser will move this before <table>! */ 
    const value = "test";
  }}
  <tr>
    <td>Value: {{ value }}</td>
  </tr>
  </tbody>
</table>
```

The runtime compiler didn't parse the template by string, instead the compiler creates a dom structure when passing a template as string.
On the example above the `{{@ ... }}` expression is treated as a text node by the browser.
Since the position isn't allowed to place text nodes (after `<table>`, `<tbody>`, `<tr>`) the browser moves this text node up to the outer scope of the table. But the inline code is now executed within the first outer template function, instead the inline loop template function needs the value and is running in its own scope.

In this situation you can store values on `state` to pass through inline looped partials.
Or you can use the `<script>` tag in combination with the js-expression. The latter will keep the hierarchy, because those tags won't move outside by the browser:

```html
<table id="user-list">
  <tbody foreach="data.entries">
    <script>{{@ const value = "test"; }}</script>
    <tr>
      <td>Value: {{ value }}</td>
    </tr>
  </tbody>
</table>
```

> Don't forget to use the expression notation, otherwise it will be inserted as a normal code element.

> When the `<script>` just including js-inline code expression it won't be added to the template as a script element.

<a name="event"></a>

## Routing & Event Delegation

> All the special attributes used to assign event routing within templates are inherited from the native inline listener name but without the prefix `on`, e.g. to bind routing for an "onclick" just use `click`.

Let's take this example:

```html
<table foreach="data" data-user="{{ data.user }}">
  <tr data-id="{{ data.id }}" entry>
    <td>Item:</td>
    <td click="item-show">{{ data.name }}</td>
    <td><a click="item-edit:entry">Edit</a></td>
    <td><a click="item-delete:entry">Delete</a></td>
    <td><a click="item-sort:root">Sort</a></td>
  </tr>
</table>
```

There are 4 click listeners. The attribute value represents the name of the route.
Some of the listener has a route separated by colon ":", this will delegate the event from the route e.g. "item-delete" to the closest element which contains the attribute "entry".
You can freely choose attribute names, but it shouldn't collide with native attributes.
The last listener contains the keyword `root` which is a shortcut to automatically forward the components root (the &lt;table> in this example) as `target` to the assigned route.

> Forwarding events to a parent element by using the colon notation is also helpful when you have corresponding data-attributes assigned to an outer context and each of the nested listener needs to access those values.

Define routes:

```js
view.route("show-user", function(target, event) {
    alert(target.textContent);
});

view.route("delete-user", function(target, event) {
    // target was delegated to "root" by using the colon expression
    alert(target.dataset.id); 
    // when target is delegated you can still get the
    // original element where the event was fired:
    const anchor = event.target;
});
```

Routes are stored globally, so they share through all Mikado instances.

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

<a name="bubbling"></a>

### Event Bubbling

When multiple listeners of the same type are nested, the event will bubble up to the HTML root element when enabling the global flag `Mikado.eventBubble = true`, otherwise bubbling will stop on the most inner definition which gets matched.

```html
<table>
    <tr click="route-tr">
        <td click="route-td"></td>
        <td></td>
        <td></td>
    </tr>
</table>
```

```js
Mikado.route("route-td", function(target, event){
    console.log("clicked td");
});

Mikado.route("route-tr", function(target, event){
    console.log("clicked tr");
});
```

By default, the above example will just execute the route named "route-td" when clicked on the TD element. When `Mikado.eventBubble = true` was enabled the bubble continues after calling the most inner matched handler and both routes will be executed when clicking on TD element.

To control Mikados internal event bubbling mechanism you can pass in options as the 3rd parameter when defining routes:

```js
Mikado.route("route-td", function(){ /*...*/ }, { stop: true });
```

Supported Options (mixable):

- `stop: boolean` stop capturing/bubbling the event up to the root element (stops Mikado event + native event)
- `prevent: boolean` prevents the default behavior for this native event
- `cancel: boolean` just stop bubbling the Mikado event, but the native event bubbling will still continue
- `once: boolean` just catch the event once and remove the route then

<a name="event-cache"></a>

#### Event Cache

You can cache more complex event delegations by setting the global flag `Mikado.eventCache = true`.
A candidate for a complex delegation is forwarding a different target to the handler by using the ":" colon notation or when using `Mikado.eventBubble = true`.

> When using Event Cache the scope of forwarding custom target elements to the handler and also nested routes of the same event type should be defined in the same template scope. Thinks may break when components are shared through multiple instances.

This is okay, because all partials are inline:

```html
<table foreach="data.result">
    <!-- a new template scope -->
    <tr foreach="data.user" click="route-tr:root">
        <!-- a new template scope -->
        <td click="route-td:root">{{ data.username }}</td>
    </tr>
</table>
```

When using extern includes it might produce unexpected behavior:

tpl.html:
```html
<table foreach="data.result" entry>
    <!-- a new template scope -->
    <tr foreach="data.user" include="tpl-td">
        <!-- a new template scope -->
    </tr>
</table>
```

tpl-td.html:
```html
<td click="route-td:entry">{{ data.username }}</td>
```

This will have no side effects when the partial "tpl-td.html" is just use for the template "tpl.html".
But imagine you have another template which includes "tpl-td.html" and **also** one of the recycle strategies (keyed, non-keyed) was enabled on both.
In this specific situation the cache might point to a false element `<table entry>` used to forward to the handler.
Then you need to choose between: 1. limiting the scope of used event notation to the template scope, 2. do not enable `Mikado.eventCache = true`. 

<a name="view.listen"></a><a name="view.unlisten"></a>

#### Explicit Register/Unregister Event Delegation

You can use Mikado routing and event delegation feature everywhere, also outside a template. Just apply the event attribute as you would do in a template.

```html
<body>
  <div click="handler">Click Me</div>
</body>
```

```js
Mikado.route("handler", function(target, event) {
  console.log("Clicked");
});
```

Then you have to explicit register the global "click" listener once:

```js
Mikado.listen("click");
```

Because events automatically register when creating the template factory under the hood. When no template was created which includes the same type of event, a global listener does not exist. For that reason, you have to explicitly register the listener once.

<a name="event-control"></a>

#### Control the Native Event Flow

The default "EventListenerOptions" are set to `true` by default and is using the capturing phase, this is preferred since the event is required on a global listener.

When you need to configure event capturing and passive listener globally just register the specific listener manually before creating any Mikado instance which is including references to this specific event type:

```js
Mikado.listen("touchmove", {
    passive: true,
    capture: true 
});
```

Unregister listener:

```js
Mikado.unlisten("click");
```

> Mikado will store the original `EventListenerOptions` when calling `.listen(event)` under the hood, to make sure the listener will be removed properly.

<a name="view.dispatch"></a>

#### Dispatch Routes

Manually dispatch a route:

```js
view.dispatch("route-name");
```

Manually dispatch a route and pass parameters for the assigned handler:

```js
view.dispatch("handler", target, event);
```

<a name="recycle"></a>

## Keyed & Non-Keyed Recycling

> Each template instance can run in its own mode independently.

<!--
Compare benchmark of all supported modes here:<br>
https://raw.githack.com/nextapps-de/mikado/bench/#modes
-->

<a name="non-keyed"></a>

#### 1. Non-Keyed Recycle

A non-keyed recycle strategy will re-use all existing components without any limitations and is faster than keyed but also has some side effects when not used properly. That's why limitation by keyed data is a more common strategy for recycling. But when an unlimited recycle strategy was used carefully you won't get any disadvantages.

Just provide a template as usual:

```html
<div>
  <div>User:</div>
  <div>{{data.name}}</div>
</div>
```

along with these options:

```js
var view = new Mikado(template, { recycle: true });
```

This will switch Mikado into a recycle strategy to enable re-use of already rendered components.

<a name="keyed"></a>

#### 2. Keyed Recycle

A keyed strategy limits the recycle strategy on components matching the given data key. It just requires a **unique identifier** on each rendered item (e.g. the ID).

Just add the attribute **_key_** to the **_root element_** of a template (or the root of an inline partial) and assign the scope to the unique identifier will automatically switch Mikado into keyed-recycle mode:

```html
<div key="data.id">
  <div>User:</div>
  <div>{{ data.name }}</div>
</div>
```

> A given key in template does not need the `recycle: true` option to be passed.

```js
var view = Mikado(template);
```

This will switch Mikado into a recycle strategy which is limited by its corresponding data keys.

<a name="usage"></a>

## Create, Mount, Destroy Views

<a name="mikado.new"></a>
Create a view by passing a template and customized options:

```js
var view = Mikado(template, options);
```

Create a view and also mount it to a target element right away (you can also do this before render):

```js
var view = Mikado(template, { 
    mount: HTMLElement
});
```

> Whenever `.mount()` is called for the first time, the template factory will be created once. Also, within this routine the hydration will apply when enabled. You can "prebuild" views by mounting early. Bigger sized applications does not hold all views in memory, so here it is recommended to mount the view right before render `view.mount(node).render(data)`.

<a name="view.mount"></a>

Mount or re-mount a view to an HTML element:

```js
view.mount(element);
```

<a name="view.destroy"></a>

Destroy a view:

```js
view.destroy();
```

<a name="view.render"></a>

## Render Templates

Render just a single data object:

```js
view.render({/* object */});
```

Render a template repeated incrementally through a set of data items:

```js
view.render([/* array of objects */]);
```

Render a template and also pass a custom state:

```js
view.render(data, state);
```

> When passing a custom state you can still access the original view state by using `this.state` within template expressions.

Schedule an asynchronous render task without any callback:

```js
view.render(data, state, true);
```

> All asynchronous render tasks will be scheduled to the next animation frame.

Schedule an asynchronous render task by using a callback:

```js
view.render(data, state, function() {
  // finished
});
```

Schedule a render task by using promises (requires the option **_async_** to be enabled during initialization):

```js
view.render(data, state).then(function() {
  // finished
});
```

Or as async/await (requires the option **_async_** to be enabled during initialization):

```js
await view.render(data, payload);
// finished
```

Render a static template (didn't include any dynamic contents):

```js
view.render();
```

<a name="view.create"></a>

#### Create Components

Just create a component from a template without adding/assigning/rendering them to the root ("orphan"):

```js
var partial = view.create(data);
```

Orphans are not a part of the internal render tree of a view. The construction of orphan components is also really fast.

<a name="modify-views"></a>

## Modify Views

<a name="view.add"></a>

Add one data item to the end:

```js
view.add(data);
```

Add one data item to a specific index position (did not replace):

```js
// add to beginning:
view.add(data, 0);
```

Add one data item to a reversed index position (did not replace):

```js
// add before the last element:
view.add(data, -1);
```

<a name="view.append"></a>

Append multiple data items to the end:

```js
view.append(data);
```

Append multiple data before an index:

```js
// append to beginning
view.append(data, 0);
```

Append multiple data before a reversed index position:

```js
// append before the last element:
view.append(data, -1);
```

<a name="view.remove"></a>

Remove a specific template node:

> Parameter: `remove(position, <count>)`

```js
view.remove(node);
```

Remove a specific template node by its index:

```js
view.remove(20);
```

Remove a specific template node by its reversed index:

```js
// remove the last:
view.remove(-1);
```

Remove a range of nodes starting from a specific node or index (included in removal):

```js
view.remove(20, 10);
```

```js
view.remove(node, 20);
```

Remove last 20 node items by using reversed index:

```js
view.remove(-20, 20);
```

Remove previous 20 node items starting of a given node/index (included in removal):

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
view.replace(node, data);
```

```js
view.replace(index, data);
```

<a name="view.update"></a>

Update a single data item/node:

```js
view.update(node, data);
```

```js
view.update(index, data);
```

<a name="helpers"></a>

#### Common View Helpers

<a name="view.node"></a>

Get a components root element by a specific index:

```js
var node = view.node(index);
```

<a name="view.index"></a>

Get the index from a specific components root element:

```js
var index = view.index(node);
```

<a name="view.length"></a>

Get the length of all components currently rendered:

```js
var length = view.length;
```

<a name="view.name"></a>

Get the current template name which is assigned to a Mikado instance:

```js
var name = view.name;
```
<a name="view.root"></a>

Get the mounted root element on which the template is assigned to:

```js
var element = view.root;
```

<a name="manipulate"></a>

## Manipulate Views

Mikado provides you several optional helper functions to manipulate the DOM and also keep them in sync with the internal view state. Using the helper functions also will gain performance.

> All helpers support passed parameter by index or by node.

Helpers let you apply simple transformations without running through the whole render loop of the template. Reconciliation isn't the holy grail, it is just for your laziness. In certain situations it is just more efficient to apply a known transformation directly instead of altering the data and request a whole render task.

<a name="view.move"></a>

Move a data item/node to a specific index position:

```js
view.move(node, 15); // 15 from start
view.move(node, -15); // 15 from end
```

<a name="view.first"></a><a name="view.last"></a>

Move a data item/node to the top or bottom:

```js
view.first(node);
view.last(node);
```

<a name="view.up"></a><a name="view.down"></a>

Move a data item/node by 1 index up or down:

```js
view.up(node);
view.down(node);
```

Move a data item/node by a specific offset (pretty much the same as **_shift_**):

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

<a name="cache"></a>

## DOM State Caching

Caching of DOM properties can greatly increase performance (up to 20x). There are just a few situations where caching will not improve performance, it fully depends on your application.

> **Recommendation:** enable caching when some of your data will stay unchanged from one to another render task. Disable caching when changes on data almost requires a fully re-render.

> The state cache will just apply when `recycle` was enabled or the `keyed` strategy was used. Otherwise, the cache is never used.

Caching is disabled by default, you will need to explicitly set this flag when initializing:

```js
const view = new Mikado(template, { 
    recycle:true,
    cache: true 
});
```

It is very recommended reading the next section to understand how caching is working.

<a name="cache-concept"></a>

#### State Caching Concept

Let's take a simple template as an example:

```html
<root>
  <div class="active">{{ data.title }}</div>
</root>
```

The template above has just one dynamic expression. It could be rendered as follows:

```js
view.render({ title: "foobar" });
```

Assume you get new data and wants to update the view, but the new data has still the same value for the _title_:

```js
view.render({ title: "foobar" });
```

This time, when cache was enabled no changes are applied to the text node, since the new value matches the previous cached value.
That specific part now executes more than 10,000 times faster. Make a maximum use of this strategy will speed up things amazingly.

Now let's come to the most important part when using caching properly. Assume you have rendered the template above with caching enabled. Now you **manually** change parts of the DOM **which is covered by a dynamic template expression**:

```js
var node = document.querySelector(".active");
node.textContent = "manual change";
```

The changes will apply to the DOM as expected. Now you re-render the template with the "old" state from the previous render:

```js
view.render({ title: "foobar" });
```

This time the change will not apply! Because the internal cache assumes that the current value is still "foobar" and skips the change.

You have 2 options in this situation:

1. Do not manually change dom entries which are part of a dynamic template expression and update specific parts through rendering templates only.
2. Using the <a href="#cache-helpers">DOM Cache Helpers</a> Mikado provides you exactly for this situation.

<a name="cache-helpers"></a>

#### DOM Cache Helpers (optional)

> Caching helpers let you apply manual changes to the DOM easily without going out of sync with the corresponding view instance.

> It is recommended also using these helpers to any DOM changes regardless if it is part of the template or not. Generally, these helpers will greatly improve your application performance.

A well implemented application can still save between 20 and 40% of unnecessary DOM access just by using those helpers everywhere. On regular implementations it is almost between 50% and 70%.

<a name="view.setAttribute"></a>

Set an attribute of a node (will not replace old attributes):

```js
Mikado.setAttribute(node, "href", "/foo");
```

Set multiple attributes of a node (will not replace old attributes):

```js
Mikado.setAttribute(node, {
  id: "foo",
  href: "/foo"
});
```

<a name="Mikado.getAttribute"></a>

Get an attribute value of a node:

```js
var attr = Mikado.getAttribute(node, "href");
```

<a name="Mikado.removeAttribute"></a>

Remove an attribute of a node:

```js
var attr = Mikado.removeAttribute(node, "href");
```

Remove multiple attributes of a node:

```js
var attr = Mikado.removeAttribute(node, ["href", "target"]);
```

<a name="Mikado.hasAttribute"></a>

Check existence of a nodes attribute:

```js
var href = Mikado.hasAttribute(node, "href");
```

<a name="Mikado.setClass"></a>

Set class name of a node (fully replaces old classes):

```js
Mikado.setClass(node, "class_a class_b");
```~~
~~
```js
Mikado.setClass(node, ["class_a", "class_b"]);
```

<a name="Mikado.addClass"></a>

Add a classname to a node:

```js
Mikado.addClass(node, "class_a");
```

Add multiple classnames to a node:

```js
Mikado.addClass(node, ["class_a", "class_b"]);
```

<a name="Mikado.getClass"></a>

Get all classnames of a node (returns an array):

```js
var classList = Mikado.getClass(node);
```

<a name="Mikado.toggleClass"></a>

Toggle classnames of a node:

```js
var classList = Mikado.toggleClass(node, "class_a");
```

Toggle classnames of a node to a specific state (a short variant of conditional "add" and "remove"):

```js
var classList = Mikado.toggleClass(node, "class_a", true);
```

Toggle multiple classnames of a node:

```js
var classList = Mikado.toggleClass(node, ["class_a", "class_b"]);
```

Toggle multiple classnames of a node each of them to a specific state:

```js
var classList = Mikado.toggleClass(node, {
    "class_a": true,
    "class_b": false
});
```

<a name="Mikado.hasClass"></a>

Check existence of a nodes classnames:

```js
var class_a = Mikado.hasClass(node, "class_a");
```

<a name="Mikado.removeClass"></a>

Removes a classnames of a node:

```js
Mikado.removeClass(node, "class_a");
```

Removes multiple classnames of a node:

```js
Mikado.removeClass(node, ["class_a", "class_b"]);
```

<a name="Mikado.setCss"></a>

Set the whole elements inline style tag `style="..."` (fully replaces old styles):

```js
Mikado.setCss(node, "top: 0; padding-right: 10px");
```

```js
Mikado.setCss(node, ["top: 0", "padding-right: 10px"]);
```

<a name="Mikado.getCss"></a>

Get all inline styles of a nodes style tag:

```js
var css = Mikado.getCss(node);
```

<a name="Mikado.setStyle"></a>

Set a specific inline style of a node (will not replace old styles):

```js
Mikado.setStyle(node, "padding-right", "10px");
```

Set multiple specific inline styles of a node (will not replace old styles):

```js
Mikado.setStyle(node, { "top": 0, "padding-right": "10px" });
```

<a name="Mikado.getStyle"></a>

Get a specific inline style value of a node:

```js
var padding = Mikado.getStyle(node, "padding-right");
```

<a name="Mikado.setText"></a>

Set text of an element or text node:

```js
Mikado.setText(node, "This is a title.");
```

<a name="Mikado.getText"></a>

Get text of an element or text node:

```js
var text = Mikado.getText(node);
```

<a name="Mikado.setHtml"></a>

Set inner HTML of an element:

```js
Mikado.setHtml(node, "<b>This is a title.</b>");
```

<a name="Mikado.getHtml"></a>

Get inner HTML of an element:

```js
var html = Mikado.getHtml(node);
```

<a name="view.state"></a>

## View State

Every Mikado instance has by default a state object you can access by `view.state`.

State is a payload keeping values and functions during runtime you can use within template expressions additionally to the data.
The state also will be delegated through the whole render loop (including partials).
You can bind one global state to every Mikado instances, you can also assign a dedicated state for each view.
Additionally, a custom state could be passed on all render tasks.

```js
const view = Mikado(template, options);
console.log(view.state); // {}
```

When creating an instance you can optionally pass an extern state via options to share the same state object through multiple views:

```js
const state = { foo: 1 };
const view_a = Mikado(template_a, { state });
const view_b = Mikado(template_b, { state });
console.log(view_a.state); // { foo: 1 }
console.log(view_b.state); // { foo: 1 }
```

You can access the state within templates by the builtin keyword "state" or also by using "this" which points to the current Mikado instance.

```html
<div>
    <p>{{ state.foo }}</p>      <!-- output: 1 -->
    <p>{{ this.state.foo }}</p> <!-- output: 1 -->
</div>
```

When using `.render()` you can optionally pass a state as 2nd parameter which will temporarily override the views default keyword "state" for this specific render task:

```js
const state = { foo: 1 };
const view = Mikado(template, { state });
view.render(data, { foo: 2 });
```

```html
<div>
    <p>{{ state.foo }}</p>      <!-- output: 2 -->
    <p>{{ this.state.foo }}</p> <!-- output: 1 -->
</div>
```

As you can see you can still access the original state by using `this.state`.

When using `foreach` the keyword `data` within nested template expressions refers to the most inner element.

```html
<!-- data points to root -->
<table foreach="data.rows">
    <!-- data points to root.rows[] -->
    <tr foreach="data.columns">
        <!-- data points to root.rows[].columns[] -->
        <td>{{ data.value }}</td>
    </tr>
</table>
```

If you need the root data element within nested templates then just assign the data to the `state` or pass a temporary state object as 2nd parameter by simply using `.render(data, data)`. Now you can access the root data element via `state` through all the template scopes.

<a name="callbacks"></a>

## Custom Callbacks

> The 2nd parameter `view` of custom callbacks points to the Mikado view instance.

Define custom callbacks during initialization:

```js
var view = new Mikado(template, {
  on: {
    create: function(node, view) {
      console.log("created:", node);
    },
    recycle: function(node, view) {
      console.log("recycled:", node);
    },
    insert: function(node, view) {
      console.log("inserted:", node);
    },
    update: function(node, view) {
      console.log("updated:", node);
    },
    replace: function(node, view) {
      console.log("replaced:", node);
    },
    remove: function(node, view) {
      console.log("removed:", node);
    },
    mount: function(root, view) {
      console.log("mounted:", root);
    },
    unmount: function(root, view) {
      console.log("unmounted:", root);
    }
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
        <td>Called when a new template node was created (not recycled).</td>
    </tr>
    <tr></tr>
    <tr>
        <td>recycle</td>
        <td>Called when a template node was recycled instead of created.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>insert</td>
        <td>Called when a template node was inserted into DOM.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>update</td>
        <td>Called when a template node was updated.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>replace</td>
        <td>Called when a template node was replaced ny another template node.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>remove</td>
        <td>Called when a template node was removed.</td>
    </tr>
</table>

<a name="static"></a>

## Static Templates

When a template has no dynamic expressions (within curly brackets) which needs to be evaluated during runtime Mikado will handle those templates as _static_ and skips the dynamic render part. You can render static views without passing data.

<a name="mikado.once"></a>

#### Once (One-time rendering)

When a template just needs to be rendered once you can theoretically create, mount, render and destroy as follows:

```js
Mikado(template)
  .mount(root)
  .render()
  .destroy();
```

You can also simply use a shorthand function:

```js
// static views doesn't require data
Mikado.once(root, template);
```

```js
// if the view has dynamic contents just pass data
Mikado.once(root, template, data);
// full example by also using async callback
Mikado.once(root, template, data, state, callback);
```

There is one important advantage when using `once` over `render`. It will always append to the root without mounting:

```js
Mikado.once(document.body, template);
```

When using `render` instead you probably can't do that, because it needs mounting and `document.body` isn't a root which just includes elements from the same template.
So using `Mikado.once` is great when initializing your app and building the shape of the DOM layout.

If a view was destroyed you will need to create the Mikado instance again when re-using.

<a name="ssr"></a>

## Server-Side Rendering (SSR)

Just use the same template syntax (or same source files also served for the client).

```js
const mikado = require("mikado/ssr");
const view = await mikado.compile("view/start.html", {
    compression: true,
    debug: false,
    cache: 200
});

// render the html markup
const html = view.render([{ /* data */ }]);

// send the html to the client, e.g.:
res.send(html);
```

Supported Options (mixable):

- `compression` minify the html markup (true/false)
- `debug` when enabled it compiles the template on every render, good for development environments (true/false)
- `cache` sets the size of the encoder-cache (true/false/number)
- `csr` when set to "false" it fully unlocks template restrictions applied by the support of client-side-rendering

<a name="ssr-exclusive"></a>

### SSR-exclusive Mode

By explicitly setting the option `csr` to "false" you can switch into SSR-exclusive mode where the limitation of having one outer element as the template root is unlocked, also there is an `extract` directive to place logical placeholder elements, which will be self-extracted when rendered.

```js
const mikado = require("mikado/ssr");
const view = await mikado.compile("view/start.html", {
    csr: false
});
```

```html
<div if="data.length" extract>
    <table foreach="data">
        <tr>
            <td>1</td>
        </tr>
        <tr>
            <td>2</td>
        </tr>
        <tr>
            <td>3</td>
        </tr>
    </table>
</div>
```

> Those templates aren't supported by the client render engine, also you can't hydrate them.

<a name="express"></a>

## Express Render Engine

```js
const mikado = require("mikado/express");
const express = require("express");
const app = express();

// set path to your static views
app.set("views", [
    __dirname + "/view"
    // ...
]);

// set path to your partial views (optional)
app.set("partials", [
    __dirname + "/partial"
    // ...
]);

// register engine to filetype .html
app.engine("html", mikado);
// enable engine for filetype .html
app.set("view engine", "html");
```

<a name="express-options"></a>

#### Custom Options

You can set options by Express `app.set`:

```js
// enable compression (optional)
app.set("view compression", true);
// enable cache and set pool size (optional)
app.set("view cache", 200);
// set debug to false to enable compiler cache
app.set("view debug", false);
```

Or you can specify options by `mikado.options` alternatively:

```js
mikado.options = {
    compression: true,
    cache: 200,
    debug: false
};
```

<a name="express-render"></a>

#### Render Views

Register a route and render the file `./view/start.html`:

```js
app.get("/", function(req, res){

    res.render("view/start", [{ /* data */ }]);
});
```

<a name="includes"></a>

## Includes

Partials gets its own instance under the hood. This performance gain also makes a template factory re-usable when the same partials are shared across different views.

> Be aware of circular includes. A partial cannot include itself or somewhere later in its own chain.

Assume you've created one or more partial templates. Make sure each of the partial templates is providing one single root as the outer bound.

The file structure might look like:

- _tpl/header.html_
- _tpl/article.html_
- _tpl/footer.html_

You will need to compile the templates:

```bash
npx mikado-compile ./tpl/
```

You have to register all partial templates once **before** you initialize the templates which will including them:

```js
import tpl_header from "./tpl/header.es6.js";
import tpl_article from "./tpl/article.es6.js";
import tpl_footer from "./tpl/footer.es6.js";

Mikado.register(tpl_header);
Mikado.register(tpl_article);
Mikado.register(tpl_footer);
```

When using templates in ES5 compatible format, they are automatically registered by default when loaded.
<!--You can also use the runtime compiler and pass the returned template to the register method.-->

Include partial templates in another template __tpl/section.html__:

```html
<section>
  <header include="header"></header>
  <article include="article"></article>
  <footer include="footer"></footer>
</section>
```

The "section" from above could be also included by another one (and so on):

```html
<html>
<body>
    <main foreach="data.sections" include="section"></main>
</body>
</html>
```

<a name="loop-partials"></a>

## Loop Partials

Assume the template example from above is a tweet (title, article, footer).

```html
<section>
  <title>{{ data.title }}</title>
  <tweets foreach="data.tweets" include="tweet">
    <!-- tweet -->
    <!-- tweet -->
    <!-- tweet -->
  </tweets>
</section>
```

This expression will render the template "tweet" through an array of data items/tweets. The template "tweet" is getting the array value **_data.tweets_** as **_data_**.

The **_limit_** and **_offset_** attributes could be used optionally to specify a custom portion of the partial loop:

```html
<tweets foreach="data.tweets" include="tweet" limit="5" offset="5"></tweets>
```

The **_offset_** attribute could also be negative to reverse the boundary direction, e.g. loop through the last 5 items:

```html
<tweets foreach="data.tweets" include="tweet" limit="5" offset="-5"></tweets>
```

<a name="inline-loops"></a>

### Inline Loops

You can also loop through an inline partial. Mikado will extract and referencing this partial to its own instance under the hood.

```html
<main>
  <title>{{ data.title }}</title>
  <tweets foreach="data.tweets">
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
<!-- root view -->
<tweets foreach="data.tweets">
  <!-- new partial template -->
  <tweet>
    <h1>{{ data.title }}</h1>
    <title>Comments:</title>
    <div foreach="data.comments">
      <!-- new partial template -->
      <comment>
        <p>{{ data.content }}</p>
        <title>Replies:</title>
        <div foreach="data.replies">
          <!-- new partial template -->
          <p>{{ data.content }}</p>
        </div>
      </comment>
    </div>
  </tweet>
</tweets>
```

> Every looped partial has to provide **one single element root** as the outer bound.

In this example every foreach-expression is wrong (you will find the right example above):

```html
<tweets foreach="data.tweets">
  <!-- no outer bound! -->
  <h1>{{ data.title }}</h1>
  <title>Comments:</title>
  <div foreach="data.comments">
    <!-- no outer bound! -->
    <p>{{ data.content }}</p>
    <title>Replies:</title>
    <div foreach="data.replies">
      <!-- no outer bound! -->
      {{ data.content }}
    </div>
  </div>
</tweets>
```

<a name="conditional" id="conditional"></a>

## Conditional Template Structures

```html
<main>
  <title if="data.tweet.length">Tweets: {{ data.tweet.length }}</title>
  <title if="!data.tweet.length">No tweets found.</title>
</main>
```

```html
<main>
  <title>{{ data.title }}</title>
  <tweets if="data.tweets.length" foreach="data.tweets">
    <section>{{ data.content }}</section>
  </tweets>
</main>
```

```html
<main>
  <title>{{ data.title }}</title>
  <tweets foreach="data.tweets">
    <section if="data.content">{{ data.content }}</section>
  </tweets>
</main>
```

Think in real code branches, instead of doing this:

```html
<main>
  {{@ var result = (function(){ return "some big computation"; }()) }}
  <section if="data.content">{{ result }}</section>
</main>
```

Doing this:

```html
<main>
  <section if="data.content">
    {{ (function(){ return "some big computation"; }()) }}
  </section>
</main>
```

> Conditional branches will skip their expressions inside when not taken.

Also, try to assign computations outside a loop by using the state to delegate values to the scope of the partial loop:

```html
<main>
  {{@ state.result = (function(){ return "some big computation"; }()) }}
  <tweets foreach="data.tweets">
    <section>{{ state.result }}</section>
  </tweets>
</main>
```

<a name="proxy" id="proxy"></a>

## Reactive Properties (Proxy)

Mikado provides you a reactive approach to listen for changes to the data and apply them accordingly to the DOM.
It is based on native Proxy feature which has great performance, a small memory footprint and fully falls back to a legacy observer when Proxy is not available.
Using a reactive strategy can additionally boost performance beyond a factor of 100 when updating specific data instead of leverage a full render task.
It depends on your application or current view, this feature has an advantage when updating data **partially** has to process more often than full data updates.

**Template markup**:

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

> The expression for an observable property uses this syntax: `{{=`. You can combine with other expressions, but should be defined at least, e.g. `{{#=` or `{{!=` or `{{?=`.

> You can't use any Javascript code inside reactive expressions, just the full data scope of the value is allowed to specify within those expressions.

When using reactive properties you'll need to manage a store (could be a simple Array) which gets proxified under the hood.

```js
// store must be an array of elements:
const store = [/* Array of objects */];

// create, mount and initial render the store by using
// a template which has reactive properties included
Mikado(template).mount(root).render(store);

// the store now has proxified item properties!
// do not throw it away, instead apply updates on it
store[0].name = "John Doe";
store[0].email = "john@doe.com";

// when data changes, the corresponding DOM elements
// will automatically change also
```

> The data store must be an Array of elements, also when just having one item. Because the array index reference gets proxified, that's why you can't pass a single object.

If you just have a single data item, and you don't like the array index access you can also define a reference, but you need to do this after initially calling `render`:

```js
const store = [{ class: "active", value: "foo" }];
// the store isn't proxified
const test = store[0];
// initial render
view.render(store);
// the store array now was proxified!
const item = store[0];

// these objects aren't the same anymore
console.log(test === item); // false

// nothing will change on screen:
test.value = "bar";
// this works properly
item.value = "bar";
```

On the upper example nothing on the DOM will change when you set the values `test.value = "bar"`, because this reference holds the un-proxified original version.
Set `item.value = "bar"` will work properly.

<a name="limitations"></a>

### Limitations

Actually there are some limitations on template expressions.

1.&nbsp;Fields from deeply nested data objects are not reactive:

```js
var data = {
  id: "foobar", // <-- observable
  content: {    // <-- observable
    title: "title",  // <-- NOT
    body: "body",    // <-- NOT
    footer: "footer" // <-- NOT
  }
};
```

2.&nbsp;Template expressions including any kind of Javascript syntax are not supported:

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

Just use plain property notation within the curly brackets.

<a name="strict-proxy"></a>

### Strict-Proxy Mode

Whenever **all** your template expressions are just using proxy notation it enables a special "strict-proxy" mode under the hood, which further boosts performance from every update to a maximum. This mode has no advantage when every render loop has to apply almost new items.

This enables "strict-proxy" mode:

```html
<item>
  <caption>
    Name:
  </caption>
  <p>{{= data.name }}</p>
  <caption>
    Email:
  </caption>
  <p>{{= data.mail }}</p>
</item>
```

This won't enable it:

```html
<item>
  <caption>
    Name:
  </caption>
  <p>{{= data.name }}</p>
  <caption>
    Email:
  </caption>
  <p>{{ data.mail }}</p>
</item>
```

Also using conditionals, includes, loops and inline Javascript will prevent switching to the "strict-proxy" mode. You can't switch this mode by yourself. It just activates when conditions are met.

<a name="observable"></a>

### Observable Array (Virtual NodeList)

In addition to react on changes of property values you can additionally also listen to changes made to the Array index of the store.
Mikado provides you an observable Array that acts like a native Array and apply all changes to a synchronized NodeList under the hood.
It also uses native Proxy which fully falls back to a legacy observer, when not available.

> Semantically the observable array you will get from `Mikado.Array()` is equal to an array-like Javascript Array.

<a name="mikado.array"></a>

Create an observable array:

```js
var store = new Mikado.Array();
```

Create an observable array with initial data:

```js
var items = [ ... ];
var store = new Mikado.Array(items);
```

Every observable array requires binding to a **mounted** Mikado instance, because it needs to apply render tasks somewhere:

```js
var view = Mikado(template, { observe: store, mount: root });
```

<a name="array.mount"></a>

You can also mount an observable array to a Mikado instance (and also switch mounting):

```js
const store = new Mikado.Array();
const view = Mikado(template, { mount: root });

store.mount(view);
```

Now the observable array is linked with your instance. Whenever you change the array all changes will apply automatically to the corresponding DOM components.

You can use all common array built-ins, e.g.:

<a name="array.push"></a>

```js
store.push({ ... });
```

<a name="array.pop"></a>

```js
var last = store.pop();
```

<a name="array.unshift"></a>

```js
store.unshift({ ... });
```

<a name="array.shift"></a>

```js
var first = store.shift();
```

<a name="array.slice"></a>

```js
store.slice(3, 1);
```

<a name="array.splice"></a>

```js
store.splice(0, 1, { ... });
```

You can **get and set via array index access**. This feature also has a non-proxy fallback included.

```js
store[0] = { ... };
```

```js
store[store.length] = { ... };
```

```js
var first = store[0];
```

<a name="array.set"></a>

You can replace the array contents by:

```js
var items = [ ... ];
store.set(items);
```

This is recommended instead of pushing each item one by one, `store.set` will also handle keyed reconciliation.

<a name="array.concat"></a>
<a name="array.indexOf"></a>
<a name="array.lastIndexOf"></a>
<a name="array.includes"></a>
<a name="array.filter"></a>
<a name="array.map"></a>
<a name="array.reverse"></a>
<a name="array.sort"></a>
<a name="array.swap"></a>
<a name="array.forEach"></a>

A list of all supported array prototypes:

- length
- push(obj)
- pop()
- shift(obj)
- unshift(obj)
- slice(index, count)
- splice(index, count, insert)
- concat(arr)
- indexOf(obj)
- lastIndexOf(obj)
- includes(obj)
- filter(fn)
- map(fn)
- reverse()
- sort(fn)
- swap(a, b)
- forEach(fn)
- set(arr) (used to replace the array contents)

These methods are implemented without some extensions like parameter chaining, e.g. `array.push(a, b, c)` is not available, instead, you have to call push for each item one by one.

There are some methods which slightly differs from the original implementation of native Arrays. The following methods will apply changes **_in place_** and returning the original reference instead of making a copy:

- concat
- filter
- map

Whenever you need the original native Array behavior including all extensions and variants you can simply do that by:

```js
const new_array = [ ... ];
const copy = Array.prototype.concat.call(store, new_array);
```

```js
const copy = Array.prototype.map.call(store, obj => obj);
```

In a situation when falling back to the non-proxy polyfill because of missing support for native Proxy, there is a limitation.
You cannot fill sparse arrays or access indexes which are greater than the current `array.length`.
There is just one undefined index that could always access (by read/write) that is the last "undefined" index on an array when you call `array[array.length]`.
This index is a special marker that increases the "virtual" array size.
Whenever you assign a value to this special index the size of the observable index growth automatically and the next "undefined" index in the queue becomes this marker.
This limitation is not existing when the ES6 proxy is available.

Also, there are some divergent characteristics when using reflection:

```js
var store = Mikado.Array();
console.log(store.constructor === Array); // -> false
console.log(store.prototype === Array.prototype); // -> false
console.log(store instanceof Array); // -> false
console.log(Array.isArray(store)); // -> false
console.log(store instanceof Mikado.Array); // -> true
```

The proxy feature theoretically allows all those checks but could not be used to keep the polyfill working in addition to sharing most of the same codebase. Alternatively you can use an `instanceof` check for identification.

<a name="array.transaction"></a>

### Transactions

Since the array observer apply all changes on the array index instantly to the DOM, reconciliation has no chance to run.
For this purpose you can use the `store.transaction()` feature, which let you apply all changes within a function and commit them by taking reconciling into account.

```js
store.transaction(function(){
    // collect changes:
    store[0].title = "John";
    store[12].class = "active";
    store[10] = store.pop();
    store[11] = store.shift();
});
// changes applied
```

A transaction is used when editing an **existing** state in a bulk. Whenever you want to initialize a new state, e.g. when data was coming from a server, you should use `store.set(data)` instead.

<a name="pools"></a>

## Component Pools

Using pools greatly enhance the strategy of keyed and non-keyed recycling. Mikado detects automatically if it needs to use keyed or non-keyed pooling and will apply different strategies optimized for each of them.

> Pools just enables when a keyed or non-keyed recycle strategy was used in combination.

Enable pool (keyed or non-keyed):

```js
const view = new Mikado(tpl, {
    recycle: true,
    pool: true
});
```

Mikado will auto-balance pools automatically.

<a name="mikado.flush"></a>

#### Flush Pools

You can delete pool contents at any time by:

```js
view.flush();
```

<a name="hydration"></a>

## Hydration

Hydration is a concept where the server is sending some basic HTML structure (or the whole App/Page) and the client consumes those contents into its own rendering system. This will improve several performance aspects of page loading (e.g. the Lighthouse test) but also it enables you to have server-side-rendered content by also providing a full PWA (aka "Single-Page-Application") experience at the same time.

Mikado uses hydration strategy, where components are hydrated progressively right before a render task will be performed.

Assume the server was sending this HTML structure as initial:

```html
<html>
<body>
  <main>
    <section>
      <title>Title</title>
      <tweets>
        <tweet><!-- ... --></tweet>
        <tweet><!-- ... --></tweet>
        <tweet><!-- ... --></tweet>
      </tweets>
    </section>
  </main>
</body>
</html>
```

Your template looks like:

```html
<section>
  <title>{{ data.title }}</title>
  <tweets foreach="data.tweets">
    <tweet>
      <h1>{{ data.title }}</h1>
      <title>Comments:</title>
      <div foreach="data.comments">
        <comment><!-- ... --></comment>
      </div>
   </tweet>
  </tweets>
</section>
```

> When a mounted template matches the same DOM structure like the component which should be hydrated, the initialization of the template will boot up faster because the factory is derived instead of created. You can use Mikados SSR feature to provide client-compatible structures on the server-side.

> When `DEBUG` is enabled (or by using one of the debug builds) you'll get a message in the console when hydration falls back into factory construction because of an incompatible DOM structure.

You can hydrate the existing structure when creating instance (prefetch):

```js
const root = document.querySelector("main");
const view = new Mikado(tpl, { mount: root, hydrate: true });
```

You can also do this just right before mounting by passing the 2nd parameter:

```js
const view = new Mikado(tpl);
// ... somewhat later in the runtime
view.mount(document.querySelector("main"), /* hydrate? */ true);
```

> When a hydration breaks because it isn't compatible for some reason, it fully skips this process silently (logs a message when DEBUG was enabled) and falls back to a construction of a factory instead.

<a name="shadow"></a>

## Web Components (Shadow DOM)

When using shadow DOM to build web components the compiler needs to apply a different strategy.
Therefore, you will need 2 additional template tags:

1. `<component/>` as the outer root will enable rendering on a shadow root
2. `<template/>` will identify your template from the rest of markup

```html
<component>
  <!-- optional styles/scripts/etc. -->
  <link href="css/component.css" rel="stylesheet">
  <script src="js/component.js"></script>
  <style>#user-list{ width: 100%; }</style>
  <script>window.username = "John";</script>
  <!-- you can include anything here ... -->
  <!-- components requires the template tag -->
  <template>
    <!-- templates has single outer root element: -->
    <table id="user-list">
      <tr>
        <td>User:</td>
        <td>{{ window.username }}</td>
      </tr>
      <tr>
        <td>Tweets:</td>
        <td>{{ data.tweets.length }}</td>
      </tr>
    </table>
  </template>
</component>
```

> You can't use any template expressions outside `<template/>`.

You can also render any normal template (non-components) to a plain dedicated shadow root by using the `shadow: true` option (also supported by the light bundle):

```js
const view = new Mikado(tpl, { shadow: true });
```

Theoretically you can put the `<link/>`, `<style/>` and `<script/>` inside a normal non-component template by also using the `shadow: true` option.
But there is one important difference. Within a normal template those tags could be re-rendered and this might end in re-initializing of all those assets.
Within a web component there is a top level scope, which is created once and will stay for all your further template tasks.
The template will render on a new "hidden" element `<root/>` which is part of the top level scope.
That is because the view needs to be mounted to an element, and the top level scope of shadow root couldn't be mounted because of mixed content.
Don't rely on the existence of `<root/>`, when using static templates or `view.once()` it might not exist.

Assume when mounted a web component template to an element `<main>`, the DOM structure looks like:

```
<main>
  #shadow-root
    <link/>
    <style/>
    <script/>
    <root>
      #template
      #template
      #template
      ...
    </root>
```

<a name="full-template"></a>

## Full Template Example

Use this almost complete template example to check if you know everything about the template mechanism:

```html
<main cache="true" id="{{ data.view }}">
  <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Title</th>
          <th>Media</th>
          <th>Category</th>
          <th>Comment</th>
          <th>Date</th>
          <th include="pager"></th>
        </tr>
      </thead>
      <tbody foreach="data.entries">
        <script>{{@ const datestr = new Date(data.date).toLocaleString() }}</script>
        <tr key="data.id" data-id="{{ data.id }}">
          <td>{{ index + 1 }}</td>
          <td>{{= data.title }}</td>
          <td>{{# data.media }}</td>
          <td>{{? data.category }}</td>
          <td>{{! data.comment }}</td>
          <td>{{ datestr }}</td>
          <td style="opacity: {{ state.selected === data.id ? '1' : '0.5' }}">
            <select change="select-active:root">
              <option value="on" selected="{{ data.mode === 'on' }}">Enabled</option>
              <option value="off" selected="{{ data.mode === 'off' }}">Disabled</option>
            </select>
          </td>
        </tr>
      </tbody>
      <tfoot if="!data.entries.length">
        <tr>
          <td colspan="7">No entries found.</td>
        </tr>
      </tfoot>
  </table>
</main>
```

A proper definition and call for this template could look like this:

```js
// the named include "pager" needs to be registered before use
Mikado.register(tpl_pager);

// define route "select-active"
view.route("select-active", function(target, event){
    const id = Number(target.dataset.id);
    view.state.selected = id;
});

view.render({
  view: "video",
  entries: [{
    id: 1,
    date: "2023-12-01T14:00:00",
    title: "A simple title 1",
    media: "<img src='img1.jpg'>",
    category: null,
    comment: "Some <script>untrusted</script> content",
    mode: "off"
  },{
    id: 2,
    date: "2023-12-02T15:00:00",
    title: "A simple title 2",
    media: "<video src='mov2.mp4'>",
    category: null,
    comment: "Some <script>untrusted</script> content",
    mode: "on"
  },{
    id: 3,
    date: "2023-12-03T16:00:00",
    title: "A simple title 3",
    media: "<img src='img3.jpg'>",
    category: null,
    comment: "Some <script>untrusted</script> content",
    mode: "off"
  }]
});
```

Each template part explained:

- `cache="true"` let the compiler prebuilt the cache strategy, you can't switch it to off when creating an instance
- `id="{{ data.view }}"` simple expression for inserting dynamic content
- `if="!data.entries.length"` the if-directive checks the condition and will render everything nested as a new template (inline definition or extern by using "include"), the nested template needs to have one outer element as the root
- `foreach="data.entries"` the foreach-directive loops the rendering of array items by everything nested as a new template (inline definition or extern by using "include"), the nested template needs to have one outer element as the root
- `{{@ ... }}` an expression to include pure javascript syntax (access limited by the scope of the template), wrapped into a `<script/>` tag just for runtime compiler support.
- `key="data.id"` extract the key value from the data, a given key is limiting the recycling of already rendered components by a keyed strategy
- `data-id="{{ data.id }}" root` exports "data.id" as an attribute, also define "root" as the event target for the listener "select-active", pretty useful when multiple routes on different elements needs the same data attributes
- `{{ index + 1 }}` uses the builtin keyword "index" which refers to the current index of looped data
- `{{= data.title }}` uses reactive approach by binding the html node to the data field, so when changing the data `data.title ="another title"` the node contents will also change accordingly
- `{{# data.media }}` allows to include html syntax (this is unsafe, don't pass user inputs, you will need to prevent XSS by yourself)
- `{{? data.category }}` only prints a "truthy" value including 0 (skips undefined, null, NaN, false)
- `{{! data.comment }}` escape the value before print out (SSR only)
- `{{ datestr }}` access the variable which was created by inline syntax before
- `style="opacity: {{ state.selected === data.id '1' ? '0.5' }}"` example of dynamic attribute value
- `change="select-active:root"` assign the route named "select-active" and forward the event to the element which has the given attribute name assigned to it or in this case "root" points to the components root <tr> (so the target inside the root function becomes the forwarded element)
- `selected="data.active === 'yes'"` when dynamic attribute values results to boolean "false" (not string) it will be removed from the element, because some attributes enables just by their existence (consider an option element having selected="false" will end up also as a truthy selection state)

<!--
<a name="best-practices"></a>

## Best Practices

When you are focus on performance you should take those settings as a goal:

1. For keyed recycling use: `{ pool: true }` by adding `cache="true"` on the template root element in addition to a key like `key="data.id"` accordingly to your data.
2. For non-keyed recycling use: `{ recycle: true, pool: true }` by adding `cache="true"` on the template root element.
3. Also enable `Mikado.eventCache = true`.

> Please don't just use them blindly, you will need to understand at least a minimum about what those options are doing. Also, in certain situations they might not the best pick. You will also get a great performance when not using this options.

- Remember, looped inline partials can also have a property `key` on their inline root element to switch them also in keyed recycling mode.
- Prefer named includes when structures will be reused by multiple views, also when assigning custom options gives you any advantage.
- In larger applications, it might be better to destroy views when they are closed by the user to free memory instead of saving too much on the options.
-->

<!--
### Personal Recommendation

Keyed recycling isn't the best pick, it just gives you (or other libs) the freedom to apply things to the DOM directly.
Personally I prefer cache-enabled non-keyed recycling for all looped templates e.g. a table view and for "create" and "edit" views I also use non-keyed but without recycling enabled ("create" and "edit" views are the same template).
I don't get any conflicts or side effects, since I apply every change by Mikado (also by using the library helpers).
Long story short, keyed rendering is just for your laziness or when you can't control everything for some reason.
-->

<a name="concept"></a>

## Concept of Shared Components

Mikado heavily makes use of runtime optimization. Since it is not possible to predict the recycle state of the next render task, Mikado uses a technique called `progressive enhancement` on which optimizations will apply iteratively. Recycle enhancements growth as needed.

The most benchmarks you will find ends at the point where Mikado starts to shine. Rendering a simple table isn't really a complex task. Real applications have bigger structures including partials, includes, conditionals, etc. The concept of shared components was the basic idea of this library. It is the "ultimate" upgrade of the recycle paradigm and when properly used, it is one of the biggest optimization improvement you can unlock.

<br><img src="https://cdn.jsdelivr.net/gh/nextapps-de/mikado@master/doc/concept.svg" alt="Mikado Shared Components (Concept)"><br><br>

Mikado will take away every complexity you might expect of such a system. You just need to structure your HTML templates and use `.render(data)`, that's it!

<a name="builds" id="builds"></a>

## Custom Builds

The `src` folder of this repository requires some compilation to resolve the build flags. Those are your options:

- Closure Compiler (Simple or Advanced, used by this library, <a href="https://github.com/krausest/js-framework-benchmark/blob/master/frameworks/keyed/mikado/task/build.js">example</a>)
- Babel + Plugin `babel-plugin-conditional-compile` (used by this library <a href="task/babel.min.json">here</a>)

As far as I know you can't resolve build flags with:

- Webpack
- esbuild
- rollup
- Terser

Please let me know when you have some additions. As long as you will see flags like `if(DEBUG)` (could be minified) in your build you shouldn't use that.

These are some of the basic builds located in the `dist` folder:

```bash
npm run build:bundle
npm run build:light
npm run build:module
npm run build:es5
```

Perform a custom build (UMD bundle) by passing build flags:

```bash
npm run build:custom SUPPORT_CACHE=true SUPPORT_POOLS=true LANGUAGE_OUT=ECMASCRIPT5 POLYFILL=true
```

Perform a custom build in ESM module format:

```bash
npm run build:custom RELEASE=custom.module SUPPORT_CACHE=true SUPPORT_POOLS=true 
```

Perform a debug build:

```bash
npm run build:custom DEBUG=true SUPPORT_CACHE=true SUPPORT_POOLS=true 
```

> On custom builds each build flag will be set to _**false**_ by default when not passed.

The custom build will be saved to `dist/mikado.custom.xxxx.min.js` or when format is module to `dist/mikado.custom.module.xxxx.min.js` (the "xxxx" is a hash based on the used build flags).

<a name="build-flags" id="builds"></a>

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
        <td>true, <b>false</b></td>
        <td>Output debug information to the console (default: false)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_CACHE</td>
        <td>true, false</td>
        <td>DOM State Cache</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_EVENTS</td>
        <td>true, false</td>
        <td>Routing & Event Delegation (template event bindings)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_KEYED</td>
        <td>true, false</td>
        <td>Support for keyed recycling (reconciliation)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_WEB_COMPONENTS</td>
        <td>true, false</td>
        <td>Support for web components (Shadow DOM)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_DOM_HELPERS</td>
        <td>true, false</td>
        <td>DOM Manipulation Helpers</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_CACHE_HELPERS</td>
        <td>true, false</td>
        <td>DOM Cache Helpers</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_ASYNC</td>
        <td>true, false</td>
        <td>Asynchronous Rendering (support Promises)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_POOLS</td>
        <td>true, false</td>
        <td>Support component pools for keyed and non-keyed recycle strategies</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_REACTIVE</td>
        <td>true, false</td>
        <td>Use reactive data binding</td>
    </tr>
    <tr></tr>
    <tr>
        <td>REACTIVE_ONLY</td>
        <td>true, <b>false</b></td>
        <td>Use a full reactive approach for all views, exclude <code>.render()</code> and dependencies from build (default: false)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_CALLBACKS</td>
        <td>true, false</td>
        <td>Use callbacks for specific render tasks</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_COMPACT_TEMPLATE</td>
        <td>true, false</td>
        <td>Turn on when templates are compiled with the <code>compact</code> or <code>default</code> strategy</td>
    </tr>
    <tr></tr>
    <tr>
        <td>SUPPORT_COMPILE</td>
        <td>true, false</td>
        <td>Use the runtime compiler</td>
    </tr>
    <tr>
        <td colspan="3"><br><b>Compiler Flags</b></td>
    </tr>
    <tr>
        <td>RELEASE<br><br><br><br><br></td>
        <td><b>custom</b><br>custom.module<br>bundle<br>bundle.module<br>es5<br>light</td>
        <td>Output debug information to the console (default: false)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>POLYFILL</td>
        <td>true, <b>false</b></td>
        <td>Include Polyfills (based on LANGUAGE_OUT)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>PROFILER</td>
        <td>true, <b>false</b></td>
        <td>Just used for automatic performance tests</td>
    </tr>
    <tr></tr>
    <tr>
        <td>LANGUAGE_OUT<br><br><br><br><br><br><br><br><br><br><br></td>
        <td>ECMASCRIPT3<br>ECMASCRIPT5<br>ECMASCRIPT_2015<br>ECMASCRIPT_2016<br>ECMASCRIPT_2017<br>ECMASCRIPT_2018<br>ECMASCRIPT_2019<br>ECMASCRIPT_2020<br>ECMASCRIPT_2021<br>ECMASCRIPT_2022<br>ECMASCRIPT_NEXT<br>STABLE</td>
        <td>Target language</td>
    </tr>
</table>

---

Copyright 2019-2024 Nextapps GmbH<br>
Released under the <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache 2.0 License</a><br>

<br>
<img src="https://cdn.jsdelivr.net/gh/nextapps-de/mikado@master/doc/mikado.svg" alt="Mikado.js" width="61.8%">

<h1></h1>
<h3>Web's fastest templating engine. Super-lightweight, outstanding performance, no dependencies.</h3>

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
<a href="#builds">Custom Builds</a> &ensp;&bull;&ensp; 
<a href="#compiler">Template Compiler</a> &ensp;&bull;&ensp;
<a href="https://github.com/nextapps-de/mikado-server">Template Server</a> &ensp;&bull;&ensp; 
<a href="https://github.com/nextapps-de/mikado-express">Express Middleware (SSR)</a> &ensp;&bull;&ensp;
<a href="CHANGELOG.md">Changelog</a>

Migrate to >= 0.4.x? Read <a href="CHANGELOG.md">Changelog</a>.

Services:
- Mikado Runtime (Render Templates)<br>`npm install mikado`

- <a href="https://github.com/nextapps-de/mikado-compile">Mikado Compiler</a> (Compile Templates)<br>`npm install mikado-compile`

- <a href="https://github.com/nextapps-de/mikado-server">Mikado Server</a> (Serve Templates)<br>`npm install mikado-server`

- <a href="https://github.com/nextapps-de/mikado-express">Express Middleware</a> (Server-Side Rendering) _\*WIP\*_<br>`npm install mikado-express`

Benchmark:

- https://krausest.github.io/js-framework-benchmark/current.html
- <a href="#benchmark">Stress Test Benchmark</a>

Demo:

1. <a href="demo/basic/demo.html">Basic Example (Classic Javascript)</a>
2. <a href="demo/basic/demo.es6.html">Basic Example (ES6 Modules)</a>
3. <a href="demo/basic/compiler.html">Runtime Compiler</a>
4. TodoMVC App: <a href="demo/todomvc/">Source Code</a>&ensp;/&ensp;<a href="https://raw.githack.com/nextapps-de/mikado/master/demo/todomvc/index.html">Run Demo</a>
5. <a href="https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/keyed/mikado">js-framework-benchmark</a>

#### Comming Soon 0.5.x
`new` webpack loader to bundle templates<br>
`change` file endings for templates are customizable (e.g use ___.shtml___)<br>

<!--
TODO: it gets conflict when mixing external loading with imports (or load via script tag).
`change` template names will inherit from foldername (relative to the app root) and filename (instead of just filenames)<br>
-->

#### Get Latest:

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
        <td>mikado.custom.js</td>
        <td><a href="#builds">Custom Build</a></td>
        <td></td>
    </tr>
</table>

> __Recommended:__ To get a specific version just replace `/master/` with one of the version numbers from the release e.g. `/0.3.1/`, or also a commit hash.

#### Node.js

```npm
npm install mikado
```

#### Feature Comparison
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
        <td>6.8 kb</td>
        <td>2.5 kb</td>
    </tr>
</table>

<a name="benchmark"></a>
## Benchmark Ranking (Stress Test)

Run the benchmark (non-keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/">https://raw.githack.com/nextapps-de/mikado/master/bench/</a><br>

Run the benchmark (keyed):<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/?keyed">https://raw.githack.com/nextapps-de/mikado/master/bench/?keyed</a><br>

Sources and readme:<br>
<a href="bench/">https://github.com/nextapps-de/mikado/tree/master/bench</a>

Values represents operations per second, each benchmark task has to process a data array of 100 items. Higher values are better, except file size (minified/gzip) and memory (sum of allocation during the whole test).

<table>
    <tr></tr>
    <tr>
        <td><sup>Library</sup></td>
        <td align=center><sup>KB</sup></td>
        <td align=center><sup>RAM</sup></td>
        <td align=center><sup>Create</sup></td>
        <td align=center><sup>Replace</sup></td>
        <td align=center><sup>Update</sup></td>
        <td align=center><sup>Repaint</sup></td>
        <td align=center><sup>Append</sup></td>
        <td align=center><sup>Remove</sup></td>
        <td align=center><sup>Toggle</sup></td>
        <td align=center><sup>Clear</sup></td>
        <td align=center><sup>Index</sup></td>
        <td align=center><sup>Score</sup></td>
    </tr>
    <tr>
        <td>mikado</td>
        <td align=right><sub>2.8</sub></td>
        <td align=right><sub>7218</sub></td>
        <td align=right><sub>18850</sub></td>
        <td align=right><sub>7541</sub></td>
        <td align=right><sub>13596</sub></td>
        <td align=right><sub>259102</sub></td>
        <td align=right><sub>32852</sub></td>
        <td align=right><sub>29227</sub></td>
        <td align=right><sub>33436</sub></td>
        <td align=right><sub>26448</sub></td>
        <td align=right><b>966</b></td>
        <td align=right><b>5182</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>sinuous</td>
        <td align=right><sub>7.48</sub></td>
        <td align=right><sub>232137</sub></td>
        <td align=right><sub>618</sub></td>
        <td align=right><sub>8949</sub></td>
        <td align=right><sub>11343</sub></td>
        <td align=right><sub>315760</sub></td>
        <td align=right><sub>1202</sub></td>
        <td align=right><sub>16485</sub></td>
        <td align=right><sub>2252</sub></td>
        <td align=right><sub>16855</sub></td>
        <td align=right><b>496</b></td>
        <td align=right><b>1688</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>domc</td>
        <td align=right><sub>4.46</sub></td>
        <td align=right><sub>115023</sub></td>
        <td align=right><sub>946</sub></td>
        <td align=right><sub>6206</sub></td>
        <td align=right><sub>10455</sub></td>
        <td align=right><sub>93566</sub></td>
        <td align=right><sub>1942</sub></td>
        <td align=right><sub>22665</sub></td>
        <td align=right><sub>3624</sub></td>
        <td align=right><sub>24978</sub></td>
        <td align=right><b>474</b></td>
        <td align=right><b>1565</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>surplus</td>
        <td align=right><sub>15.79</sub></td>
        <td align=right><sub>175334</sub></td>
        <td align=right><sub>822</sub></td>
        <td align=right><sub>5525</sub></td>
        <td align=right><sub>6804</sub></td>
        <td align=right><sub>51383</sub></td>
        <td align=right><sub>1741</sub></td>
        <td align=right><sub>12961</sub></td>
        <td align=right><sub>3323</sub></td>
        <td align=right><sub>23702</sub></td>
        <td align=right><b>344</b></td>
        <td align=right><b>1142</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>inferno</td>
        <td align=right><sub>8.4</sub></td>
        <td align=right><sub>150165</sub></td>
        <td align=right><sub>703</sub></td>
        <td align=right><sub>2770</sub></td>
        <td align=right><sub>3456</sub></td>
        <td align=right><sub>5710</sub></td>
        <td align=right><sub>1376</sub></td>
        <td align=right><sub>7120</sub></td>
        <td align=right><sub>2286</sub></td>
        <td align=right><sub>14339</sub></td>
        <td align=right><b>231</b></td>
        <td align=right><b>819</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>lit-html</td>
        <td align=right><sub>17.31</sub></td>
        <td align=right><sub>352913</sub></td>
        <td align=right><sub>403</sub></td>
        <td align=right><sub>4516</sub></td>
        <td align=right><sub>7645</sub></td>
        <td align=right><sub>40423</sub></td>
        <td align=right><sub>839</sub></td>
        <td align=right><sub>8505</sub></td>
        <td align=right><sub>1449</sub></td>
        <td align=right><sub>4626</sub></td>
        <td align=right><b>230</b></td>
        <td align=right><b>777</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>redom</td>
        <td align=right><sub>2.88</sub></td>
        <td align=right><sub>287875</sub></td>
        <td align=right><sub>385</sub></td>
        <td align=right><sub>2191</sub></td>
        <td align=right><sub>3075</sub></td>
        <td align=right><sub>4236</sub></td>
        <td align=right><sub>744</sub></td>
        <td align=right><sub>6245</sub></td>
        <td align=right><sub>1295</sub></td>
        <td align=right><sub>10632</sub></td>
        <td align=right><b>233</b></td>
        <td align=right><b>743</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>mithril</td>
        <td align=right><sub>9.64</sub></td>
        <td align=right><sub>250668</sub></td>
        <td align=right><sub>641</sub></td>
        <td align=right><sub>2204</sub></td>
        <td align=right><sub>2704</sub></td>
        <td align=right><sub>4788</sub></td>
        <td align=right><sub>1153</sub></td>
        <td align=right><sub>6300</sub></td>
        <td align=right><sub>1972</sub></td>
        <td align=right><sub>11810</sub></td>
        <td align=right><b>196</b></td>
        <td align=right><b>685</b></td>
    </tr>
    <tr>
        <td>innerhtml</td>
        <td align=right><sub></sub></td>
        <td align=right><sub>415128</sub></td>
        <td align=right><sub>1020</sub></td>
        <td align=right><sub>1005</sub></td>
        <td align=right><sub>1008</sub></td>
        <td align=right><sub>901</sub></td>
        <td align=right><sub>898</sub></td>
        <td align=right><sub>1715</sub></td>
        <td align=right><sub>1210</sub></td>
        <td align=right><sub>26053</sub></td>
        <td align=right><b>165</b></td>
        <td align=right><b>542</b></td>
    </tr>
    <tr>
        <td>jquery</td>
        <td align=right><sub>31.26</sub></td>
        <td align=right><sub>519162</sub></td>
        <td align=right><sub>759</sub></td>
        <td align=right><sub>664</sub></td>
        <td align=right><sub>674</sub></td>
        <td align=right><sub>571</sub></td>
        <td align=right><sub>632</sub></td>
        <td align=right><sub>1045</sub></td>
        <td align=right><sub>766</sub></td>
        <td align=right><sub>5007</sub></td>
        <td align=right><b>85</b></td>
        <td align=right><b>344</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>ractive</td>
        <td align=right><sub>68.2</sub></td>
        <td align=right><sub>1318599</sub></td>
        <td align=right><sub>158</sub></td>
        <td align=right><sub>1335</sub></td>
        <td align=right><sub>1908</sub></td>
        <td align=right><sub>7826</sub></td>
        <td align=right><sub>323</sub></td>
        <td align=right><sub>2697</sub></td>
        <td align=right><sub>570</sub></td>
        <td align=right><sub>1480</sub></td>
        <td align=right><b>77</b></td>
        <td align=right><b>279</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>knockout</td>
        <td align=right><sub>24.8</sub></td>
        <td align=right><sub>5037020</sub></td>
        <td align=right><sub>89</sub></td>
        <td align=right><sub>72</sub></td>
        <td align=right><sub>77</sub></td>
        <td align=right><sub>70</sub></td>
        <td align=right><sub>78</sub></td>
        <td align=right><sub>211</sub></td>
        <td align=right><sub>94</sub></td>
        <td align=right><sub>953</sub></td>
        <td align=right><b>44</b></td>
        <td align=right><b>144</b></td>
    </tr>
</table>

The file size and memory gets less relevance. A ___score___ of 1000 represents the statistical midfield. The maximum possible ___index___ is 1000, that requires a library to be best in each category.

Read more about this test <a href="https://github.com/nextapps-de/mikado/blob/master/bench/README.md"><u>here</u></a> or take a look on <a href="https://github.com/nextapps-de/mikado/issues/7">Mobile Benchmark Results</a>.

<a name="api"></a>
## API Overview

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

Instance methods:
- <a href="#view.init">view.__init__(\<template\>, \<options\>)</a>
- <a href="#view.mount">view.__mount__(root)</a>
- <a href="#view.render">view.__render__(\<data\>, \<payload\>, \<callback\>)</a>
- <a href="#view.render">view.__apply__(node, \<data\>, \<payload\>)</a>
- <a href="#view.create">view.__create__(data)</a>
- <a href="#view.add">view.__add__(data, \<payload\>)</a>
- <a href="#view.update">view.__update__(node, data, \<payload\>)</a>
- <a href="#view.append">view.__append__(data, \<payload\>)</a>
- <a href="#view.replace">view.__replace__(node, data, \<payload\>)</a>
- <a href="#view.remove">view.__remove__(node)</a>
- <a href="#view.clear">view.__clear__(\<resize\>)</a>
- <a href="#view.data">view.__data__(index | node)</a>
- <a href="#view.node">view.__node__(index)</a>
- <a href="#view.index">view.__index__(node)</a>
- <a href="#view.destroy">view.__destroy__(\<unload?\>)</a>
- <a href="#view.unload">view.__unload__()</a>
- <a href="#view.sync">view.__sync__()</a>

Instance methods (not included in mikado.light.js):
- <a href="#view.refresh">view.__refresh__(\<payload\>)</a>
- <a href="#view.sync">view.__sync__(\<uncache?\>)</a>
- <a href="#view.purge">view.__purge__(\<template\>)</a>
- <a href="#view.find">view.__find__(data)</a>
- <a href="#view.search">view.__search__(data)</a>
- <a href="#view.where">view.__where__(payload)</a>
- <a href="#view.import">view.__import__()</a>
- <a href="#view.export">view.__export__()</a>
- <a href="#view.load">view.__load__(url, \<callback\>)</a>

DOM manipulation helpers (optional, not included in mikado.light.js):
- <a href="#view.listen">view.__listen__(event)</a>
- <a href="#view.unlisten">view.__unlisten__(event)</a>
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
        <td>Passed data for rendering are also stored and synchronized along the virtual dom. You can re-render the full state at any time, without passing the data.<br><b>Notice:</b> When passing an external reference of an existing Array-like object to the field "store" the store will perform all modifications directly to this reference (<a href="#extern">read more about "Extern Storage"</a>).</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>loose</b></td>
        <td>When storage is enabled this flag removes also data whenever a corresponding dom element was removed. <!--When set to true you cannot use paged rendering.--></td>
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
        <td>When enabled, a shared pool will be used. Requires <b>reuse</b> also to be enabled.</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>prefetch</b></td>
        <td>Prefetch/prebuilt a template on page load. Disable to save memory an speed up page start.</td>
        <td>true</td>
    </tr>  
    <!--
    <tr></tr>
    <tr>
        <td><b>once</b></td>
        <td>Performs the render of a template just one time. This only applies on <a href="static">static views</a>. The render ist starting immediately (do not call .render again!). When finishing it fully cleans up (removes view, data and also the template definition). This is useful for static views, which should persist in the app.</td>
        <td>false</td>
    </tr>
    -->
</table>

<a name="started" id="started"></a>
## Basic Example (Part 1)

Install Mikado via NPM:
```npm
npm install mikado
```

You can also classically include one of the distributed builds as a script tag or use the sources as ES6 modules.

> To make the command line interface available you have to install via NPM.

<a name="compiler"></a>
#### Compare Compiler Methods

<table>
    <tr></tr>
    <tr>
        <td>Method</td>
        <td>Memory</td>
        <td>Performance</td>
        <td>Notes</td>
    </tr>
    <tr>
        <td><a href="#mikado-compile">Mikado Compiler (CLI)</a></td>
        <td>best</td>
        <td align="right">6,156,704&nbsp;op/s</td>
        <td>
            <ul>
                <li>good for production</li>
                <li>bundle templates easily out of the box</li>
            </ul>
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td><a href="#compiler-service">Compiler Service (Server)</a></td>
        <td>best</td>
        <td align="right">(server-side)</td>
        <td>
            <ul>
                <li>good for production</li>
                <li>bundle not required</li>
                <li>best caching/re-using capabilities</li>
                <li>live updates</li>
            </ul>
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td><a href="#compiler-html5">HTML5 Templates (Runtime)</a></td>
        <td>good</td>
        <td align="right">53,715 op/s</td>
        <td>
            <ul>
                <li>good for development</li>
                <li>bundle templates requires additional tooling (like webpack)</li>
            </ul>
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td><a href="#compiler-string">Template String (Runtime)</a></td>
        <td>medium</td>
        <td align="right">15,062 op/s</td>
        <td>
            <ul>
                <li>good for development</li>
                <li>bundle templates easily out of the box</li>
            </ul>
        </td>
    </tr>
</table>

__Note:__ These benchmark results are just representing the duration of compiling. Choosing a specific compiler method has no impact on the render performance.

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
npx mikado compile user/list.html
```

> __Notation:__ npx mikado compile _{{input}} {{destination}}_

Instead of `npx mikado compile` you can also use `npx mikado-compile` alternatively. When a destination was not set, the input folder will be used instead.

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

## Basic Example (Part 2)

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

<a name="event" id="event"></a>
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

<b>List of all native supported events:</b>
- tap (synthetic touch-enabled "click" listener)
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

<a name="keyed"></a>
## Keyed/Non-Keyed Modes

> Each template instance can run in its own mode independently.

Compare benchmark of all supported modes here:<br>
https://raw.githack.com/nextapps-de/mikado/master/bench/?modes

#### 1. Non-Keyed

Just provide a template as normal:
```html
<div>
    <div>User:</div>
    <div>{{data.name}}</div>
</div>
```

along with these options:

```js
var view = Mikado.new(template, {reuse: true, pool: true});
```

This will switch Mikado into a "non-keyed" mode where already rendered components will be re-used. Using the pool is optional.

#### 2. Explicit Keyed

A keyed strategy provides better performance. It just requires an unique identifier on each rendered item (e.g. the ID).

Add the attribute ___key___ to the ___root element___ of a template and assign an unique identifier:
```html
<div key="data.id">
    <div>User:</div>
    <div>{{data.name}}</div>
</div>
```

To make them explicitly keyed also disable reusing:

```js
var view = Mikado.new(template, {reuse: false});
```

This will switch Mikado into a "explicit keyed" mode.

#### 3. Keyed (Cross-Shared)

> The shared keyed mode takes the advantages of both worlds and provides you an enhanced pooling of reusable components and also has the best performance as well as memory allocation during runtime.

Add the attribute ___key___ to the ___root element___ of a template:
```html
<div key="data.id">
    <div>User:</div>
    <div>{{data.name}}</div>
</div>
```

along with these options:

```js
var view = Mikado.new(template, {reuse: true, pool: true});
```

This will switch Mikado into a "cross-shared-keyed" mode.

#### 4. Keyed (Exclusive-Shared)

There is a last mode, which uses an exclusive keyed shared pool. This will give you the absolute maximum performance, but it has a limit you should keep in mind when using this mode. The exclusive keyed mode is unbounded. Just use this mode on templates where the pool of incoming data is supposed to be limited (e.g. in a common scenario: pagination through a limited list of x items). Otherwise you will get no performance gain and also the memory allocation increases constantly (unbounded).

```html
<div key="data.id">
    <div>User:</div>
    <div>{{data.name}}</div>
</div>
```

along with these options:

```js
var view = Mikado.new(template, {pool: false});
```

This will switch Mikado into a "exclusive-shared-keyed" mode.

<a name="reuse"></a>
## Non-/Reusing

Mikado supports all paradigm. Just pass the right <a href="#options">options</a> when initialize.

> Mikado is one of the very few libraries which provides you a 100% non-reusing paradigm out of the box.

Assume a list of new items comes fresh from an external source. Generally keyed libraries will fail in restoring the original state of a component when a data item of the new fetched list has the same key. Mikado is able to restoring 100% of the original state in any situation.

__Notice:__ An original state does not include an event listener which was directly bound to an element. The original state is the state before you apply anything manually (or by external).

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
## Render Templates (Assign Data)

> When using an internal storage (not external), every render task also updates the storage data.

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

## Modify Views

<a name="view.add"></a>
Add one data item to the end:
```js
view.add(data);
```

Add one data item before an index:
```js
view.add(data, 0); // add to beginning
```

<a name="view.append"></a>
Append multiple data items to the end:
```js
view.append(data);
```

<!--
Append multiple data before an index:
```js
view.append(data, 0); // append to beginning
```
-->

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

Purge shared pools from a specific template:
```js
view.purge(template);
```

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

<a name="manipulate" id="manipulate"></a>
## Manipulate Views

Manual changes on the DOM may require <a href="#view.sync">re-syncing</a>. To prevent re-syncing Mikado provides you several helper functions to manipulate the dom and also keep them in sync. Using the helper function also grants you a maximum performance.

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

Shift a data item/node by a specific offset:
```js
view.up(node, 3);
view.down(node, 3);
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
## Storage

Enable internal storage by passing the options during initialization:
```js
var view = new Mikado(template, { store: true });
```

Whenever you call the ___.render()___ function along with passed data, this data will keep in cache (internal storage). Mikado will handle those data for you.
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
#### Loose Option

When ___loose___ is enabled Mikado will use a data-to-dom binding strategy rather than keeping data separated from rendered elements/templates. This performs generally faster and has lower memory footprint but you will also loose any data at the moment when the corresponding dom element was also removed from the screen (render stack). In most situation this shouldn't be an issue, but it depends on your application.
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
#### Extern/Custom Store

You can also pass an reference to an external store. This store must be an Array-like type.
```js
var MyStore = [ /* Item Data */ ];
```

Pass in the external storage when initializing:
```js
var view = new Mikado(root, template, {
    store: MyStore,
    loose: false,
    persist: false
});
```

#### Export / Import Views

<a name="view.export"></a>
You can export the data of a view to the local storage.
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

<a name="load" id="load"></a>
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
#### Static Templates

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
npx mikado server
```

Instead of `npx mikado server` you can also use `npx mikado-server` alternatively.

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
        <td>Uses Mikado from the global namespace. This requires a non-ES6 build of mikado or import "browser.js", both <u>before</u> loading this template.</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>js</b></td>
        <td>A synonym for es5.</td>
    </tr>
</table>

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

<a name="includes" id="includes"></a>
## Includes

Partials gets its own instance under the hood. This results in high performance and also makes template factories re-usable when sharing same partials across different views.

> Be aware of circular includes. A partial cannot include itself (or later in its own chain). Especially when your include-chain growths remember this rule.

You can include partials as follows:
```html
<section>
    <title include="title"></title>
    <article include="article" as="data.content"></article>
    <footer include="footer"></footer>
</section>
```

The ___include___ attribute is related to the template name (filename), the ___as___ attribute is the reference which should be passed as the ___data___ to the partial.

Please notice, that each template requires one single root. When the template "template/title" has multiple nodes in the outer bound then wrap this into a new element as root or include as follows:
```html
<section>
    <include>{{ template/title }}</include>
    <include as="data.content">{{ template/article }}</include>
    <include>{{ template/footer }}</include>
</section>
```

Use pseudo-element:
```html
<section>
    <include from="title"/>
    <include from="article" as="data.content"/>
    <include from="footer"/>
</section>
```

> The pseudo-element ___\<include\>___ will extract into place. You cannot use dynamic expressions within curly brackets, just provide the name of the template.

In this example the template "template/title" gets the tag \<title\> as the template route.

### Loop Partials

```html
<section>
    <title>{{ data.title }}</title>
    <tweets include="tweet" for="data.data" max="5"></tweets>
</section>
```

In this example the template "tweet" loops the render through an array of tweets. The template "tweet" will get the array value from the current index as ___data___.

### Inline Loops

```html
<main>
    <title>{{ data.title }}</title>
    <tweets for="data.tweets">
        <section>{{ data.content }}</section>
    </tweets>
</main>
```

<a name="conditional" id="conditional"></a>
## Conditional Branches

```html
<main if="data.tweet.length">
    <title>{{ data.title }}</title>
    <section>{{ data.content }}</section>
    <footer>{{ data.footer }}</footer>
</main>
<main if="data.contacts.length">
    <title>{{ data.title }}</title>
    <section>{{ data.content }}</section>
    <footer>{{ data.footer }}</footer>
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

> The epxression for an observable property has to start with: "{{="

__Use with internal store:__
```js
var data = [...];
var view = new Mikado(template, { proxy: true });
view.render(data);
```

When data changes, the corresponding dom element will automatically change:
```js
view.store[0].name = "New Name";
```

__Use with external store:__
```js
var store = [];
var view = new Mikado(template, { proxy: store });
```

When data changes, the corresponding dom element will automatically change:
```js
store[0].name = "New Name";
```

#### Limitations

Proxy actually comes with some limitations on template expressions. Improving those restrictions is already work in progress and will release in v0.5.0.

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

#### Memory Optimizations

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

Clear shared pools of the current template:
```js
view.purge();
```

Clear shared pools of all templates:
```js
Mikado.purge();
```

Clear shared pools of a specific template:
```js
Mikado.purge(template);
```

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

<a name="concept"></a>
## Concept of Shared Pools

The are two kinds of pools under the hood. Both of them are shared across all template instances to make them re-usable. That also save memory and skip redundant re-calculations.

<br>
<img src="https://cdn.jsdelivr.net/gh/nextapps-de/mikado@3fb04d360aa4c7280cd8e7dd4f401a462132780f/doc/concept.svg" alt="Mikado Shared Pool (Concept)">

#### Factory Pool

The factory pool shares partials or same template definitions. When partials or templates are used more than once they will point to the same instance. That will save memory, skip redundant re-calculations and also improve runtime execution, because different jobs can now run through the same process (less reference spread).

#### Template Pool

The template pool is a feature accordingly to the option <a href="#reuse">reuse</a> and extends the strategy of re-using. Templates has to be created by the factory just <u>once</u> and stay available for re-using along the whole runtime. That's drastically improves everything to a complete new level. The memory allocation cuts down to a minimum (approx. reduce by a factor of 10). The creation/instantiation of new templates gets an amazing boost. When removing instances the garbage collector has almost nothing to do.

#### Keyed Pool

The keyed pool is basically the same concept like template pool, but it has keyed access and works differently than the template pool (which is queued and has indexed access). The keyed pool and the template pool are cross-shared, both of them could access the other. It depends on the mode which is running (keyed, non-keyed).

#### Live Pool

The live pool contains all elements which are actually rendered on screen (in use). That will keep track of not sharing elements which are already in use by another view. When elements were removed, they will move from live pool to the shared pools. When the option ___reuse___ was set to false, the live pool will also share its elements to the next render loop of the same view.

## Motivation

This library was build by reversed engineering with these primary goals as its base:
1. providing a clean, simple and non-cryptic tool for developers who focus on living standards and common styles
2. designer-readable templates based on pure html (most famous and compatible markup in the web)
3. providing the best overall performance
4. can be flexibly integrated into every stack

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

---

Copyright 2019 Nextapps GmbH<br>
Released under the <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache 2.0 License</a><br>

<!-- Web's fastest templating engine. Mikado takes templating performance to a whole new level. -->

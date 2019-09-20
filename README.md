<br>
<img src="https://cdn.jsdelivr.net/gh/nextapps-de/mikado@master/doc/mikado.svg" alt="Mikado.js" width="61.8%">

<h1></h1>
<h3>Web's smartest templating engine. Super-lightweight, outstanding performance, no dependencies.</h3>

<a target="_blank" href="https://www.npmjs.com/package/mikado"><img src="https://img.shields.io/npm/v/mikado.svg"></a>
<a target="_blank" href="https://travis-ci.org/nextapps-de/mikado"><img src="https://travis-ci.org/nextapps-de/flexsearch.svg?branch=master"></a>
<a target="_blank" href="https://coveralls.io/github/nextapps-de/mikado?branch=master"><img src="https://coveralls.io/repos/github/nextapps-de/mikado/badge.svg?branch=master"></a>
<a target="_blank" href="https://www.codacy.com/app/ts-thomas/Mikado?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nextapps-de/mikado&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/a896e010f6b4429aa7bc9a89550320a7"/></a>
<a target="_blank" href="https://github.com/nextapps-de/mikado/issues"><img src="https://img.shields.io/github/issues/nextapps-de/mikado.svg"></a>
<a target="_blank" href="https://github.com/nextapps-de/mikado/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/mikado.svg"></a>

<a href="#started">Getting Started</a> &ensp;&bull;&ensp; 
<a href="#options">Options</a> &ensp;&bull;&ensp; 
<a href="#api">API</a> &ensp;&bull;&ensp; 
<a href="#cli">Mikado CLI</a> &ensp;&bull;&ensp; 
<a href="#builds">Custom Builds</a> &ensp;&bull;&ensp; 
<a href="https://github.com/nextapps-de/mikado-compile">Template Compiler</a> &ensp;&bull;&ensp;
<a href="https://github.com/nextapps-de/mikado-server">Template Server</a> &ensp;&bull;&ensp; 
<a href="https://github.com/nextapps-de/mikado-express">Express Middleware (SSR)</a>

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
3. TodoMVC App: <a href="demo/todomvc/">Source Code</a>&ensp;/&ensp;<a href="https://raw.githack.com/nextapps-de/mikado/master/demo/todomvc/index.html">Run Demo</a>
4. <a href="https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/keyed/mikado">js-framework-benchmark</a>

Take a look into the source code of this pages is the best starting point.

Work in progress:
- ~~Conditional branches~~ ✓
- ~~Includes/partials~~ ✓
- ~~Live templates (for local development)~~ ✓
- ~~Persistent state~~ ✓
- Express Middleware
- ~~Loops (through partials)~~ ✓
- Plugin API

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

To get a specific version just replace `/master/` with one of the version numbers from the release e.g. `/0.0.8/`, or also a commit hash.

__Node.js__

```npm
npm install mikado
```

__Feature Comparison__
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
            <a href="#event">Event Binding</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#store">Data Binding</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#export">Persistent Storage</a>
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
            <a href="#manipulate">VDOM Manipulation Helpers</a>
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
            <a href="#includes">Includes/Partials</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr>
        <td>File Size (gzip)</td>
        <td>4.3 kb</td>
        <td>2.0 kb</td>
    </tr>
</table>

<a name="benchmark"></a>
## Benchmark (Stress Test)

Run the benchmark:<br>
<a href="https://raw.githack.com/nextapps-de/mikado/master/bench/index.html">https://raw.githack.com/nextapps-de/mikado/master/bench/index.html</a><br>

Sources and readme:<br>
<a href="bench/">https://github.com/nextapps-de/mikado/tree/master/bench</a>

Values represents operations per second, each benchmark task has to process an data array of 100 items. Higher values are better except file size (minified, gzip) and memory (allocation during the whole test).

<table>
    <tr></tr>
    <tr>
        <td><sup>Rank</sup></td>
        <td><sup>Library</sup></td>
        <td align=center><sup>Size kB</sup></td>
        <td align=center><sup>Memory B</sup></td>
        <td align=center><sup>Create</sup></td>
        <td align=center><sup>Update</sup></td>
        <td align=center><sup>Partial</sup></td>
        <td align=center><sup>Append</sup></td>
        <td align=center><sup>Repaint</sup></td>
        <td align=center><sup>Reduce</sup></td>
        <td align=center><sup>Remove</sup></td>
        <td align=center><sup>Score</sup></td>
    </tr>
    <tr>
        <td>1</td>
        <td>mikado-0.1.2</td>
        <td align=right>2</td>
        <td align=right>167336</td>
        <td align=right>1599</td>
        <td align=right>7158</td>
        <td align=right>12829</td>
        <td align=right>838</td>
        <td align=right>251559</td>
        <td align=right>28938</td>
        <td align=right>25969</td>
        <td align=right><b>949</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>2</td>
        <td>domc-0.0.12</td>
        <td align=right>4.46</td>
        <td align=right>207488</td>
        <td align=right>957</td>
        <td align=right>6575</td>
        <td align=right>11284</td>
        <td align=right>865</td>
        <td align=right>92368</td>
        <td align=right>20701</td>
        <td align=right>24041</td>
        <td align=right><b>708</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>3</td>
        <td>sinuous-0.14.2</td>
        <td align=right>5.6</td>
        <td align=right>265192</td>
        <td align=right>629</td>
        <td align=right>9214</td>
        <td align=right>11545</td>
        <td align=right>571</td>
        <td align=right>308677</td>
        <td align=right>18060</td>
        <td align=right>13749</td>
        <td align=right><b>676</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>4</td>
        <td>redom-3.24.1</td>
        <td align=right>2.88</td>
        <td align=right>246936</td>
        <td align=right>369</td>
        <td align=right>2632</td>
        <td align=right>4790</td>
        <td align=right>381</td>
        <td align=right>58468</td>
        <td align=right>19843</td>
        <td align=right>11991</td>
        <td align=right><b>448</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>5</td>
        <td>inferno-7.3.1</td>
        <td align=right>8.4</td>
        <td align=right>410960</td>
        <td align=right>706</td>
        <td align=right>2623</td>
        <td align=right>3199</td>
        <td align=right>617</td>
        <td align=right>5538</td>
        <td align=right>6527</td>
        <td align=right>14009</td>
        <td align=right><b>345</b></td>
    </tr>
    <tr>
        <td>6</td>
        <td>innerHTML</td>
        <td align=right>-</td>
        <td align=right>406992</td>
        <td align=right>983</td>
        <td align=right>956</td>
        <td align=right>854</td>
        <td align=right>425</td>
        <td align=right>847</td>
        <td align=right>1742</td>
        <td align=right>26346</td>
        <td align=right><b>343</b></td>
    </tr>
    <tr>
        <td>7</td>
        <td>surplus-0.5.3</td>
        <td align=right>15.79</td>
        <td align=right>166288</td>
        <td align=right>698</td>
        <td align=right>632</td>
        <td align=right>640</td>
        <td align=right>282</td>
        <td align=right>639</td>
        <td align=right>1460</td>
        <td align=right>15469</td>
        <td align=right><b>294</b></td>
    </tr>
    <tr></tr>
    <tr>
        <td>8</td>
        <td>jquery-3.4.1</td>
        <td align=right>31.26</td>
        <td align=right>819032</td>
        <td align=right>746</td>
        <td align=right>650</td>
        <td align=right>578</td>
        <td align=right>305</td>
        <td align=right>565</td>
        <td align=right>895</td>
        <td align=right>4919</td>
        <td align=right><b>158</b></td>
    </tr>
</table>

<code>Score = Sum<sub>test</sub>(self_ops / max_ops) / test_count * 1000</code>

The maximum possible score is 1000, that requires a library to be best in each category.<br>
Read more about this test <a href="bench/#readme">here</a>.

<a name="api"></a>
## API Overview

Constructor:
- new <a href="#mikado.new">__Mikado__(\<root\>, template, \<options\>)</a> : view

Global methods:
- <a href="#mikado.new">Mikado.__new__(\<root\>, template, \<options\>)</a> : view
- <a href="#mikado.once">Mikado.__once__(root, template, \<items\>, \<payload\>, \<callback\>)</a>
- <a href="#mikado.register">Mikado.__register__(template)</a>
- <a href="#mikado.unload">Mikado.__unload__(template)</a>

Global methods (not included in mikado.light.js):
- <a href="#mikado.load">Mikado.__load__(url, \<callback\>)</a>

Instance methods:
- <a href="#view.init">view.__init__(\<template\>, \<options\>)</a>
- <a href="#view.mount">view.__mount__(root)</a>
- <a href="#view.render">view.__render__(\<items\>, \<payload\>, \<callback\>)</a>
- <a href="#view.refresh">view.__refresh__(\<payload\>)</a>
- <a href="#view.create">view.__create__(item)</a>
- <a href="#view.add">view.__add__(item, \<payload\>)</a>
- <a href="#view.update">view.__update__(node, item, \<payload\>)</a>
- <a href="#view.append">view.__append__(items, \<payload\>)</a>
- <a href="#view.replace">view.__replace__(node, item, \<payload\>)</a>
- <a href="#view.remove">view.__remove__(node)</a>
- <a href="#view.clear">view.__clear__(\<resize\>)</a>
- <a href="#view.item">view.__item__(index)</a>
- <a href="#view.node">view.__node__(index)</a>
- <a href="#view.index">view.__index__(node)</a>
- <a href="#view.find">view.__find__(item)</a>
- <a href="#view.search">view.__search__(item)</a>
- <a href="#view.where">view.__where__(payload)</a>
- ~~view.__parse__(template)~~
- <a href="#view.destroy">view.__destroy__(\<unload?\>)</a>
- <a href="#view.unload">view.__unload__()</a>
- <a href="#view.sync">view.__sync__()</a>

Instance methods (not included in mikado.light.js):
- <a href="#view.import">view.__import__()</a>
- <a href="#view.export">view.__export__()</a>
- <a href="#view.load">view.__load__(url, \<callback\>)</a>
- ~~view.__sort__(field, \<direction | handler\>)~~
- <a href="#view.listen">view.__listen__(event)</a>
- <a href="#view.unlisten">view.__unlisten__(event)</a>
- <a href="#view.move">view.__move__(node|index, index)</a>
- <a href="#view.up">view.__up__(node|index)</a>
- <a href="#view.down">view.__down__(node|index)</a>
- <a href="#view.first">view.__first__(node|index)</a>
- <a href="#view.last">view.__last__(node|index)</a>
- <a href="#view.before">view.__before__(node|index, node|index)</a>
- <a href="#view.after">view.__after__(node|index, node|index)</a>
- <a href="#view.swap">view.__swap__(node|index, node|index)</a>
- ~~view.__shuffle__()~~

<!-- <a href="#view.pager">view.__pager__(items, \<options\>, \<callback\>)</a> -->

Instance properties:
- ~~view.__dom__~~
- <a href="#view.length">view.__length__</a>
- <a href="#view.store">view.__store__</a>
- <a href="#view.state">view.__state__</a>
- ~~view.__config__~~
- <a href="#view.id">view.__template__</a>

Global helpers (not included in mikado.light.js):
- <a href="#Mikado.setText">Mikado.__setText__(node, text)</a>
- <a href="#Mikado.getText">Mikado.__getText__(node)</a>
- <a href="#Mikado.setHTML">Mikado.__setHTML__(node, html)</a>
- <a href="#Mikado.getHTML">Mikado.__getHTML__(node)</a>
- <a href="#Mikado.setClass">Mikado.__setClass__(node, class)</a>
- <a href="#Mikado.getClass">Mikado.__getClass__(node)</a>
- <a href="#Mikado.hasClass">Mikado.__hasClass__(node, class)</a>
- <a href="#Mikado.removeClass">Mikado.__removeClass__(node, class)</a>
- <a href="#Mikado.toggleClass">Mikado.__toggleClass__(node, class)</a>
- <a href="#Mikado.setStyle">Mikado.__setStyle__(node, property, value)</a>
- <a href="#Mikado.getStyle">Mikado.__getStyle__(node, property)</a>
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
        <td>The template which should be assigned to the Mikado instance.</td>
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
        <td>Passed items for rendering are also stored and synchronized along the virtual dom. You can re-render the full state at any time, without passing the item data.<br><b>Notice:</b> When passing an external reference of an existing Array-like object to the field "store" the store will perform all modifications directly to this reference (<a href="#extern">read more about "Extern Storage"</a>).</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>loose</b></td>
        <td>When storage is enabled this flag removes also item data whenever a corresponding dom element was removed. <!--When set to true you cannot use paged rendering.--></td>
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
        <td><b>once</b></td>
        <td>Performs the render of a template just one time. This only applies on <a href="static">static views</a>. The render ist starting immediately (do not call .render again!). When finishing it fully cleans up (removes view, item data and also the template definition). This is useful for static views, which should persist in the app.</td>
        <td>false</td>
    </tr>
</table>

<a name="started" id="started"></a>
## Basic Example

Install Mikado via NPM or include one of the distributed builds:
```npm
npm install mikado
```

> To make the command line interface available you have to install via NPM.

Define a HTML-like template and use double curly brackets to mark dynamic expressions which should be calculated during runtime:
```html
<table>
    <tr>
        <td>User:</td>
        <td>{{item.user}}</td>
    </tr>
    <tr>
        <td>Tweets:</td>
        <td>{{item.tweets.length}}</td>
    </tr>
</table>
```

Save this template e.g. to _template/template.html_.

> The preserved keyword ___item___ is a reference to a passed item. You can access the whole nested object.

Mikado comes up with a template compiler which has to be run through Node.js and provides a command line interface (CLI) to start compilation tasks. The template compiles into a fully compatible JSON format and could also be used for server-side rendering.

Install Mikado Compiler via NPM:
```npm
npm install mikado-compile
```

Compile the template through the command line by:
```cmd
mikado compile template/template.html
```

> __Notation:__ mikado _{{input}} {{destination}}_

Instead of `mikado compile` you can also use `npx mikado compile` alternatively. When a destination was not set, the input folder will be used instead.

After compilation you will have 4 different files:
1. __template.js__ the template compiled in ES5 compatible Javascript
2. __template.es6.js__ the template compiled as an ES6 module
3. __template.json__ the template compiled in JSON-compatible notation (<a href="#load">to load via http request</a>)
4. __template.html__ the HTML-like template (reference, do not delete it)

Assume there is an array of data to render (or just one item):
```js
var items = [{
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
<script src="template/template.js"></script>
<script>
    var view = Mikado.new("template");
</script>
```

> The name of a template inherits from its corresponding filename.

Load library and initialize template (ES6):
```html
<script type="module">
    import Mikado from "./mikado.js";
    import template from "./template/template.es6.js";
    var view = Mikado.new(template);
</script>
```

After creation you need mount to a DOM element initially as a destination root and render the template with data:
```js
view.mount(document.body);
view.render(items);
```

You can also chain methods:

```js
var view = Mikado.new(template).mount(document.body).render(items);
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

Mixing text nodes __and__ child nodes within __same__ root is actually not possible:
```html
<main>
    {{ item.title }}
    <section>{{ item.content }}</section>
    {{ item.footer }}
</main>
```

This may provided in the future, in the meanwhile just wrap text nodes into its own child:
```html
<main>
    <title>{{ item.title }}</title>
    <section>{{ item.content }}</section>
    <footer>{{ item.footer }}</footer>
</main>
```

This example has not this issue, because text nodes and child nodes are not mixed:
```html
<main>
    <section>{{ item.title }} foobar {{ item.footer }}</section>
</main>
```

## Advanced Example

A bit more complex template:
```html
<section id="{{item.id}}" class="{{this.state.theme}}" data-index="{{index}}">
    {{@var is_today = item.date === view.today}}
    <div class="{{item.class}} {{is_today ? 'on' : 'off'}}">
        <div class="title" style="font-size: 2em">{{item.title.toUpperCase()}}</div>
        <div class="content {{index % 2 ? 'odd' : 'even'}}">{{#item.content}}</div>
        <div class="footer">{{view.parseFooter(item)}}</div>
    </div>
</section>
```

You can use any Javascript within the {{ ... }} curly bracket notation.

> To pass html markup as a string, the curly brackets needs to be followed by a "#" e.g. {{#...}}

> To use Javascript outside an elements content you need to prevent concatenation of the returned value. For this purpose the curly brackets needs to be followed by a "@" e.g. {{@...}}

Within a template you have access to the following indentifiers:

<table>
    <tr></tr>
    <tr>
        <td>Identifier</td>
        <td>Description</td>
        <td>Passed Mode</td>
    </tr>
    <tr>
        <td><b>item</b></td>
        <td>A full reference to a passed data item.</td>
        <td>auto</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>view</b></td>
        <td>An optional payload used to manually pass in non-item specific data or helper functions.</td>
        <td>manual</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>index</b></td>
        <td>Represents the index of the currently rendered item.</td>
        <td>auto</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>this</b></td>
        <td>Provides you access to the Mikado view instance.</td>
        <td>auto</td>
    </tr>
    <tr></tr>
    <tr>
        <td>this.<b>state</b></td>
        <td>An object used to keep data as a state across runtime. State data are shared across all Mikado instances.</td>
        <td>auto (manual set)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>this.<b>store</b></td>
        <td>Gives access to the internal item store (Array).</td>
        <td>auto</td>
    </tr>
    <tr></tr>
    <tr>
        <td>this.<b>length</b></td>
        <td>The length of all items actually rendered (to get length of stored items use <i>this.store.length</i> instead).</td>
        <td>auto</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>window</b></td>
        <td>The global namespace</td>
        <td>auto</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b>self</b></td>
        <td>Points to the current rendered element itself. Using "js" node property or by using the {{@ marker grants you to have "self" available.</td>
        <td>auto</td>
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

Alternatively of accessing _item_, _view_, _index_ and _this.state_ you can also access variables from the global namespace.

> For performance relevant tasks avoid passing html contents as string.

To finish the example above provide one single or an array of ___item___ data:
```js
var items = [{
    id: "230BA161-675A-2288-3B15-C343DB3A1DFC",
    date: "2019-01-11",
    class: "yellow, green",
    title: "Sed congue, egestas lacinia.",
    content: "<p>Vivamus non lorem <b>vitae</b> odio sagittis amet ante.</p>",
    footer: "Pellentesque tincidunt tempus vehicula."
}]
```

Provide ___view___ payload (non-item specific data and helper methods used by the template):
```js
var payload = {
    page: 1,
    today: "2019-01-11",
    parseFooter: function(item){ return item.footer; }
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
view.render(items, payload);
```

Render asynchronously by providing a callback function:
```js
view.render(items, payload, function(){
    console.log("finished.");
});
```

To render asynchronously by using promises you need to create the view instance with the ___async___ option flag:
```js
view = Mikado.new(template, { async: true });

view.render(items, payload).then(function(){
    console.log("finished.");
});
```

<a name="event" id="event"></a>
## Event Bindings

Lets take this example:
```html
<table data-id="{{item.id}}" root>
    <tr>
        <td>User:</td>
        <td click="show-user">{{item.user}}</td>
        <td><a click="delete-user:root">Delete</a></td>
    </tr>
</table>
```

There are 2 click listeners. The attribute value represents the name of the route. The second listener has a route separated by ":", this will delegate the event from the route "delete-user" to the closest element which contains the attribute "root".

Define routes:
```js
view.route("show-user", function(node){

    alert(node.textContent);

}).route("delete-user", function(node){

    alert(node.dataset.id);
})
```

Routes are stored globally, so you can share routes through all Mikado instances.

<b>List of all native supported events:</b>
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
    <tr></tr>
    <tr>
        <td><b>swipe</b></td>
        <td>* This gesture is currently in progress.</td>
    </tr>
</table>

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

> When using storage, every render task also updates the storage data.

Render a template incrementally through a set of item data:
```js
view.render(items);
```

Render a template with item data and also use view-specific data/handlers:
```js
view.render(items, payload);
```

Schedule a render task asynchronously to the next animation frame:
```js
view.render(items, payload, true);
```

Schedule a render task by using a callback:
```js
view.render(items, payload, function(){
    // finished
});
```

Schedule a render task by using promises (requires option ___async___ to be enabled during initialization):
```js
view.render(items, payload).then(function(){
    // finished
});
```

Render a static template (which uses no dynamic content):
```js
view.render();
```

<a name="view.refresh"></a>
Repaint the current state of a dynamic template (which has item data, requires ___store___ to be enabled):
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
var partial = view.create(item);
```

Orphans are not a part of the internal render tree. The construction of orphans is really fast. You could also use the light version of Mikado an apply your own stack on top of this method.

## Modify Views

<a name="view.add"></a>
Add one item to the end:
```js
view.add(items);
```

Add one item before an index:
```js
view.add(items, 0); // add to beginning
```

<a name="view.append"></a>
Append multiple items to the end:
```js
view.append(items);
```

Append multiple items before an index:
```js
view.append(items, 0); // append to beginning
```

<a name="view.remove"></a>
Remove a specific item/node:
```js
view.remove(node);
```

Remove first 20 items:
```js
view.remove(20);
```

Remove last 20 items:
```js
view.remove(-20);
```

Remove next 20 items of a given node (including):
```js
view.remove(node, 20);
```

Remove previous 20 items of a given node (including):
```js
view.remove(node, -20);
```

<a name="view.clear"></a>
Remove all:
```js
view.clear();
```

<a name="view.replace"></a>
Replace an item/node:
```js
view.replace(old, new);
```

<a name="view.update"></a>
Update an single item/node:
```js
view.update(node, item);
```

<a name="view.sync"></a>
Re-Sync DOM:
```js
view.sync();
```

### Useful Helpers

<a name="view.node"></a>
Get a template root node from the DOM by index:
```js
var node = view.node(index);
```

<a name="view.item"></a>
Get an item from the store by index:
```js
var item = view.item(index);
```

<a name="view.index"></a>
Get the index from a given node:
```js
var index = view.index(node);
```

<a name="view.find"></a>
Find a node which corresponds to a data item (same reference):
```js
var node = view.find(item);
```

<a name="view.search"></a>
Find the first node which corresponds to a data item which has same content (that requires each item to be unique, otherwise use ___where___):
```js
var node = view.search(item);
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
var node = view.where(item);
```

Get the length of all items rendered (in store):
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
Move an item/node to a specific index:
```js
view.move(node, 15);  // 15 from start
view.move(node, -15); // 15 from end
```

<a name="view.first"></a><a name="view.last"></a>
Move an item/node to the top or bottom:
```js
view.first(node);
view.last(node);
```

<a name="view.up"></a><a name="view.down"></a>
Move an item/node by 1 index:
```js
view.up(node);
view.down(node);
```

Shift an item/node by a specific offset:
```js
view.up(node, 3);
view.down(node, 3);
```

<a name="view.before"></a><a name="view.after"></a>
Move an item/node before or after another item/node:
```js
view.before(node_a, node_b);
view.after(node_a, node_b);
```

<a name="view.swap"></a>
Swap two items/nodes:
```js
view.swap(node_a, node_b);
```

<a name="cache"></a>
## DOM State Caching

Caching of DOM properties can greatly increase performance (up to 20x). There are just few situations where caching will not improve performance, it fully depends on your application.

> __Recommendation:__ enable caching when several of your item data will stay unchanged from one to another render task. Disable caching when changes on data requires a fully re-render more often.

Caching is by default enabled, this may change in future, so best is to explicitly set this flag when initializing:
```js
var view = new Mikado(template, { cache: true });
```

We strongly recommended to read the next section to understand how caching is working.

#### The Concept

Let's take a simple template as an example:
```html
<root>
    <div class="active">{{ item.title }}</div>
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
    <div class="{{ view.active }}">{{ item.title }}</div>
</root>
```

You do not have to use item data only, you can also use a payload <a href="#view">view</a> or the <a href="#state">state</a> property. This make using and re-using templates very flexible.

Now lets come to the __most important part__ when using caching properly. Assume you have rendered the template above with caching enabled. Now you __manually__ change DOM attributes:
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

Do not worry, there exist an rescue method to force re-sync:
```js
view.sync(); // re-sync dom nodes
```
```js
view.sync(true); // re-sync dom nodes and properties
```

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
Sort items/nodes by a field from the item data:
```js
view.sort("title");
```

Sort items/nodes by descending order:
```js
view.sort("title", "desc");
```

Sort items/nodes by a custom handler (should return negative, positive and zero offsets):
```js
view.sort(function(item_a, item_b){
    return item_a.time < item_b.time ? 1 : 
          (item_a.time > item_b.time ? -1 : 0)
});
```
-->

<a name="store" id="store"></a>
## Storage

Enable storage by passing the options during initialization:
```js
var view = new Mikado(root, template, {
    store: true,
    loose: true
});
```

Whenever you call the ___.render()___ function with passed item data, this data will keep in cache. Mikado will handle those data for you.
```js
view.render(items);
```

You can re-render the last/current state at any time without passing items again:
```js
view.render();
```

Or force an update to a specific index:
```js
view.update(index);
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

#### Export / Import Views

<a name="view.export"></a>
You can export the latest rendering state of a view along with its item data to the local storage.
```js
view.export();
```

<a name="view.import"></a>
You can import and render the stored view by:
```js
view.import().render();
```

> When exporting/importing templates, the ID is used as key. The template ID corresponds to its filename.

You cannot export several instances of the same template which holds different data. Also the ___state___ is not included in the export.

<a name="options.loose"></a>
#### Loose Option

When ___loose___ is enabled Mikado will use a data-to-dom binding strategy rather than keeping data separated from rendered elements/templates. This performs generally faster and has lower memory footprint but you will also loose any item data at the moment when the corresponding dom element was also removed from the screen (render stack). In most situation this shouldn't be an issue, but it depends on your application. <!--When enabled you cannot use <a>paginated render</a>.-->

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
view.mount(document.body).render(items);
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
view.mount(document.body).init("template").render(items);
```

<a name="static"></a>
#### Static Templates

When a template has no dynamic expressions (within curly brackets) which needs to be evaluated during runtime Mikado will handle those templates as _static_ and skips the dynamic render part. Static views could be rendered without passing item data.

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
Mikado.once(root, template, items); // dynamic view
Mikado.once(root, template, items, payload, callback);
```

When destroying a template, template definitions will still remain in the global cache. Maybe for later use or when another instances uses the same template (which is generally not recommended).

When unloading templates explicitly the template will also removes completely. The next time the same template is going to be re-used it has to be re-loaded and re-parsed again. In larger applications it might be useful to unload views to free memory when they was closed by the user.

## Compiler Service / Live Templates

Mikado provides you a webserver to serve templates via a simple RESTful API. This allows you to send views live from a server. Also this can be used for live reloading templates in a local development environment.

Install Mikado Server via NPM:
```npm
npm install mikado-server
```

Start the compiler server:

```cmd
mikado server
```

Instead of `mikado server` you can also use `npx mikado server` alternatively.

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
    <article include="article" as="item.content"></article>
    <footer include="footer"></footer>
</section>
```

The ___include___ attribute is related to the template name (filename), the ___as___ attribute is the reference which should be passed as the ___item___ to the partial.

Please notice, that each template requires one single root. When the template "template/title" has multiple nodes in the outer bound then wrap this into a new element as root or include as follows:
```html
<section>
    <include>{{ template/title }}</include>
    <include as="item.content">{{ template/article }}</include>
    <include>{{ template/footer }}</include>
</section>
```

Use pseudo-element:
```html
<section>
    <include from="title"/>
    <include from="article" as="item.content"/>
    <include from="footer"/>
</section>
```

> The pseudo-element ___\<include\>___ will extract into place. You cannot use dynamic expressions within curly brackets, just provide the name of the template.

In this example the template "template/title" gets the tag \<title\> as the template route.

### Loop Partials

```html
<section>
    <title>{{ item.title }}</title>
    <tweets include="tweet" for="item.data" max="5"></tweets>
</section>
```

In this example the template "tweet" loops the render through an array of tweets. The template "tweet" will get the array value from the current index as ___item___.

### Inline Loops

```html
<main>
    <title>{{ item.title }}</title>
    <tweets for="item.tweets">
        <section>{{ item.content }}</section>
    </tweets>
</main>
```

<a name="conditional" id="conditional"></a>
## Conditional Branches

```html
<main if="item.tweet.length">
    <title>{{ item.title }}</title>
    <section>{{ item.content }}</section>
    <footer>{{ item.footer }}</footer>
</main>
<main if="item.contacts.length">
    <title>{{ item.title }}</title>
    <section>{{ item.content }}</section>
    <footer>{{ item.footer }}</footer>
</main>
```

```html
<main>
    <title>{{ item.title }}</title>
    <tweets if="item.tweets.length" for="item.tweets">
        <section>{{ item.content }}</section>
    </tweets>
</main>
```

```html
<main>
    <title>{{ item.title }}</title>
    <tweets for="item.tweets">
        <section if="item.content">{{ item.content }}</section>
    </tweets>
</main>
```

## Best Practices

A Mikado instance has a stronger relation to the template as to the root element. Please keep this example in mind:

This is good:
```js
var view = new Mikado(template);

view.mount(root_a).render(items);
view.mount(root_b).render(items);
view.mount(root_c).render(items);
```

This is bad:
```js
view.mount(root);
view.init(tpl_a).render(items);
view.init(tpl_b).render(items);
view.init(tpl_c).render(items);
```

Instead doing this:
```js
var view_a = new Mikado(tpl_a);
var view_b = new Mikado(tpl_b);
var view_c = new Mikado(tpl_c);

view_a.mount(root_c).render(items);
view_b.mount(root_b).render(items);
view_c.mount(root_a).render(items);
```

Ideally every template should have initialized by one (and only one) Mikado instance and should be re-mounted when using in another context. Re-mounting is very fast but re-assigning templates is not as fast.

## Motivation

This library was build by reversed engineering with these primary goals as its base:
1. providing a clean, simple and __non-cryptic__ tool for developers who focus on living standards and common styles
2. designer-readable templates based on pure html (most famous and compatible markup in the web)
3. providing the best overall performance

<!--
This library was __not__ build for:
- replacing Angular, React or Co.
- mimic to be Angular, React or Co.
- fit to any of your favourite templating frameworks you are already using
-->

## About Data Binding

Instead of bind nodes/vnodes to a data item Mikado bind/references data items to nodes. The <a href="#options.loose">loose</a> option lets you control how is data handled when its corresponding node was removed from the dom. You might think there is a drawback in missing diffing, but lets take an example:

```html
<item>A</item>
<item>B</item>
<item>C</item>
```

Assume that the items content stay unchanged and just the order should changes to:

```html
<item>C</item>
<item>A</item>
<item>B</item>
```

Some libs may try to swap nodes to its new place. But that has a noticeable bigger impact to the dom of a factor of 5 and higher (!) in comparison when existing nodes wil just re-rendered with the new data (for which the option <a href="#options.reuse">reuse</a> is for). The decoupled event delegation of Mikado allows you to keep listeners referenced to the right node. Surely that's not the same, but I never had a situation where this was an issue. Just keep in mind to use template notations for any value which should change dynamically (e.g. the attribute "checked") and you are save. Since Mikado was reversed engineered and the goal "keeping real nodes" was not on the table, it shouldn't be a mandatory criteria for you. If so, then you are lucky that you can use one of the dozen other templating libs out there.

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
        <td>VDOM Cache</td>
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
        <td>true, false</td>
        <td>VDOM Manipulation helpers</td>
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

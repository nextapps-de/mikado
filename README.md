<br>
<img src="https://cdn.jsdelivr.net/gh/nextapps-de/mikado@master/doc/mikado.svg" alt="Mikado.js" width="61.8%">

<h1></h1>
<h3>Web's smartest and fastest virtual DOM templating engine. Super-lightweight, outstanding performance, no dependencies.</h3>

<a target="_blank" href="https://www.npmjs.com/package/mikado"><img src="https://img.shields.io/npm/v/mikado.svg"></a>
<a target="_blank" href="https://github.com/nextapps-de/mikado/issues"><img src="https://img.shields.io/github/issues/nextapps-de/mikado.svg"></a>
<a target="_blank" href="https://github.com/nextapps-de/mikado/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/mikado.svg"></a>

<a href="#started">Getting Started</a> &ensp;&bull;&ensp; <a href="#options">Options</a> &ensp;&bull;&ensp; <a href="#api">API</a> &ensp;&bull;&ensp; <a href="#builds">Custom Builds</a>

Benchmark:

https://krausest.github.io/js-framework-benchmark/current.html

Demo:

1. <a href="test/demo.html">Standard Javascript</a>
2. <a href="test/demo.es6.html">ES6 Modules</a>

Take a look into the source code of this pages.

Actually in progress:
- Conditional branches
- Includes/partials
- Live templates (local development)
- Persistent state
- Paginated Render
- Loops (through partials)
- Plugin API

#### Get Latest (Stable Release):

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
            <a href="#event">Event Binding</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#store">Data Store</a>
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
            <a href="#manipulate">DOM Manipulation Collection</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#storage">Storage</a>
        </td>
        <td>✓</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#paging">Paginated Render</a>
        </td>
        <td>WIP</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#conditional">Conditional Branches</a>
        </td>
        <td>WIP</td>
        <td>-</td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <a href="#includes">Includes/Partials</a>
        </td>
        <td>WIP</td>
        <td>-</td>
    </tr>
    <tr>
        <td>File Size (gzip)</td>
        <td>4.1 kb</td>
        <td>1.6 kb</td>
    </tr>
</table>

<a name="api"></a>

## API Overview

Constructor:
- <a href="#mikado.create">__Mikado__(\<root\>, template, \<options\>)</a>

Global methods:
- <a href="#mikado.create">Mikado.__new__(template, \<options\>)</a>
- <a href="#mikado.register">Mikado.__register__(template)</a>
- <a href="#mikado.load">Mikado.__load__(url, \<callback\>)</a>
- <a href="#mikado.load">Mikado.__unload__(template)</a>

Instance methods:
- <a href="#view.init">View.__init__(\<template\>, \<options\>)</a>
- <a href="#view.mount">View.__mount__(root)</a>
- <a href="#view.render">View.__render__(items)</a>
- <a href="#view.create">View.__create__(item)</a>
- <a href="#view.add">View.__add__(item)</a>
- <a href="#view.add">View.__update__(node, item)</a>
- <a href="#view.append">View.__append__(items)</a>
- <a href="#view.clear">View.__clear__()</a>
- <a href="#view.replace">View.__replace__(node, node)</a>
- <a href="#view.remove">View.__remove__(node)</a>
- <a href="#view.item">View.__item__(index)</a>
- <a href="#view.node">View.__node__(index)</a>
- <a href="#view.index">View.__index__(node)</a>
- <a href="#view.parse">View.__parse__(template)</a>
- <a href="#view.sync">View.__sync__()</a>
- <a href="#view.sync">View.__destroy__()</a>

Instance methods (not included in mikado.light.js):
- <a href="#view.sync">View.__listen__(event)</a>
- <a href="#view.sync">View.__unlisten__(event)</a>
- <a href="#view.move">View.__move__(node, index)</a>
- <a href="#view.shift">View.__shift__(node, offset)</a>
- <a href="#view.up">View.__up__(node)</a>
- <a href="#view.down">View.__down__(node)</a>
- <a href="#view.first">View.__first__(node)</a>
- <a href="#view.last">View.__last__(node)</a>
- <a href="#view.before">View.__before__(node, node)</a>
- <a href="#view.after">View.__after__(node, node)</a>
- <a href="#view.swap">View.__swap__(node, node)</a>
- <a href="#view.shuffle">View.__shuffle__()</a>

Instance properties:
- ~~View.__dom__~~
- <a href="#view.length">View.__length__</a>
- <a href="#view.length">View.__store__</a>
- <a href="#view.length">View.__state__</a>
- <a href="#view.length">View.__id__</a>

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
        <td>Enable/disable caching. Caching can greatly increase performance (up to 20x). Be careful, it fully depends on your application, there are situations where a enabled cache performs slower.<br><b>Recommendation:</b> enable caching when several of your item data will stay unchanged from one to another render task. Disable caching when changes on data requires a fully re-render more often.</td>
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
        <td>When storage is enabled this flag removes also item data whenever a corresponding dom element was removed. When set to true you cannot use paged rendering.</td>
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
        <td>Performs the render of a template just one time. When finishing it fully cleansup (removes view, item data and also the template definition). This is useful for static views, which should persist in the app.</td>
        <td>false</td>
    </tr>
</table>

<a name="started" id="started"></a>
## Basic Example

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

Install Mikado via NPM to make the command line interface available:
```npm
npm install mikado
```

Compile the template through the command line by:
```cmd
mikado template/template.html
```

> __Notation:__ mikado _{{input}} {{destination}}_

Instead of `mikado` you can also use `node task/compile` alternatively. When a destination was not set, the input folder will be used instead.

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
        <td><b><s>root</s></b></td>
        <td><s>Points to the root element of a current rendered template (this is not the root where the view is mounted).</s></td>
        <td>auto</td>
    </tr>
    <tr></tr>
    <tr>
        <td><b><s>self</s></b></td>
        <td><s>Points to the current rendered element itself.</s></td>
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

Provide ___view___ data (non-item specific data and helper methods used by the template):
```js
var view = {
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
view.render(items, view);
```

Render asynchronously by providing a callback function:
```js
view.render(items, view, function(){
    console.log("finished.");
});
```

To render asynchronously by using promises you need to create the view instance with the ___async___ option flag:
```js
view = Mikado.new(template, { async: true });

view.render(items, view).then(function(){
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

<a name="manipulate" id="manipulate"></a>
## Manipulate Views

You can decide to just one of these:
1. manipulate the DOM directly or
2. use the builtin-methods for those purposes

Using the builtin-methods have the best performance.

> Do not mix manual changes to the DOM with builtin-methods, because manually changes will made the virtual DOM cache out of sync.

Add one item to the end:
```js
view.add(items);
```

Add one item before an index:
```js
view.add(items, 0); // add to beginning
```

Append multiple items to the end:
```js
view.append(items);
```

Append multiple items before an index:
```js
view.append(items, 0); // append to beginning
```

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

Remove all:
```js
view.clear();
```

Replace an item/node:
```js
view.replace(old_node, new_node);
```

Update an single item/node:
```js
view.update(node, item);
```

Move an item/node to a specific index:
```js
view.move(node, 15);
```

Shift an item/node by a specific offset:
```js
view.shift(node, 3);
view.shift(node, -3);
```

Move an item/node to the top or bottom:
```js
view.first(node);
view.last(node);
```

Move an item/node by 1 index:
```js
view.up(node);
view.down(node);
```

Move an item/node before or after another item/node:
```js
view.before(node_a, node_b);
view.after(node_a, node_b);
```

Swap two items/nodes:
```js
view.swap(node_a, node_b);
```

Shuffle items/nodes:
```js
view.shuffle();
```

Get a node from the virtual DOM:
```js
var node = view.node(index);
```

Get an item from the store:
```js
var item = view.item(index);
```

Get the current index from a node:
```js
var index = view.index(node);
```

Re-Sync Virtual DOM:
```js
view.sync();
```

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

#### Loose Option

When ___loose___ is enabled Mikado will use a data-to-dom binding strategy rather than keeping data separated from rendered elements/templates. This performs generally faster and has lower memory footprint but you will also loose any item data at the moment when the corresponding dom element was also removed from the screen (render stack). In most situation this shouldn't be an issue, but it depends on your application. When enabled you cannot use <a>paginated render</a>.

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

> Changes to the DOM may automatically change your data to keep the state in sync.

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

Chain methods:
```js
view.mount(document.body).init("template").render(items);
```

#### Static Templates

When a template has no dynamic expressions (within curly brackets) which needs to be evaluated during runtime Mikado will handle those templates as _static_ and skips the dynamic render part. Static views could be rendered without passing item data.

When a template just needs to be rendered once you can create, mount, render. destroy and fully cleanup as follows:
```js
Mikado.new(template)
      .mount(root)
      .render()
      .destroy()
      .unload(template);
```

Or use an option flag as a shorthand:
```js
Mikado.new(root, template, { once: true }).render();
```

When destroying a template, template definitions will still remain in the global cache. Maybe for later use or when another instances uses the same template (which is generally not recommended).

When unloading templates explicitly the template will also removes completely. The next time the same template is going to be re-used it has to be re-loaded and re-parsed again. In larger applications it might be useful to destroy also dynamic views when it was closed by the user to free memory.

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

This is also good:
```js
var view_a = new Mikado(tpl_a);
var view_b = new Mikado(tpl_b);
var view_c = new Mikado(tpl_c);

view_a.mount(root_c).render(items);
view_b.mount(root_b).render(items);
view_c.mount(root_a).render(items);
```

Ideally every template should have initialized by one (and only one) Mikado instance and should be re-mounted when using in another context. Re-mounting is very fast but re-assigning templates is not as fast.

<a name="includes" id="includes"></a>
## Includes

_WIP_

<a name="conditional" id="conditional"></a>
## Conditional Branches

_WIP_

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
    </tr>
    <tr>
        <td>DEBUG</td>
        <td>true, false</td>
    </tr>
    <tr></tr>
    <tr>
        <td>BUILD_LIGHT</td>
        <td>true, false</td>
    </tr>
    <tr></tr>
    <tr>
        <td>ENABLE_CACHE</td>
        <td>true, false</td>
    </tr>
    <tr>
        <td><br><b>Compiler Flags</b></td>
        <td></td>
    </tr>
    <tr>
        <td>USE_POLYFILL</td>
        <td>true, false</td>
    </tr>
    <tr></tr>
    <tr>
        <td>LANGUAGE_OUT<br><br><br><br><br><br><br><br></td>
        <td>ECMASCRIPT3<br>ECMASCRIPT5<br>ECMASCRIPT5_STRICT<br>ECMASCRIPT6<br>ECMASCRIPT6_STRICT<br>ECMASCRIPT_2015<br>ECMASCRIPT_2017<br>STABLE</td>
    </tr>
</table>

---

Copyright 2019 Nextapps GmbH<br>
Released under the <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache 2.0 License</a><br>

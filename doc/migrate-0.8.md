## Mikado 0.8.x Migration Guide

Install and Update by: `npm install nextapps-de/mikado#0.8-preview`<br>

<a href="https://github.com/nextapps-de/mikado/blob/0.8-preview/CHANGELOG.md">Changelog</a> &ensp;•&ensp;
<a href="https://mikado.js.org/">Run Benchmark</a>

These features aren't actually included:
- Runtime Compiler
- Benchmark Suite
- Test Automation

### Create Instances

When creating Mikado instances you don't need to pass in the root anymore. It's done by `.mount(root)` but you can still
define the root on instantiation by passing `root` or `mount` within the options:

```js
const view = new Mikado(template, {
    mount: htmlElement
});
```

### Template Syntax

When using for-loops in templates use the tag `foreach` instead of "for".

```html
<table foreach="data.rows">
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
```

The built-in symbol "view" within template syntax was renamed to `state`

```html
<table foreach="state.data">
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
```

### Mikado Compiler

```cmd
npx mikado-compile --src path/to/the/folder/ --dest path/to/the/folder/ --type module
```

Supported Flag:

- `--type module` export as javascript modules (recommended)
- `--type es5` export as ES5-compatible package
- `--inline` or `--compact` switch the build strategy to optimize either the performance or size
- `--force` force overwriting existing files
- `--watch` start the watcher for automatically compile when files has changes
- `--pretty` do not minify the compiled result

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

#### Auto Naming

There is a new naming system which will apply by default. The name of your html files will be used as unique identifiers of your templates. 
Because several folders can include same filenames, the template name inherits from the full path you pass in as `--src`.

Assuming the following file structure:
```
/tpl/view/start.html
/tpl/view/user.html
/tpl/view/cart.html
/tpl/partial/start.html
/tpl/partial/user.html
/tpl/partial/cart.html
```

The command should define the path `/tpl/` as the source root because it is the most inner folder which covers all files:
```cmd
npx mikado-compile /tpl/
```

The template names then becomes `view/start`, `view/user`, `view/cart` and `partial/start`, `partial/user`, `partial/cart` for the partials. So when including just use this name in your expression `<table include="partial/user">`

The wrong way is to compile the folder /view/ and /partial/ separately, because their template names will be same.
```cmd
npx mikado-compile /tpl/view/
npx mikado-compile /tpl/partial/
```
This might also work, but it is better not to do.

### Prebuilt Cache Strategy

The option `{ cache: true }` when creating a Mikado instance could be better declared withing templates on their root element, let the compiler produce more optimized code for this strategy.

```html
<table cache="true">
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
```

### Event Delegation

When multiple listeners of the same type are nested, the event will bubble up to the HTML root element.

```html
<table cache="true">
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

Both listeners will execute when clicking on "td". To control this behavior use the 3rd option when defining routes.

```js
Mikado.route("route-td", function(){ /*...*/ }, { stop: true });
```

Supported Options (mixable):

- `stop` stop bubbling the event up to the root element
- `prevent` prevent default event behavior
- `cancel` just stop bubbling the Mikado event, but the native event bubbling will still continue
- `once` just catch the event once and remove the route then

### Mikado Options

- the "reuse" options was renamed to `recycle`
- the recycle and cache strategies are disabled by default
- there is no store anymore, except the `Mikado.Array` (Observer) you need to assign by the option `observe`

```js
const store = Mikado.Array();
const view = Mikado(template, {
    mount: htmlElement,
    cache: true,
    recycle: true,
    pool: 100,
    // only when using reactive:
    observe: store
});
```

There is a global flag `Mikado.eventCache = true` to enable internal cache of complex event delegations. 

### Register Includes

You need to register named includes before mounting/rendering.

template.html
```html
<table foreach="data.rows" include="partial">
</table>
```

partial.html
```html
<tr>
    <td></td>
    <td></td>
    <td></td>
</tr>
```

```js
import partial from "./tpl/partial.js";
import template from "./tpl/template.js";

Mikado.register(partial, options);
const view = Mikado(template, options);
// from this point the partial needs to be registered:
view.mount(root).render(data);
```

### Nested Includes

> Internally there are 3 types of includes declared by the template directives "foreach", "include" and "if" (mixable). Since includes are pure Mikado instances, they need to follow the same rule "every template should have exactly one outer root element".

This is a common use of embedding javascript syntax into the scope:

```html
<table>
    {{@ const value = ""; }}
    <tr>
        <td>{{ value }}</td>
    </tr>
</table>
```

But consider the following situation:

```html
<table foreach="data.rows">     <!-- outer root 1st template -->
    {{@ const value = "..."; }} <!-- part of the 2nd template -->
    <tr foreach="data.columns"> <!-- outer root 2nd template -->
        <td>                    <!-- outer root 3rd template -->
            {{ value }}         <!-- part of the 3rd template -->
        </td>    
    </tr>
</table>
```

Technically a "foreach" is an include (like "if" also). The "value" was declared within the scope of the 2nd template. Since each template has its own scope, the 3rd template didn't know "value".

To solve the situation from above, just use the state:

```html
<table foreach="data.rows">
    {{@ state.value = "..."; }}
    <tr foreach="data.columns">
        <td>
            {{ state.value }}
        </td>    
    </tr>
</table>
```

> The `state` will pass through all instances.

### State

Every Mikado instance has by default a state object you can access by `view.state`.

```js
const view = Mikado(template, options);
console.log(view.state); // {}
```

When creating an instance you can optionally pass a state via options (e.g. to share the same state object through multiple views):

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

## Server-Side-Rendering

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

> Those templates aren't supported by the client render engine.

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

// set path to your dynamic content (optional)
app.set("partials", [
    __dirname + "/partial"
    // ...
]);

// register engine to filetype .html
app.engine("html", mikado);
// enable engine for filetype .html
app.set("view engine", "html");
// enable compression (optional)
app.set("view compression", true);
// enable cache and set pool size (optional)
app.set("view cache", 200);

// alternatively specify global options
mikado.options = {
    "compression": true,
    "cache": 200
};
```

Register a route and render the file `./view/start.html`:

```js
app.get("/", function(req, res){

    res.render("view/start", [{ /* data */ }]);
});
```

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
            {{@ const datestr = data.date && new Date(data.date).toISOString(); }}
            <tr key="data.id" data-id="{{ data.id }}" root>
                <td>{{ index + 1 }}</td>
                <td>{{= data.title }}</td>
                <td>{{# data.media }}</td>
                <td>{{? data.category }}</td>
                <td>{{! data.comment }}</td>
                <td>{{ datestr }}</td>
                <td style="opacity: {{ state.selected === data.id '1' ? '0.5' }}">
                    <select change="select-active:root">
                        <option value="on" selected="data.mode === 'on'">Enabled</option>
                        <option value="off" selected="data.mode === 'off'">Disabled</option>
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
    mode: "on"
  },{
      id: 2,
      date: "2023-12-02T15:00:00",
      title: "A simple title 2",
      media: "<video src='mov2.mp4'>",
      category: null,
      comment: "Some <script>untrusted</script> content",
      mode: "off"
  },{
      id: 3,
      date: "2023-12-03T16:00:00",
      title: "A simple title 3",
      media: "<img src='img3.jpg'>",
      category: null,
      comment: "Some <script>untrusted</script> content",
      mode: "on"
  }]
});
```

Each template part explained:

- `cache="true"` let the compiler prebuilt the cache strategy, you can't switch it to off when creating an instance
- `id="{{ data.view }}"` simple expression for inserting dynamic content
- `if="!data.entries.length"` the if-directive checks the condition and will render everything nested as a new template (inline definition or extern by using "include"), the nested template needs to have one outer element as the root
- `foreach="data.entries"` the foreach-directive loops the rendering of array items by everything nested as a new template (inline definition or extern by using "include"), the nested template needs to have one outer element as the root
- `{{@ ... }}` an expression to include pure javascript syntax (access limited by the scope of the template)
- `key="data.id"` extract the key value from the data, a given key is limiting the recycling of already rendered components by a keyed strategy
- `data-id="{{ data.id }}" root` exports "data.id" as an attribute, also define "root" as the event target for the listener "select-active", pretty useful when multiple routes on different elements needs the same data attributes
- `{{ index + 1 }}` uses the builtin keyword "index" which refers to the current index of looped data
- `{{= data.title }}` uses reactive approach by binding the html node to the data field, so when changing the data `data.title ="another title"` the node contents will also change accordingly
- `{{# data.media }}` allows to include html syntax (this is unsafe, don't pass user inputs, you will need to prevent XSS by yourself)
- `{{? data.category }}` only prints a "truthy" value including 0 (skips undefined, null, NaN, false)
- `{{! data.comment }}` escape the value before print out (SSR only)
- `{{ datestr }}` access the variable which was created by inline syntax before
- `style="opacity: {{ state.selected === data.id '1' ? '0.5' }}"` example of dynamic attribute value
- `change="select-active:root"` assign the route named "select-active" and forward the event to the element which has the attribute "root" assigned to it (so the target inside the root functions becomes the forwarded element)
- `selected="data.active === 'yes'"` when dynamic attribute values results to boolean "false" (not string) it will be removed from the element, because some attributes enables just by their existence (consider an option element having selected="false" will end up also as a truthy selection state)

---

Copyright 2019-2023 Nextapps GmbH<br>
Released under the <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache 2.0 License</a><br>

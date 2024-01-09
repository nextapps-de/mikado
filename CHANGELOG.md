## 0.8.2

- Web Components (Shadow DOM)
- Runtime Compiler
- Mikado-Compile detect and replace repeated inline includes (not supported by the runtime compiler)
- New callbacks `mount`, `unmount`

## 0.8.1

- A whole re-build of the library
- Support partial hydration / progressive hydration focusing on maximum performance
- Mikado provides you server-side rendering on an extreme performance level
- Mikado also comes with the fastest Express Middleware Render Engine of today
- Templates are cross-compatible, uses same template markup for Server-side-rendering as for client-side-rendering
- The server-side-implementation follows the same strategy of sharing instances and includes
- Moves the creation of executable template functions to the compiler (CSP friendly)
- The core has a new architecture which improves the predecessor in any aspect
- Templates including multiple text nodes as dynamic expressions are now supported
- The cache strategy was completely redesigned, it now shares caches across multiple template expressions
- The "DOM Cache Helpers" are now fully integrated into the internal cache system, which transforms template caches into a more powerful strategy when used
- The cache injects progressively when used and don't apply in preparation by default
- The compiler provide 5 build strategies to choose from, to optimize either performance, flexibility or size
- A special compiler flag "cache" could be placed into the template markup to prebuild the strategy by the compiler
- The concept of shared pools was fully re-design. The goal is still the same but instead of sharing direct access on pools it shares instances of Mikado. This greatly improves integration, not only because instances can have their own configuration (options).
- The include system was re-build from the ground up and also support real conditional template structures through the template syntax `<div if="data.length">` (they are not just "hidden" anymore)
- It is now possible to combine all 3 kinds of include variants on a single element `<div if="data.length" foreach="data" include="tpl/partial">`
- A new mounting system was implemented which is more robust and also support the new concept of shared Mikado instances
- The event delegation was greatly improved, it now supports bubbling same events on parents up to the HTML root element, for this workload there is a new optimization available by `Mikado.eventCache = true`.
- Support for SVG markup withing templates
- A new template expression `{{? ... }}` to skip printing "nullable" values (except 0)
- The expression `{{#= ... }}` is now supported
- A new template expression `{{! ... }}` for escaping contents (SSR only)
- Supports SSR-only mode where the limitation of having one outer element as the template root is unlocked, also there is an `extraction` directive to place logical placeholder elements, which will be self-extracted when rendered
- Improved state system
- Improved bundler and export type system
- The registration of templates has improved, it starts instantiation right before related task and isn't cleanup automatically when calling `.destroy()` on a parent view
- The store was removed, except when using `Mikado.Array()` you still need to pass in the store as the option `observe:`
- The benchmark was moved to its own branch named `bench`

## 0.7.5
`change` the option __pool__ has changed, set it to _true_ to use both pools: Recycle Pool + Keyed Pool, or set it to _false_ to fully disable pooling, or set it to either one of both: ___"queue"___ or ___"key"___ to enable just one of them respectively<br>
`change` the option __keep__ was removed, because it was replaced by option `pool: "key"` which will switch into the "explicit keyed mode"<br>
`fix` observable properties<br>
`fix` purge cache<br>
`add` new build flag: _SUPPORT_KEYED_<br>

## 0.7.4
`improve` inherit cache from factory<br>
`improve` add fast path within reconciliation<br>
`improve` indices requires no sync anymore<br>
`change` remove dom indices, method access by index is now recommended (access by node is still supported but has extra costs, prevent looping via method access by node)<br>
`new` method ___dispatch___ to call/invoke an event handler manually<br>
`fix` external/internal stores<br>

## 0.7.3
`add` make reconcile method public<br>
`change` live pool becomes a non-optional feature<br>

## 0.7.2
`new` reconcile based on "longest distance strategy"<br>
`new` __mikado-compile:__ use wildcard for compiling recursively through a directory<br>
`add` es6 modules for production (bundled via babel)<br>
`add` TypeScript definition file

## 0.7.0
`new` observable array based on ES6 proxy incl. polyfill (acts like a NodeList, semantically equal to an array-like object)<br>
`change` the method ___Mikado.new()___ was removed, just use ___Mikado()___ instead (it automatically returns an instance)<br>
`change` there are two types of external stores: 1. an extern array which gets changes now automatically applied (to keep in sync) and 2. an observable array via ___Mikado.array()___ which is in sync per default by its nature

## 0.6.6
`new` support callbacks<br>
`improve` support PointerEvents for the synthetic tap listener<br>
`improve` improve data-driven concept<br>
`new` add new "stealth" mode when proxy is used for all template statements<br>

## 0.6.2
`new` option ___keep___ to force Mikado to run in exclusive keyed-shared mode<br>
`new` option ___size___ to limit the pool size<br>

## 0.6.0
`new` cross-shared pools<br>
`new` explicit keyed paradigm<br>
`change` version numbers of compiler and compiler service are now equal with Mikados version<br>

## 0.5.0
`new` supports native HTML5 templates via runtime compiler<br>
`new` supports template definitions as string<br>

## 0.4.3
`new` method ___purge___ to cleanup shared pools<br>
`new` supports multiple ___remove___ by a given range as 2nd parameter<br>

## 0.4.2
`new` introduce an shared object pool and a new option flag ___pool___ to enable it<br>
`improve` using ___pool___ significantly improves memory allocation (cuts down by a factor of 10)<br>
`new` method ___unregister___ (accordingly to "register") which points to the same method as ___unload___ (accordingly to "load")<br>

## 0.4.1
`change` removing the redundant option ___proxy___ (it will apply automatically)<br>
`improve` re-assigning templates is now close as fast as re-mounting<br>
`improve` sharing partials has been improved<br>
`improve` destroying/re-initializing templates has been removed<br>
`improve` memory footprint when re-using partials or templates has been improved<br>
`new` added a new option to ___prefetch___ templates on page start

## 0.4.0
`change` External stores no longer automatically change.<br>
`beta` new option field ___<a href="#proxy">proxy</a>___ (reactive data store).<br>
`change` The preserved keyword ___item___ within templates was renamed to the more common identifier ___data___.<br>

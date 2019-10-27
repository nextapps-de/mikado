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

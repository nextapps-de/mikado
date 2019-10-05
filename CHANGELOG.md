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

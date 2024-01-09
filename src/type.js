import Observer from "./array.js";
import { Cache } from "./factory.js";

// When you are looking for type definitions which fully describes the usage take a look into the index.d.ts file.
// Some of the types here aren't supposed to be used as public, they might be defined just for internal state.

/**
 * @typedef {{
 *   root: (Element|undefined),
 *   mount: (Element|undefined),
 *   recycle: (boolean|undefined),
 *   pool: (boolean|number|undefined),
 *   cache: (boolean|undefined),
 *   async: (boolean|undefined),
 *   on: (MikadoCallbacks|undefined),
 *   hydrate: (boolean|undefined),
 *   shadow: (boolean|undefined),
 *   observe: (Observer|undefined),
 *   state: *
 * }}
 */
export let MikadoOptions;

/**
 * @typedef {{
 *   name: string,
 *   key: (string|undefined),
 *   cache: (boolean|undefined),
 *   tpl: TemplateDOM,
 *   cmp: (TemplateDOM|undefined),
 *   fn: (Array<Function>|null),
 *   fc: (Array<Function>|undefined)
 * }}
 */
export let Template;

/**
 * @typedef {{
 *   tag: (string|undefined),
 *   style: (string|Array<string>|undefined),
 *   class: (string|Array<string>|undefined),
 *   text: (string|Array<string>|undefined),
 *   html: (string|Array<string>|undefined),
 *   attr: (Object<string, string|Array<string>>|undefined),
 *   event: (Object<string, string|Array<string>>|undefined),
 *   child: (TemplateDOM|Array<TemplateDOM>|undefined),
 *   inc: (string|number|undefined),
 *   if: (string|undefined),
 *   key: (string|undefined),
 *   cache: (boolean|undefined),
 *   svg: (number|undefined)
 * }}
 */
export let TemplateDOM;

/**
 * @typedef {{
 *   prevent: (boolean|undefined),
 *   stop: (boolean|undefined),
 *   cancel: (boolean|undefined),
 *   once: (boolean|undefined)
 * }}
 */
export let EventOptions;


/**
 * @typedef {{
 *   _s: (string|undefined),
 *   _t: (string|undefined),
 *   _c: (string|undefined),
 *   _h: (string|undefined)
 * }}
 */
export let NodeCache;

/**
 * @typedef {{
 *   path: Array<Cache>,
 *   fn: Object<string, Array<string, number>>,
 *   get: Function,
 *   set: Function
 * }}
 */
export let ProxyHandler;


/**
 * @typedef {{
 *   create: (Function|undefined),
 *   update: (Function|undefined),
 *   replace: (Function|undefined),
 *   recycle: (Function|undefined),
 *   insert: (Function|undefined),
 *   remove: (Function|undefined),
 *   mount: (Function|undefined),
 *   unmount: (Function|undefined)
 * }}
 */
export let MikadoCallbacks;
import Observer from "./array.js";

/**
 * @typedef {{
 *   root: (Element|undefined),
 *   mount: (Element|undefined),
 *   recycle: (boolean|undefined),
 *   pool: (boolean|number|undefined),
 *   cache: (boolean|undefined),
 *   async: (boolean|undefined),
 *   on: (Object<string, Function>|undefined),
 *   hydrate: (boolean|undefined),
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
 *   fn: (Array<Function>|null)
 * }}
 */
export let Template;

/**
 * @typedef {{
 *   tag: (string|undefined),
 *   style: (string|undefined),
 *   class: (string|undefined),
 *   text: (string|undefined),
 *   html: (string|undefined),
 *   attr: (Object<string, string>|undefined),
 *   event: (Object<string, string>|undefined),
 *   child: (TemplateDOM|Array<TemplateDOM>|undefined),
 *   inc: (string|undefined),
 *   key: (string|undefined),
 *   svg: (number|undefined),
 *   _fn: (Array<Function>|null)
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

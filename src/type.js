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
 *   shadow: (ShadowRoot|boolean|undefined),
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
 *   inc: (string|undefined),
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

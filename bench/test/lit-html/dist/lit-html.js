/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
     *
     * Main lit-html module.
     *
     * Main exports:
     *
     * -  [[html]]
     * -  [[svg]]
     * -  [[render]]
     *
     * @module lit-html
     * @preferred
     */
/**
         * Do not remove this comment; it keeps typedoc from misplacing the module
         * docs.
         */
import { defaultTemplateProcessor } from "./lib/default-template-processor.js?module";
import { SVGTemplateResult, TemplateResult } from "./lib/template-result.js?module";
export { DefaultTemplateProcessor, defaultTemplateProcessor } from "./lib/default-template-processor.js?module";
export { directive, isDirective } from "./lib/directive.js?module";
// TODO(justinfagnani): remove line when we get NodePart moving methods
export { removeNodes, reparentNodes } from "./lib/dom.js?module";
export { noChange, nothing } from "./lib/part.js?module";
export { AttributeCommitter, AttributePart, BooleanAttributePart, EventPart, isIterable, isPrimitive, NodePart, PropertyCommitter, PropertyPart } from "./lib/parts.js?module";
export { parts, render } from "./lib/render.js?module";
export { templateCaches, templateFactory } from "./lib/template-factory.js?module";
export { TemplateInstance } from "./lib/template-instance.js?module";
export { SVGTemplateResult, TemplateResult } from "./lib/template-result.js?module";
export { createMarker, isTemplatePartActive, Template } from "./lib/template.js?module";
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.1.2');
/**
                                                                                * Interprets a template literal as an HTML template that can efficiently
                                                                                * render to and update a container.
                                                                                */
export const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
/**
                                                                                                                    * Interprets a template literal as an SVG template that can efficiently
                                                                                                                    * render to and update a container.
                                                                                                                    */
export const svg = (strings, ...values) => new SVGTemplateResult(strings, values, 'svg', defaultTemplateProcessor);
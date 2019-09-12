/**
 * @param {string} query
 * @param {Element=} ctx
 * @returns {Element}
 */

export function $(query, ctx){

	return (ctx || document).querySelector(query);
}

/**
 * @param {string} query
 * @param {Element=} ctx
 * @returns {NodeList|HTMLCollection}
 */

export function $$(query, ctx){

	return (ctx || document).querySelectorAll(query);
}

export function keycode(event){

	return event.which || event.keyCode;
}

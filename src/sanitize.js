// COMPILER BLOCK -->
import { RELEASE } from "./config.js";
// <-- COMPILER BLOCK

const escape_div = document.createElement("div");
const escape_text = document.createTextNode("");
const sanitizer_div = document.createElement("div");
RELEASE !== "light" && RELEASE !== "light.module" && escape_div.appendChild(escape_text);

/**
 * @param {*} str
 * @return {string}
 */

export function escape(str){

    if(escape_div._text !== str){

        escape_text.nodeValue = /** @type {string} */ (str);
        escape_div._html = escape_div.innerHTML;
        escape_div._text = str;
    }

    return escape_div._html;
}

/**
 * @param {*} str
 * @return {string}
 */

export function sanitize(str){

    if(sanitizer_div._html !== str){

        sanitizer_div.innerHTML = str;
        sanitizer_div._html = str;
        sanitizer_div._text = sanitizer_div.textContent;
    }

    return sanitizer_div._text;
}

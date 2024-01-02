const { html2json } = require("html2json");
const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

const regex_strip_expressions = /\{\{([=@!#]+)?(.*)?}}/ig;
const regex_strip_surrounding_quotes = /^['"](.*)['"]$/ig;
const regex_html_encode = /{{#(.*)?<(.*)?>(.*)?}}/ig;
const event_types = {
    "tap": 1,
    "change": 1,
    "click": 1,
    "dblclick": 1,
    "input": 1,
    "keydown": 1,
    "keypress": 1,
    "keyup": 1,
    "mousedown": 1,
    "mouseenter": 1,
    "mouseleave": 1, // TODO: mouseleave event does not bubble
    "mousemove": 1,
    "mouseout": 1,
    "mouseover": 1,
    "mouseup": 1,
    "mousewheel": 1,
    "touchstart": 1,
    "touchmove": 1,
    "touchend": 1,
    "touchcancel": 1,
    "reset": 1,
    "select": 1,
    "submit": 1,
    "toggle": 1,
    "blur": 1,
    "error": 1,
    "focus": 1,
    "load": 1,
    "resize": 1,
    "scroll": 1
};

const self_closing = {
    "area": 1,
    "base": 1,
    "br": 1,
    "col": 1,
    "embed": 1,
    "hr": 1,
    "img": 1,
    "input": 1,
    "link": 1,
    "meta": 1,
    "param": 1,
    "source": 1,
    "track": 1,
    "wbr": 1,
    "command": 1,
    "keygen": 1,
    "menuitem": 1,
    "frame": 1
};

class CompilerError extends Error {
    constructor(message) {
        super(message);
        this.name = "CompilerError";
    }
}

// List of reserved attributes:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes

module.exports = function(src, dest, options, _recall){

    if(!src){

        throw new Error("No source was specified.");
    }

    options || (options = {});

    const extension = (options.extension || (src.includes(".") && src.split(".").pop()) || "html").replace(/^\./, "");
    const pretty = options.pretty;
    const root = options.root;
    const mode = options.mode;
    const type = options.type;
    const ssr = options.ssr;
    const csr = options.csr !== false;
    const compression = options.compression;
    const schema = options.schema; // ["html", "html5"], ["xhtml", "xml"]

    if(!dest && extension !== "js"){

        const extension_regex = new RegExp("\." + extension + "$");
        dest = src.replace(extension_regex, "") + ".js";

        if(!extension_regex.test(src)){

            src += "." + extension;
        }
    }

    src = resolve(src);

    let template = readFileSync(src, "utf8");
    template = template.replace(/<!--[\s\S]*?-->/g, "");

    while(regex_html_encode.test(template)){

        template = template.replace(regex_html_encode, "{{#$1&lt;$2&gt;$3}}").trim();
    }

    let json = prepare_template(html2json(template), src, csr);

    if(!json || !json.child) {

        return;
    }

    let template_name = dest.replace(/\\/g, "/");

    if(root){

        template_name = template_name.replace(root, "");
    }

    template_name = template_name.replace(/^\//, "")
                                 .replace(/\.[a-z]+$/, "");
    let tpl_key, tpl_cache;
    let fn = [];
    let inc = [fn];

    if(json) {

        json = csr && json.child.length ? json.child[0] : json.child;
    }

    if(json){

        const index = {

            // the actual index of element p[i]
            current: -1,

            // counts every index change (next element, style, text node)
            count: 0,

            // the value of the last index counter to identify if counter has increased
            // and current index should also be increased by 1
            last: -1,

            // the actual index of inc[i]
            inc: 0,

        // SSR only:
        // --------------------------

            // indentation counter
            indent: 0,

            // contain the function code
            ssr: "",

            // option to unlock limitations by client side rendering
            csr: csr,

            // option to prettify the rendered output
            compression: compression,

            // a state to identify if inline js code was used in template
            inline_code: false
        };

        fn.index = index;

        create_schema(json, inc, fn, index, false, json.cache ? (json.cache === "false" ? "nocache" : "cache") : mode);

        for(let i = 0, idx; i < inc.length; i++){

            idx = inc[i].index;

            if(idx && idx.ssr){

                idx.ssr = "'" + idx.ssr.replace(/'\+'/g, "").replace(/\+''\+/g, "+").trim() + "'";
                idx.ssr = Function("data", "state", "index", "_val", '"use strict";' + (idx.inline_code ? "let _o=" + idx.ssr + ";return _o" : "return " + idx.ssr));
            }
        }

        // console.log({
        //     name: template_name,
        //     apply: ssr_stack[0] || null,
        //     fn: ssr_stack.length ? ssr_stack.slice(1) : null
        // })

        tpl_key = json.key;
        tpl_cache = json.cache;
        delete json.key;
        delete json.cache;

        if(ssr){

            return {
                name: template_name.replace(/^\.\//, ""),
                inc: inc
            };
        }

        if(inc.length === 1 && inc[0].length === 0){

            inc = [];
        }

        for(let i = 0; i < inc.length; i++){

            inc[i].root && (inc[i].root.inc = inc[i].inc);
        }

        json = pretty ? JSON.stringify(json, null, 2) : JSON.stringify(json);
    }

    // json = json.replace(/"name":/g, "\"n\":")
    //            .replace(/"version":/g, "\"v\":")
    //            .replace(/"static":/g, "\"d\":")
    //            .replace(/"tag":/g, "\"t\":")
    //            .replace(/"attr":/g, "\"a\":")
    //            .replace(/"class":/g, "\"c\":")
    //            .replace(/"text":/g, "\"x\":")
    //            .replace(/"html":/g, "\"h\":")
    //            .replace(/"style":/g, "\"s\":")
    //            .replace(/"css":/g, "\"p\":")
    //            .replace(/"child":/g, "\"i\":")
    //            .replace(/"js":/g, "\"j\":")
    //            .replace(/"event":/g, "\"e\":")
    //            .replace(/"include":/g, "\"+\":")
    //            .replace(/"inc":/g, "\"@\":")
    //            .replace(/"for":/g, "\"r\":") // repeat
    //            .replace(/"max":/g, "\"m\":")
    //            .replace(/"if":/g, "\"f\":")
    //            .replace(/"key":/g, "\"k\":");

    // matches inside content should not occur, because the last " is escaped and didn't match here
    json = json.replace(/"(name|tag|attr|class|text|html|style|child|js|event|include|inc|for|if|key|cache|bind|svg)":/g, '$1:');

    for(let i = 0; i < inc.length; i++){

        if(inc[i].length){
            mode !== "compact" && inc[i].unshift("let _o,_v");
            inc[i] =
`function(data,state,index,_p){
  ${ (inc[i].join(pretty ? ";\n  " : ";") + ";").replaceAll(",_v)};", ",_v)}").replaceAll("=_v};", "=_v}") }
}`;
        }
        else{

            inc[i] = "null";
        }
    }

    let js =
`export default{
name:"${ template_name }",${ tpl_key ? '\nkey:"' + tpl_key + '",' : "" }${ tpl_cache && tpl_cache !== "false" ? '\ncache:true,' : "" }
tpl:${ json },
fn:${ !inc.length ? "null" : "[" + inc.join(",") + "]" }
}`;

    if(!type || type === "es6" || type === "module"){

        dest = resolve(dest);
        writeFileSync(dest, pretty ? js : js.replace(/(\s+)?\n(\s+)?/g, "")/*.replace(/: (["{\[])/g, ':$1')*/, "utf8");
        console.log(src + " > " + dest);
    }

    if(!type || type === "es5"){

        // "use strict";

        const es5 = "Mikado.register(" + js.replace(/^export default/, "") + ");";
        dest = resolve(dest.replace(/\.js$/, ".es5.js"));
        writeFileSync(dest, pretty ? es5 : es5.replace(/(\s+)?\n(\s+)?/g, "").replace(/: (["{\[])/g, ':$1'), "utf8");
        console.log(src + " > " + dest);
    }
};

function prepare_template(nodes, src, csr, svg){

    if(nodes.child){

        if(!nodes.child.length){

            delete nodes.child;
        }
        else{

            for(let i = 0, child; i < nodes.child.length; i++){

                child = nodes.child[i];

                if(child.node === "text"){

                    delete child.node;

                    let text = child.text;

                    if(text.trim()){

                        // text nodes could have smt. like whitespace: pre
                        //text = text.replace(/\s+/g, " ");

                        if(text.includes("{{@")){

                            child.js = text.substring(text.indexOf("{{@") + 3, text.indexOf("}}", text.indexOf("{{@"))).trim();
                            delete child.text;

                            text = text.substring(0, text.indexOf("{{@")) + text.substring(text.indexOf("}}", text.indexOf("{{@")) + 2);
                        }

                        if(text.trim()){

                            if(text.includes("{{#")){

                                child.html = text.replace(/{{#/g, "{{").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                                delete child.text;
                            }
                            else{

                                child.text = text;
                            }
                        }
                        else if(!child.js){

                            nodes.child.splice(i--, 1);
                            continue;
                        }
                    }
                    else{

                        nodes.child.splice(i--, 1);
                        continue;
                    }

                    if((nodes.child.length === 1) && (!nodes.text || !child.text) && (!nodes.js || !child.js)){

                        if(child.text) nodes.text = child.text;
                        if(child.js) nodes.js = child.js;
                        if(child.html) nodes.html = child.html;
                        nodes.child = [];
                    }

                    continue;
                }
                else{

                    if(child.attr){

                        if(typeof child.attr.extract !== "undefined"){

                            child.extract = true;
                            delete child.attr.extract;

                            for(let key in child.attr){

                                if(key !== "if" && key !== "foreach" && key !== "include" && key !== "inc" && key !== "limit" && key !== "offset" && key !== "range"){

                                    delete child.attr[key];
                                }
                            }
                        }

                        if(child.tag === "svg"){

                            svg = true;
                        }
                        else{

                            // SVG does not support .className = ""; so it needs to be handled as attr

                            if(child.attr.class){

                                child.class = child.attr.class;
                                delete child.attr.class;

                                if(typeof child.class === "object"){

                                    child.class = child.class.join(" ");
                                }
                            }
                        }

                        if(svg){

                            // To treat every child as a svg element is a simple solution, but could break on specific elements
                            child.svg = 1;
                        }

                        if(child.attr.style){

                            // const styles = {};
                            // for(let a = 0; a < child.attr.style.length; a+=2){
                            //     styles[child.attr.style[a].replace(":", "")] = child.attr.style[a + 1].replace(";", "");
                            // }
                            //
                            // child.style = styles;
                            // delete child.attr.style;

                            child.style = child.attr.style;
                            delete child.attr.style;

                            if(typeof child.style === "object"){

                                child.style = child.style.join("");
                            }
                        }

                        if(child.attr.if){

                            child.if = child.attr.if;
                            delete child.attr.if;

                            if(typeof child.if === "object"){

                                child.if = child.if.join("");
                            }

                            child.if = child.if.replace(regex_strip_expressions, "$2").trim()
                        }

                        if(child.attr.include){

                            child.attr.inc = child.attr.include;
                            delete child.attr.include;
                        }

                        // looped partial includes:
                        if(child.attr.inc){

                            child.inc = child.attr.inc;

                            if(typeof child.inc === "object"){

                                child.inc = child.inc.join("");
                            }

                            child.inc = child.inc.replace(regex_strip_expressions, "$2").trim()
                                                                   .replace(regex_strip_surrounding_quotes, "$1")
                                                                   .replace(/\.html$/i, "");
                            delete child.attr.inc;
                            delete child.child;
                        }

                        // inline loops:
                        if(child.attr.foreach){

                            child.for = child.attr.foreach;
                            delete child.attr.foreach;

                            if(typeof child.for === "object"){

                                child.for = child.for.join("");
                            }

                            child.for = child.for.replace(regex_strip_expressions, "$2").trim()
                                                 .replace(regex_strip_surrounding_quotes, "$1");
                        }

                        if(child.attr.offset){

                            child.range = child.attr.offset;
                            delete child.attr.offset;
                        }

                        if(child.attr.limit){

                            child.range = (child.range || 0) + "," + child.attr.limit;
                            delete child.attr.limit;
                        }

                        if(child.attr.range){

                            child.range = child.attr.range;
                            delete child.attr.range;
                        }

                        if(child.range){

                            child.range = child.range.split(",").map(item => parseInt(item, 10) || 0);
                        }

                        let text = child.attr.js;

                        if(text){

                            if(typeof text !== "string") text = text.join(" ");

                            child.js = text.replace(/{{/g, "").replace(/}}/g, "").trim();
                            delete child.attr.js;
                        }

                        if(typeof child.attr.key !== "undefined"){

                            child["key"] = (child.attr.key || "").replace("data.", "");
                            delete child.attr.key;
                        }

                        if(typeof child.attr.cache !== "undefined"){

                            child["cache"] = child.attr.cache !== "false";
                            delete child.attr.cache;
                        }

                        // TODO
                        if(child.attr.bind){

                            if(typeof child.attr.bind !== "string") child.attr.bind = child.attr.bind.join("");

                            const parts = child.attr.bind.split(":");
                            if(parts.length < 2) parts.unshift("value");

                            child.attr[parts[0]] = "{{==" + parts[1] + "}}";
                            //child.attr.bind = parts;
                            //delete child.attr.bind;
                        }

                        const keys = Object.keys(child.attr);

                        if(keys.length === 0){

                            delete child.attr;
                        }
                        else{

                            let removes = 0;

                            for(let x = 0; x < keys.length; x++){

                                if(typeof child.attr[keys[x]] === "object"){

                                    child.attr[keys[x]] = child.attr[keys[x]].join(" ").trim();
                                }

                                // if(!event_types[keys[x]] && event_types[keys[x] = keys[x].substring(2)]){
                                //
                                //     event_types[keys[x]] = event_types[keys[x]];
                                //     delete event_types[keys[x]];
                                // }

                                if(event_types[keys[x]]){

                                    child["event"] || (child["event"] = {});
                                    child["event"][keys[x]] = child.attr[keys[x]].replace(regex_strip_expressions, "$2").trim()
                                                                                 .replace(regex_strip_surrounding_quotes, "$1");
                                    delete child.attr[keys[x]];
                                    removes++;
                                }
                            }

                            if(removes === keys.length){

                                delete child.attr;
                            }
                        }
                    }
                }

                if(!child.node){

                    nodes.child.splice(i, 1);
                    i--;
                }
                else{

                    delete child.node;

                    prepare_template(child, src, csr, svg);
                }
            }

            if(nodes.child.length === 0){

                delete nodes.child;
            }
            else if(csr && nodes.node === "root"){

                if(nodes.child.length > 1){

                    throw new CompilerError("The template '" + src + "' should have one single element as the outer root. The first element is <" + nodes.child[0].tag + "> but is followed by a sibling element <" + nodes.child[1].tag + "> which isn't allowed here.");
                }

                nodes.child = nodes.child[0];
            }
            else if(nodes.child.length === 1){

                nodes.child = nodes.child[0];
            }

            // if(typeof nodes.for === "object"){
            //
            //     nodes.for = nodes.for.join("");
            // }
        }
    }

    // if(nodes.node === "root"){
    //
    //     delete nodes.node;
    // }

    return nodes;
}

function escape_single_quotes(str){

    return str.replace(/\\([\s\S])|(')/ig, "\\$1$2");
}

function escape_single_quotes_expression(str){

    //console.log(str.replace(/{{(.*)?(\\)?([\s\S])|(')([^}]+)?/ig, "{{$1$2$3$4$5"))

    return str.replace(/{{(.*)?(\\)?([\s\S])|(')([^}]+)?/ig, "{{$1$2$3$4$5");
}

function newLine(length){

    return "\\n" + " ".repeat(length * 4);
}

function create_schema(root, inc, fn, index, attr, mode){

    if(root){

        if(root.constructor === Array){

            if(index.csr && index.count === 0 && root.filter(item => !!item.tag).length > 1){

                throw new CompilerError("Each template, also embedded templates by using 'foreach' or 'if' directives, does not have more than one single element as the outer root. Instead " + root.length + " elements (" + root.map(item => item.tag).join(", ") + ") was provided.");
            }

            for(let i = 0; i < root.length; i++){

                create_schema(root[i], inc, fn, index, false, mode);

                if(root[i].constructor === Object){

                    index.count++;
                }
            }
        }
        else if(root.constructor === Object){

            if(root.tag && !root.extract){

                index.ssr += (index.compression || (!index.indent && index.count === 0) ? "" : newLine(index.indent)) + "<" + root.tag;
                index.indent++;
            }

            for(let key in root){

                // child needs to be added recursively at last attribute

                if(key !== "child" && key !== "range" && root.hasOwnProperty(key)){

                    let value = root[key];

                    if(key === "js" && !attr){

                        if(value && (value = value.replace(/;(\s)+?$/, "").trim())){

                            fn.push(value);
                            index.ssr += "';" + value + (value.endsWith(";") ? "" : ";") + "_o+='";
                            index.inline_code = true;
                        }

                        delete root[key];
                        continue;
                    }

                    if(typeof value === "string"){

                        //const sanitize = value.includes("{{!!");
                        //const escape = !sanitize && value.includes("{{!");

                        if(value.includes("{{") && value.includes("}}")){

                            let bind = value.includes("{{==") || value.includes("{{#==");
                            let proxy = value.includes("{{=") || value.includes("{{#=");
                            let truthy = /{{[!]?\?/.test(value);
                            let escape = /{{[?]?!/.test(value);
                            let tmp = escape_single_quotes_expression(value);

                            if(truthy || escape){

                                tmp = tmp.replace(/{{[!?]?[!?]?/g, "{{");
                            }

                            if(proxy){

                                proxy = tmp.replace(/{{=+(.*)?}}/ig, "$1")
                                         .trim()
                                         .replace(/^data\./, "")
                                         .replace(/^data\[['"](.*)['"]]/, "$1");
                            }

                            tmp = tmp.replace(/{{=+/g, "{{")
                                    //.replace(/{{!(!)?/g, "{{")
                                    .replace(/"(\s+)?{{(\s+)?/g, "(")
                                    .replace(/(\s+)?}}(\s+)?"/g, ")")
                                    .replace(/{{(\s+)?/g, "'+(")
                                    .replace(/(\s+)?}}/g, ")+'");

                            //console.log(("'" + tmp + "'"))

                            tmp = ("'" + tmp + "'").replace(/^""\+/g, "")
                                                   .replace(/^''\+/g, "")
                                                   .replace(/\+''$/g, "")
                                                   .replace(/\+""$/g, "")
                                                    //.replace(/^\(/g, '')
                                                    //.replace(/\)$/g, '')
                                                   .replace(/['"]\)\+''\+\(['"]/g, "") // ")+''+("
                                                   .replace(/['"](\s+)?\+(\s+)?['"]/g, "") // ' + '
                                                   .replace(/^\(([^ ]+)\)$/g, "$1") // ( value )
                                                   .trim();

                            if((tmp.startsWith("'") && tmp.endsWith("'") && !tmp.includes("'+") && !tmp.includes("+'")) ||
                               (tmp.startsWith('"') && tmp.endsWith('"') && !tmp.includes('"+') && !tmp.includes('+"'))
                            ){
                                // detect static string expression, so we can resolve this expression in place

                                root[key] = tmp.replace(/^['"]/, "").replace(/['"]$/, "");
                                index.ssr += attr ? ' ' + key + '="' + escape_single_quotes(root[key]) + '"' : (root.extract ? "" : ">") + root[key];
                                continue;
                            }
                            else{

                                if(truthy){

                                    tmp = "(" + (tmp + "||" + tmp + "===0?" + (escape ? (attr ? "this.attr(" + tmp + ")" : "this.text(" + tmp + ")") : tmp) + ":''") + ")";
                                }
                                else if(escape){

                                    tmp = attr ? "this.attr(" + tmp + ")" : "this.text(" + tmp + ")";
                                }

                                if(key === "text" && root.tag){

                                    index.ssr += (root.extract ? "" : ">") + "'+" + /*escape_single_quotes*/(tmp) + "+'";
                                    index.count++;
                                }
                                else if(key === "text"){

                                    index.ssr += "'+" + /*escape_single_quotes*/(tmp) + "+'";
                                }
                                else if(attr){

                                    index.ssr += "'+((_val=" + /*escape_single_quotes*/(tmp) + ')===false?\'\':\' ' + key + '="\'+_val+\'"\')+\'';
                                }
                                // else{
                                //
                                //     index.ssr += ' ' + key + '="\'+' + tmp + '+\'"';
                                // }

                                if(key === "style" && root.tag){

                                    index.count++;
                                }
                            }

                            if(index.count !== index.last){

                                index.current++;
                                index.last = index.count;

                                if(mode === "inline" || (mode !== "compact" && mode !== "nocache")){

                                    fn.push('_o=_p[' + index.current + ']');
                                }
                            }

                            // the most compact of all, optional Cache is supported
                            if(mode === "compact"){

                                const _o = '_p[' + index.current + ']';

                                if(attr){

                                    fn.push(_o + '._a("' + key + '",' + tmp + ')');
                                }
                                else if(key === "class"){

                                    fn.push(_o + '._c(' + tmp + ')');
                                }
                                else if(key === "style"){

                                    fn.push(_o + '._s(' + tmp + ')');
                                }
                                else if(key === "html"){

                                    fn.push(_o + '._h(' + tmp + ')');
                                }
                                else if(key === "text"){

                                    fn.push(_o + '._t(' + tmp + ')');
                                }
                            }
                            // the fastest when Cache should be optionally supported
                            else if(mode === "inline"){

                                fn.push('_v=' + tmp);

                                if(attr){

                                    fn.push('if(!_o.c||_o.c["_a' + key + '"]!==_v){' +
                                                '_o.c&&(_o.c["_a' + key + '"]=_v);' +
                                                '_o.n[_v===false?"removeAttribute":"setAttribute"]("' + key + '",_v)' +
                                            '}');
                                }
                                else if(key === "class"){

                                    fn.push('if(!_o.c||_o.c._c!==_v){' +
                                                '_o.c&&(_o.c._c=_v);' +
                                                '_o.n.className=_v' +
                                            '}');
                                }
                                else if(key === "style"){

                                    fn.push('if(!_o.c||_o.c._s!==_v){' +
                                                '_o.c&&(_o.c._s=_v);' +
                                                '_o.n.cssText=_v' +
                                            '}');
                                    }
                                else if(key === "html"){

                                    fn.push('if(!_o.c||_o.c._h!==_v){' +
                                                '_o.c&&(_o.c._h=_v);' +
                                                '_o.n.innerHTML=_v' +
                                            '}');
                                }
                                else if(key === "text"){

                                    fn.push('if(!_o.c||_o.c._t!==_v){' +
                                                '_o.c&&(_o.c._t=_v);' +
                                                '_o.n.nodeValue=_v' +
                                            '}');
                                }
                            }
                            // the fastest variant of all, Cache is fixed enabled
                            else if(mode === "cache"){

                                fn.push('_v=' + tmp);

                                if(attr){

                                    fn.push('if(_o.c["_a' + key + '"]!==_v){' +
                                        '_o.c["_a' + key + '"]=_v;' +
                                        '_o.n[_v===false?"removeAttribute":"setAttribute"]("' + key + '",_v)' +
                                        '}');
                                }
                                else if(key === "class"){

                                    fn.push('if(_o.c._c!==_v){' +
                                        '_o.c._c=_v;' +
                                        '_o.n.className=_v' +
                                        '}');
                                }
                                else if(key === "style"){

                                    fn.push('if(_o.c._s!==_v){' +
                                        '_o.c._s=_v;' +
                                        '_o.n.cssText=_v' +
                                        '}');
                                }
                                else if(key === "html"){

                                    fn.push('if(_o.c._h!==_v){' +
                                        '_o.c._h=_v;' +
                                        '_o.n.innerHTML=_v' +
                                        '}');
                                }
                                else if(key === "text"){

                                    fn.push('if(_o.c._t!==_v){' +
                                        '_o.c._t=_v;' +
                                        '_o.n.nodeValue=_v' +
                                        '}');
                                }
                            }
                            // the fastest when Cache isn't used
                            else if(mode === "nocache"){

                                fn.push('_o=_p[' + index.current + '].n');

                                if(attr){

                                    fn.push('_v=' + tmp);
                                    fn.push('_o[_v===false?"removeAttribute":"setAttribute"]("' + key + '",_v)');
                                }
                                else if(key === "class"){

                                    fn.push('_o.className=' + tmp);
                                }
                                else if(key === "style"){

                                    fn.push('_o.cssText=' + tmp);
                                }
                                else if(key === "html"){

                                    fn.push('_o.innerHTML=' + tmp);
                                }
                                else if(key === "text"){

                                    fn.push('_o.nodeValue=' + tmp);
                                }
                            }
                            // default strategy "moderate" (not the fastest, not the most compact, optional Cache supported)
                            else{

                                fn.push('_v=' + tmp);

                                if(attr){

                                    fn.push('(!_o.c||_o.c["_a' + key + '"]!==_v)&&_o._a("' + key + '",_v)');
                                }
                                else if(key === "class"){

                                    fn.push('(!_o.c||_o.c._c!==_v)&&_o._c(_v)');
                                }
                                else if(key === "style"){

                                    fn.push('(!_o.c||_o.c._s!==_v)&&_o._s(_v)');
                                }
                                else if(key === "html"){

                                    fn.push('(!_o.c||_o.c._h!==_v)&&_o._h(_v)');
                                }
                                else if(key === "text"){

                                    fn.push('(!_o.c||_o.c._t!==_v)&&_o._t(_v)');
                                }
                            }

                            //values.push();

                            if(proxy){

                                root[key] = [proxy];
                            }
                            else{

                                root[key] = [""];
                            }
                        }
                        else{

                            if(key === "key"){

                                if(!value){

                                    throw new CompilerError("No key provided for element '" + root.tag + "'");
                                }

                                // the key needs to be exported for hydration
                                index.ssr += ' key="\'+data["' + escape_single_quotes(value) + '"]+\'"';
                            }
                            else if(key === "text"){

                                index.ssr += (root.tag ? ">" : "") + escape_single_quotes(value.replace(/\\n/g, " "));
                            }
                            else if(key !== "tag" && key !== "root" && key !== "for" && key !== "if" && key !== "inc"){

                                index.ssr += ' ' + key + (value ? '="' + escape_single_quotes(value) + '"' : "");
                            }
                        }

                        // handle includes
                        // special attributes are not a part of element attributes

                        if((key === "for" || key === "if" || key === "inc") && !attr){

                            if(index.count !== index.last){

                                index.current++;
                                index.last = index.count;

                                if(mode === "inline" || mode !== "compact"){

                                    fn.push('_o=_p[' + index.current + ']');
                                }
                            }

                            const data_str = root.for ? root.for.trim() + (root.range ? '.slice(' + (root.range[0] || 0) + (root.range[1] ? ',' + ((root.range[0] || 0) + root.range[1]) : '') + ')' : '') : "data";

                            // inline includes could be merged?

                            if(root.if){

                                fn.push('this.inc[' + index.inc + '].mount(' + (mode === "inline" || mode !== "compact" ? "_o.n" : "_p[" + index.current + "].n") + ')[' + root.if.trim() + '?"render":"clear"](' + data_str + ',state)');
                                index.ssr += (root.extract ? "" : ">") + "'+(" + escape_single_quotes(root.if.trim()) + "?this.fn[" + index.inc + "]." + (root.for ? "render" : "apply") + "(" + escape_single_quotes(data_str) + ",state" + (root.for ? "" : ",index") + "):\"\")+'";
                            }
                            else if(root.for){

                                fn.push('this.inc[' + index.inc + '].mount(' + (mode === "inline" || mode !== "compact" ? "_o.n" : "_p[" + index.current + "].n") + ').render(' + data_str + ',state)');
                                index.ssr += (root.extract ? "" : ">") + "'+this.fn[" + index.inc + "].render(" + escape_single_quotes(data_str) + ",state)+'";
                            }
                            else{

                                fn.push('this.inc[' + index.inc + '].mount(' + (mode === "inline" || mode !== "compact" ? "_o.n" : "_p[" + index.current + "].n") + ').render(data,state)');
                                index.ssr += (root.extract ? "" : ">") + "'+this.fn[" + index.inc + "].apply(data,state,index)+'";
                            }

                            // for, range and if are fully contained inside render function
                            delete root.for;
                            delete root.range;
                            delete root.if;

                            index.inc++;

                            // The compiler unshift includes, because the client then can take them by faster arr.pop()
                            const _fn = [];
                            inc.unshift(_fn);

                            // when there is no child it must be a text or a html declaration on root level
                            root.child || (root.child =
                                root.text ? { text: root.text } :
                                root.html ? { html: root.html } : null);

                            // inline includes
                            if(root.child){

                                _fn.root = root;
                                _fn.inc = root.child;
                                _fn.index = {
                                    current: -1,
                                    count: 0,
                                    last: -1,
                                    inc: 0,
                                    indent: index.indent,
                                    ssr: "",
                                    inline_code: false,
                                    compression: index.compression,
                                    csr: index.csr
                                };

                                create_schema(root.child, inc, _fn, _fn.index, false, mode);
                            }
                            else{

                                _fn.inc = root.inc;
                            }

                            delete root.child;
                            delete root.text;
                            delete root.html;
                            //continue;
                        }
                    }
                    else{

                        create_schema(value, inc, fn, index, key === "attr", mode);
                    }
                }
            }

            if(root.tag && !root.text && !index.inc && !root.extract){

                index.ssr += ">";
            }

            // add child recursively at last attribute

            let child = root.child;

            if(child){

                if(child.constructor !== Array){

                    child = [child];
                }

                for(let i = 0; i < child.length; i++){

                    index.count++;

                    create_schema(child[i], inc, fn, index, false, mode);
                }
            }

            if(root.tag && !root.extract && !self_closing[root.tag]){

                index.indent--;
                index.ssr += (!index.compression && (child || index.inc) ? newLine(index.indent) : "") + "</" + root.tag + ">";
            }
        }
    }
}
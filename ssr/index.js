const compiler = require("../compiler/compile.js");
const { resolve } = require("path");

// https://mina86.com/2021/no-you-dont-need-to-escape-that/

const test_text = /[&<]/;
const match_text = /[&<]/g;
const map_text = {
    '&': '&amp;',
    '<': '&lt;'
    //'>': '&gt;'
};
const test_attr = /[&"]/;
const match_attr = /[&"]/g;
const map_attr = {
    '&': '&amp;',
    '"': '&quot;'
    //"'": '&#39;'
};
const matcher_text = match => map_text[match];
const matcher_attr = match => map_attr[match];
const includes = Object.create(null);

module.exports = class MikadoSSR{

    name;
    state;

    #cache_size = 0;
    #cache_text = new Map();
    #cache_attr = new Map();

    constructor(template, options) {

        const inc = template.inc;
        const root = inc.pop();

        if(typeof root.inc === "string"){

            return MikadoSSR.compile(root.inc, options);
        }

        const cache = options.cache;
        const index = root.index;

        this.name = template.name;
        this.state = options.state || MikadoSSR.state;
        this.fn = [];

        if(index){

            this.apply = index.ssr;

            if(index.inc){

                for(let i = 0; i < index.inc; i++){

                    this.fn[i] = new MikadoSSR({ name: this.name + i, inc }, options);
                }
            }
        }
        else{

            this.apply = null;
        }

        this.#cache_size = typeof cache === "number" ? cache : cache ? 200 : 0;
    }

    static compile(src, options){

        if(!this.#regex){

            this.#regex = new RegExp("\." + ((options && options.extension) || this.options.extension) + "$");
        }

        if(this.#regex.test(src)){

            src = src.replace(this.#regex, "");
        }

        src = resolve(src);

        if((options && !options.debug) || !this.options.debug){

            const cache = includes[src];
            if(cache) return cache;
        }

        options = options ? Object.assign({}, this.options, options)
                          : this.options;

        return includes[src] = new this(
            compiler(src, null, options),
            options
        );
    }

    static #regex = null;
    static state = {};
    static options = {
        extension: "html",
        schema: "html5",
        compression: process.env.NODE_ENV === "production",
        debug: process.env.NODE_ENV !== "production",
        cache: 0,
        ssr: true,
        csr: true
    };

    render(data, state){

        if(!Array.isArray(data)){

            return this.apply(data, state || this.state);
        }

        let str = "";

        for(let i = 0; i < data.length; i++){

            str += this.apply(data[i], state || this.state, i);

            // if(res && typeof res !== "undefined"){
            //     // stream data to the client
            //     res.write(str);
            //     str = "";
            // }
        }

        return str;
    }

    text(string) {

        if(typeof string === "string"){

            if(this.#cache_size){

                const cache = this.#cache_text.get(string);
                if(cache) return cache;
            }

            if(test_text.test(string)){

                const tmp = string;
                string = string.replace(match_text, matcher_text);

                if(this.#cache_size){

                    this.#cache_text.set(tmp, string);

                    if(this.#cache_text.size > this.#cache_size){

                        this.#cache_text.delete(
                            this.#cache_text.keys().next().value
                        );
                    }
                }
            }
        }

        return string;
    }

    attr(string) {

        if(typeof string === "string"){

            if(this.#cache_size){

                const cache = this.#cache_attr.get(string);
                if(cache) return cache;
            }

            if(test_attr.test(string)){

                const tmp = string;
                string = string.replace(match_attr, matcher_attr);

                if(this.#cache_size){

                    this.#cache_attr.set(tmp, string);

                    if(this.#cache_attr.size > this.#cache_size){

                        this.#cache_attr.delete(
                            this.#cache_attr.keys().next().value
                        );
                    }
                }
            }
        }

        return string;
    }
}

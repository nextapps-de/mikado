if(USE_POLYFILL){

    Object.assign || (Object.assign = function(){

        const args = arguments;
        const size = args.length;
        const obj = args[0];

        if(size > 1){

            for(let x = 1, current, keys, length; x < size; x++){

                current = args[x];
                keys = Object.keys(current);
                length = keys.length;

                for(let i = 0, key; i < length; i++){

                    key = keys[i];
                    obj[key] = current[key];
                }
            }
        }

        return obj;
    });

    if(SUPPORT_ASYNC){

        window["requestAnimationFrame"] || (window["requestAnimationFrame"] = window.setTimeout);
        window["cancelAnimationFrame"] || (window["cancelAnimationFrame"] = window.clearTimeout);

        window["Promise"] || (window["Promise"] = function(){

            /**
             * @param {Function} fn
             * @constructor
             */

            function Promise(fn){

                this.callback = null;

                const self = this;

                fn(function(val){

                    if(self.callback){

                        self.callback(val);
                        self.callback = null;
                    }
                });
            }

            /**
             * @param {Function} callback
             */

            Promise.prototype.then = function(callback){

                this.callback = callback;
            };

            return Promise;
        }());
    }
}

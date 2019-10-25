import Mikado from "./mikado.js";

if(SUPPORT_HELPERS){

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("move") !== -1)){

        // absolute position
        Mikado.prototype.move = function(node, position){

            let index;

            if(typeof node === "number"){

                index = node;
                node = this.dom[index];
            }
            else{

                index = node["_idx"];
            }

            if(position < 0){

                position = this.length + position - 1;
            }

            if(index !== position){

                this.shift(node, position - index);
            }

            return this;
        };
    }

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS !== "swap")){

        // relative position
        Mikado.prototype.shift = function(a, offset, view){

            if(!offset){

                return this;
            }

            let index;

            if(typeof a === "number"){

                index = a;
                a = this.dom[a];
            }
            else{

                index = a["_idx"];
            }

            const up = offset < 0;

            if((up && index) || (!up && (index < this.length - 1))){

                const pos = up ?

                    Math.max(index + offset, 0)
                :
                    Math.min(index + offset, this.length - 1);

                const b = this.dom[pos];
                const multi_update = (up && (index - pos > 1)) || (!up && (pos - index > 1));

                if(SUPPORT_STORAGE && !multi_update && this.reuse && (this.store || this.loose)){

                    const tmp = this.store ? this.store[index] : a["_data"];
                    this.update(a, this.store ? this.store[pos] : b["_data"], view, pos);
                    this.update(b, tmp, view, index);
                }
                else{

                    this.root.insertBefore(a, up ? b : (this.dom[pos + 1] || null));
                }

                if(multi_update){

                    const tmp = this.dom[index];
                    const tmp_store = SUPPORT_STORAGE && this.store && this.store[index];
                    let current;

                    if(up){

                        for(let i = index; i > pos; i--){

                            current = this.dom[i] = this.dom[i - 1];
                            current["_idx"] = i;

                            if(SUPPORT_STORAGE && this.store){

                                this.store[i] = this.store[i - 1];
                            }
                        }
                    }
                    else{

                        for(let i = index; i < pos; i++){

                            current = this.dom[i] = this.dom[i + 1];
                            current["_idx"] = i;

                            if(SUPPORT_STORAGE && this.store){

                                this.store[i] = this.store[i + 1];
                            }
                        }
                    }

                    current = this.dom[pos] = tmp;
                    current["_idx"] = pos;

                    if(SUPPORT_STORAGE && this.store){

                        this.store[pos] = tmp_store;
                    }
                }
                else{

                    update(this.dom, SUPPORT_STORAGE && this.store, a, b, pos, index);
                }
            }

            return this;
        };
    }

    function update(dom, store, a, b, index_b, index_a){

        a["_idx"] = index_b;
        b["_idx"] = index_a;

        dom[index_a] = b;
        dom[index_b] = a;

        if(SUPPORT_STORAGE && store){

            const tmp = store[index_b];

            store[index_b] = store[index_a];
            store[index_a] = tmp;
        }
    }

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("up") !== -1)){

        Mikado.prototype.up = function(a, offset){

            if(!offset || (offset > 0)){

                this.shift(a, -(offset || 1));
            }

            return this;
        };
    }

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("down") !== -1)){

        Mikado.prototype.down = function(a, offset){

            if(!offset || (offset > 0)){

                this.shift(a, offset || 1);
            }

            return this;
        };
    }

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("first") !== -1)){

        Mikado.prototype.first = function(a){

            return this.shift(a, -this.length);
        };
    }

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("last") !== -1)){

        Mikado.prototype.last = function(a){

            return this.shift(a, this.length);
        };
    }

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("before") !== -1)){

        Mikado.prototype.before = function(tmp_a, tmp_b){

            if(typeof tmp_a !== "number"){

                tmp_a = tmp_a["_idx"];
            }

            if(typeof tmp_b !== "number"){

                tmp_b = tmp_b["_idx"];
            }

            if(tmp_b !== tmp_a + 1){

                if(tmp_b < 0){

                    tmp_b = this.length + tmp_b;

                    if(tmp_a < 0){

                        tmp_b--;
                    }
                }

                if(tmp_a < 0){

                    tmp_a = this.length + tmp_a - 1;
                }

                this.shift(tmp_a, tmp_b - tmp_a - 1);
            }

            return this;
        };
    }

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("after") !== -1)){

        Mikado.prototype.after = function(tmp_a, tmp_b){

            if(typeof tmp_a !== "number"){

                tmp_a = tmp_a["_idx"];
            }

            if(typeof tmp_b !== "number"){

                tmp_b = tmp_b["_idx"];
            }

            if(tmp_b !== tmp_a - 1){

                if(tmp_b < 0){

                    tmp_b = this.length + tmp_b - 2;

                    if(tmp_a < 0){

                        tmp_b++;
                    }
                }

                if(tmp_a < 0){

                    tmp_a = this.length + tmp_a - 1;
                }

                this.shift(tmp_a, tmp_b - tmp_a + 1);
            }

            return this;
        };
    }

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("swap") !== -1)){

        /**
         * @param a
         * @param b
         * @param {Object=} view
         * @returns {Mikado}
         */

        Mikado.prototype.swap = function(a, b, view){

            //profiler_start("swap");

            if(a !== b){

                let tmp_a;
                let tmp_b;

                if(typeof a === "number"){

                    tmp_a = a;
                    a = this.dom[a];
                }
                else{

                    tmp_a = a["_idx"];
                }

                if(typeof b === "number"){

                    tmp_b = b;
                    b = this.dom[b];
                }
                else{

                    tmp_b = b["_idx"];
                }

                //if(tmp_a !== tmp_b){

                    if(SUPPORT_STORAGE && this.reuse && (this.store || this.loose)){

                        const tmp = this.store ? this.store[tmp_a] : a["_data"];
                        this.update(a, this.store ? this.store[tmp_b] : b["_data"], view, tmp_a);
                        this.update(b, tmp, view, tmp_b);
                    }
                    else{

                        //this.arrange(a, b, null, view, tmp_a, tmp_b);

                        const no_predecessor = (tmp_a + 1) !== tmp_b;

                        this.root.insertBefore(no_predecessor ? a : b, no_predecessor ? b : a);
                        if(no_predecessor && ((tmp_b + 1) !== tmp_a)) this.root.insertBefore(b, this.dom[tmp_a + 1] || null);

                        //this.root.insertBefore(a, b);
                        //this.root.insertBefore(b, (tmp_a + 1) === tmp_b ? a : this.dom[tmp_a + 1]);
                        //this.root.insertBefore(b, this.dom[tmp_a + 1] || null);

                        a["_idx"] = tmp_b;
                        b["_idx"] = tmp_a;

                        this.dom[tmp_a] = b;
                        this.dom[tmp_b] = a;

                        if(SUPPORT_STORAGE && this.store && !this.extern){

                            const tmp = this.store[tmp_b];
                            this.store[tmp_b] = this.store[tmp_a];
                            this.store[tmp_a] = tmp;
                        }
                    }
                //}
            }

            //profiler_end("swap");

            return this;
        };
    }
}
import Mikado from "./mikado.js";

if(SUPPORT_HELPERS){

    // absolute position
    Mikado.prototype.move = function(a, position){

        let index;

        if(typeof a === "number"){

            index = a;
            a = this.dom[a];
        }
        else{

            index = a["_idx"];
        }

        if(position < 0){

            position = this.length + position - 1;
        }

        if(index !== position){

            this.shift(a, position - index);
        }

        return this;
    };

    // relative position
    Mikado.prototype.shift = function(a, offset){

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

            if(up){

                this.root.insertBefore(a, b);
            }
            else{

                if(pos === this.length - 1){

                    this.root.appendChild(a);
                }
                else{

                    this.root.insertBefore(a, this.dom[pos + 1]);
                }
            }

            if((up && (index - pos > 1)) || (!up && (pos - index > 1))){

                const tmp = this.dom[index];
                const tmp_store = SUPPORT_STORAGE && this.store && this.store[index];
                let current;

                if(up) {

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

    Mikado.prototype.up = function(a, offset){

        if(!offset || (offset > 0)){

            this.shift(a, -(offset || 1));
        }

        return this;
    };

    Mikado.prototype.down = function(a, offset){

        if(!offset || (offset > 0)){

            this.shift(a, offset || 1);
        }

        return this;
    };

    Mikado.prototype.first = function(a){

        return this.shift(a, -this.length);
    };

    Mikado.prototype.last = function(a){

        return this.shift(a, this.length);
    };

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

            if(tmp_a !== tmp_b){

                if(this.reuse){

                    const tmp = a["_item"];
                    this.update(a, b["_item"], view, tmp_b);
                    this.update(b, tmp, view, tmp_a);
                }
                else{

                    this.root.insertBefore(a, b);
                    this.root.insertBefore(b, (tmp_a + 1) === tmp_b ? a : this.dom[tmp_a + 1]);

                    // 2. Strategy Swap
                    /*
                    b.replaceWith(a);
                    this.root.insertBefore(b, (tmp_a + 1) === tmp_b ? a : this.dom[tmp_a + 1]);
                    */

                    // 3. Strategy Swap
                    /*
                    if((tmp_b + 1) === tmp_a) this.root.insertBefore(a, b);
                    else{
                        this.root.insertBefore(b, a);
                        if((tmp_b + 1) < this.length) this.root.insertBefore(a, this.dom[tmp_b + 1]);
                        else this.root.appendChild(a);
                    }
                    */

                    a["_idx"] = tmp_b;
                    b["_idx"] = tmp_a;

                    this.dom[tmp_a] = b;
                    this.dom[tmp_b] = a;
                }

                if(SUPPORT_STORAGE && this.store){

                    const tmp = this.store[tmp_b];
                    this.store[tmp_b] = this.store[tmp_a];
                    this.store[tmp_a] = tmp;
                }
            }
        }

        //profiler_end("swap");

        return this;
    };

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
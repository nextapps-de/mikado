import Mikado from "./mikado.js";

if(SUPPORT_HELPERS){

    Mikado.prototype.move = function(a, position){

        let index;

        if(typeof a === "number"){

            index = a;
            a = this.dom[a];
        }
        else{

            index = a["_idx"];
        }

        if(index !== position){

            if(position < 0){

                position = this.length - position;
            }

            if(index < position){

                this.down(a, position - index);
            }
            else if(index > position){

                this.up(a, index - position);
            }
        }

        return this;
    };

    Mikado.prototype.up = function(a, offset){

        let index;

        if(typeof a === "number"){

            index = a;
            a = this.dom[a];
        }
        else{

            index = a["_idx"];
        }

        if(index){

            const b = this.dom[Math.max(index - (offset || 1), 0)];

            this.root.insertBefore(a, b);

            update(this.dom, SUPPORT_STORAGE && this.store, a, b, index - (offset || 1), index);

            // a["_idx"] = index - 1;
            // b["_idx"] = index;
            //
            // this.dom[index] = b;
            // this.dom[index - 1] = a;
            //
            // if(SUPPORT_STORAGE && this.store){
            //
            //     const tmp = this.store[index - 1];
            //
            //     this.store[index - 1] = this.store[index];
            //     this.store[index] = tmp;
            // }
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

    Mikado.prototype.down = function(a, offset){

        let index;

        if(typeof a === "number"){

            index = a;
            a = this.dom[a];
        }
        else{

            index = a["_idx"];
        }

        if(index < this.length - 1){

            const b = this.dom[Math.min(index + (offset || 1), this.length - 1)];

            if(index === this.length - 2){

                this.root.appendChild(a);
            }
            else{

                this.root.insertBefore(a, b);
            }

            update(this.dom, SUPPORT_STORAGE && this.store, a, b, index + (offset || 1), index);

            // a["_idx"] = index + 1;
            // b["_idx"] = index;
            //
            // this.dom[index] = b;
            // this.dom[index + 1] = a;
            //
            // if(SUPPORT_STORAGE && this.store){
            //
            //     const tmp = this.store[index + 1];
            //
            //     this.store[index + 1] = this.store[index];
            //     this.store[index] = tmp;
            // }
        }

        return this;
    };

    Mikado.prototype.first = function(a){

        return this.up(a, this.length);

        // const index = a["_idx"];
        //
        // if(index){
        //
        //     this.root.insertBefore(a, this.dom[0]);
        //     const tmp = this.dom.splice(index, 1)[0];
        //     this.dom.unshift(tmp);
        //
        //     for(let i = 0; i <= index; i++){
        //
        //         this.dom[i]["_idx"] = i;
        //     }
        //
        //     if(SUPPORT_STORAGE && this.store){
        //
        //         const tmp = this.store.splice(index, 1)[0];
        //         this.store.unshift(tmp);
        //     }
        // }
        //
        // return this;
    };

    Mikado.prototype.last = function(a){

        return this.down(a, this.length);

        // const index = a["_idx"];
        //
        // if(index < this.length - 1){
        //
        //     this.root.appendChild(a);
        //     const tmp = this.dom.splice(index, 1)[0];
        //     this.dom.push(tmp);
        //
        //     for(let i = index; i < this.length; i++){
        //
        //         this.dom[i]["_idx"] = i;
        //     }
        //
        //     if(SUPPORT_STORAGE && this.store){
        //
        //         const tmp = this.store.splice(index, 1)[0];
        //         this.store.push(tmp);
        //     }
        // }
        //
        // return this;
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

            if(a !== b){

                if(this.reuse){

                    const tmp = a["_item"];
                    this.update(a, b["_item"], view, tmp_b);
                    this.update(b, tmp, view, tmp_a);
                }
                else{

                    this.root.insertBefore(a, b);
                    this.root.insertBefore(b, (tmp_a + 1) === tmp_b ? a : this.dom[tmp_a + 1]);

                    /*
                    b.replaceWith(a);
                    this.root.insertBefore(b, (tmp_a + 1) === tmp_b ? a : this.dom[tmp_a + 1]);
                    */

                    a["_idx"] = tmp_b;
                    b["_idx"] = tmp_a;

                    this.dom[tmp_a] = b;
                    this.dom[tmp_b] = a;
                }
            }

            // 3. Strategy Swap
            /*
            if((tmp_b + 1) === tmp_a) this.root.insertBefore(a, b);
            else{
                this.root.insertBefore(b, a);
                if((tmp_b + 1) < this.length) this.root.insertBefore(a, this.dom[tmp_b + 1]);
                else this.root.appendChild(a);
            }
            */

            if(SUPPORT_STORAGE && this.store){

                const tmp = this.store[tmp_b];

                this.store[tmp_b] = this.store[tmp_a];
                this.store[tmp_a] = tmp;
            }
        }

        //profiler_end("swap");

        return this;
    };

    Mikado.prototype.before = function(a, b){

        const index_a = a["_idx"];
        const index_b = b["_idx"];

        if(index_a !== index_b - 1){

            this.root.insertBefore(a, b);
            update(this.dom, SUPPORT_STORAGE && this.store, a, b, b["_idx"], index_a);
        }
    };

    Mikado.prototype.after = function(a, b){

        const index_a = a["_idx"];
        const index_b = b["_idx"];

        if(index_a !== index_b + 1){

            if(index_b === this.length - 1){

                this.root.appendChild(a);
            }
            else{

                this.root.insertBefore(a, this.dom[index_b + 1]);
            }

            update(this.dom, SUPPORT_STORAGE && this.store, a, b, index_b, index_a);
        }
    };
}
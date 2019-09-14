import Mikado from "./mikado.js";

if(SUPPORT_HELPERS){

    Mikado.prototype.up = function(a){

        const index = a["_idx"];

        if(index){

            const a = this.dom[index];
            const b = this.dom[index - 1];

            this.root.insertBefore(a, b);

            a["_idx"] = index - 1;
            b["_idx"] = index;

            this.dom[index] = b;
            this.dom[index - 1] = a;

            if(SUPPORT_STORAGE && this.store){

                const tmp = this.store[index - 1];

                this.store[index - 1] = this.store[index];
                this.store[index] = tmp;
            }
        }
    };

    Mikado.prototype.down = function(a){

        const index = a["_idx"];

        if(index < this.length - 1){

            const a = this.dom[index];
            const b = this.dom[index + 1];

            if(index === this.length - 2){

                this.root.appendChild(a);
            }
            else{

                this.root.insertBefore(a, b);
            }

            a["_idx"] = index + 1;
            b["_idx"] = index;

            this.dom[index] = b;
            this.dom[index + 1] = a;

            if(SUPPORT_STORAGE && this.store){

                const tmp = this.store[index + 1];

                this.store[index + 1] = this.store[index];
                this.store[index] = tmp;
            }
        }
    };

    Mikado.prototype.first = function(a){

        const index = a["_idx"];

        if(index){

            this.root.insertBefore(a, this.dom[0]);
            const tmp = this.dom.splice(index, 1)[0];
            this.dom.unshift(tmp);

            for(let i = 0; i <= index; i++){

                this.dom[i]["_idx"] = i;
            }

            if(SUPPORT_STORAGE && this.store){

                const tmp = this.store.splice(index, 1)[0];
                this.store.unshift(tmp);
            }
        }
    };

    Mikado.prototype.last = function(a){

        const index = a["_idx"];

        if(index < this.length - 1){

            this.root.appendChild(a);
            const tmp = this.dom.splice(index, 1)[0];
            this.dom.push(tmp);

            for(let i = index; i < this.length; i++){

                this.dom[i]["_idx"] = i;
            }

            if(SUPPORT_STORAGE && this.store){

                const tmp = this.store.splice(index, 1)[0];
                this.store.push(tmp);
            }
        }
    };

    Mikado.prototype.swap = function(a, b){

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

            if(this.reuse){

                const tmp = a["_item"];
                this.update(a, b["_item"], null, tmp_b);
                this.update(b, tmp, null, tmp_a);
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

    Mikado.prototype.shuffle = function(){

        const dom = this.dom;

        for(let i = dom.length - 1; i > 0; i--) {

            let j = (Math.random() * (i + 1)) | 0;
            let x = dom[i];
            dom[i] = dom[j];
            dom[j] = x;
        }

        return this;
    };
}
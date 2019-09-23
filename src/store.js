import Mikado from "./mikado.js";
const { localStorage } = window;

if(SUPPORT_STORAGE){

    Mikado.prototype.export = function(){

        let data;

        if(this.store){

            data = this.store;
        }
        else if(this.loose){

            data = new Array(this.length);

            for(let i = 0; i < this.length; i++){

                data[i] = this.dom[i]["_data"];
            }
        }

        if(data){

            localStorage.setItem(this.template/*this.id*/, JSON.stringify(data));
        }

        return this;
    };

    Mikado.prototype.import = function(){

        let data = localStorage.getItem(this.template/*this.id*/);

        if(data){

            data = JSON.parse(data);

            if(this.extern){

                this.store.push.apply(this.store, data);
            }
            else{

                this.store = data;
            }

            // if(this.store){
            //
            //     this.store = data;
            // }
            // else if(this.loose){
            //
            //     for(let i = 0; i < this.length; i++){
            //
            //         this.dom[i]["_data"] = data[i];
            //     }
            // }
        }

        return this;
    };

    Mikado.prototype.delete = function(id){

        localStorage.removeItem(id || this.template/*this.id*/);

        return this;
    }
}
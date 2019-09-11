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

                data[i] = this.dom[i]["_item"];
            }
        }

        if(data){

            localStorage.setItem(this.id, JSON.stringify(data));
        }
    };

    Mikado.prototype.import = function(){

        let data = localStorage.getItem(this.id);

        if(data){

            data = JSON.parse(data);

            this.store = data;

            // if(this.store){
            //
            //     this.store = data;
            // }
            // else if(this.loose){
            //
            //     for(let i = 0; i < this.length; i++){
            //
            //         this.dom[i]["_item"] = data[i];
            //     }
            // }
        }
    };

    Mikado.prototype.delete = function(id){

        localStorage.removeItem(id || this.id);
    }
}
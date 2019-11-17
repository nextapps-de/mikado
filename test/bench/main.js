(function(){

    "use strict";

    const iframe = document.getElementById("iframe");

    const keep = true;
    const duration = 0.1;

    const hash = window.location.hash;
    const strict = hash.indexOf("strict") !== -1;
    const proxy = hash.indexOf("internal") !== -1;
    const keyed = hash.indexOf("keyed") !== -1;
    const lib = ["mikado-ref", "mikado-new"];

    let index = -1;
    let repeat = 2;

    setTimeout(runner, 200);

    const test = [

        "size", "memory",
        "create", "replace", "update",
        "arrange", "repaint", "append",
        "remove", "toggle", "clear"
    ];

    const current = new Array(lib.length);

    let size = {

        "mikado-new": 3.0,
        "mikado-ref": 3.0
    };

    for(let x = 0; x < lib.length; x++){

        current[x] = {

            "name": lib[x],
            "size": size[lib[x]],
            "memory": 0,
            "score": "",
            "index": ""
        };

        for(let y = 2; y < test.length + 1; y++){

            current[x][test[y]] = "";
        }
    }

    function runner(){

        index++;
        iframe.src = lib[index].toLowerCase() + "/" + (keyed ? "keyed.html" : strict ? "strict.html" : proxy ? "proxy.html" : "non-keyed.html") + ("?duration=" + duration);
    }

    function get_score(){

        let max = new Array(test.length);
        let val = new Array(test.length);

        for(let y = 0; y < test.length; y++){

            max[y] = 0;
            val[y] = [];

            for(let x = 0; x < lib.length; x++){

                if(current[x][test[y]] && (current[x][test[y]] !== "-failed-")){

                    if(current[x][test[y]]){

                        val[y].push(current[x][test[y]]);
                    }

                    if((test[y] === "size") || (test[y] === "memory")){

                        if((current[x][test[y]] < max[y]) || !max[y]){

                            max[y] = current[x][test[y]];
                        }
                    }
                    else{

                        if(current[x][test[y]] > max[y]){

                            max[y] = current[x][test[y]];
                        }
                    }
                }
            }
        }

        let score = new Array(lib.length);
        let index = new Array(lib.length);
        let length = new Array(lib.length);
        let max_score = 0, max_index = 0;

        for(let x = 0; x < lib.length; x++){

            score[x] = 0;
            index[x] = 0;
            length[x] = 0;

            for(let y = 0; y < test.length; y++){

                if(current[x][test[y]] && (current[x][test[y]] !== "-failed-")){

                    length[x]++;

                    if((test[y] === "size") || (test[y] === "memory")){

                        score[x] += Math.sqrt(median(val[y]) / current[x][test[y]]);
                        index[x] += Math.sqrt(max[y] / current[x][test[y]]);
                    }
                    else{

                        score[x] += current[x][test[y]] / median(val[y]);
                        index[x] += current[x][test[y]] / max[y];
                    }
                }
            }

            current[x]["score"] = (score[x] / length[x] * 1000 + 0.5) | 0;
            current[x]["index"] = (index[x] / length[x] * 1000 + 0.5) | 0;
            if(max_score < current[x]["score"]) max_score = current[x]["score"];
            if(max_index < current[x]["index"]) max_index = current[x]["index"];
        }
    }


    window.onmessage = function(event){

        if(index < lib.length){

            if(event.origin === location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")){ // "https://nextapps-de.github.io" "https://raw.githack.com"

                console.log(event.data);

                const parts = event.data.split(",");

                let tmp = parseInt(parts[1], 10);

                if(keep){

                    if(!current[index][parts[0]] || (tmp > current[index][parts[0]])){

                        current[index][parts[0]] = tmp;
                    }
                }
                else{

                    if(current[index][parts[0]]){

                        current[index][parts[0]] += tmp;
                    }
                    else{

                        current[index][parts[0]] = tmp;
                    }
                }

                tmp = parseInt(parts[2], 10);

                if(current[index]["memory"]){

                    current[index]["memory"] += tmp;
                }
                else{

                    current[index]["memory"] = tmp;
                }

                if((repeat === 1) && (!current[index][parts[0]])){

                    current[index][parts[0]] = "-failed-";
                }

                if(parts[0] === "clear"){

                    if(index < lib.length - 1){

                        setTimeout(runner, 50);
                    }
                    else{

                        get_score();

                        current.sort(function(a, b){

                            return b["score"] - a["score"];
                        });

                        for(let i = 0; i < lib.length; i++){

                            lib[i] = current[i]["name"];
                        }

                        if(--repeat > 0){

                            index = -1;
                            setTimeout(runner, 50);
                        }
                        else{

                            console.log("result," + (current[0]["score"] - current[1]["score"]));
                        }
                    }
                }
            }
        }
    };

    function median(arr){

        arr.sort(function(a, b){

            return a - b;
        });

        const length = arr.length;
        const half = length / 2;

        return (

            length % 2 ?

                arr[half | 0]
            :
                (arr[half - 1] + arr[half]) / 2
        );
    }

}());
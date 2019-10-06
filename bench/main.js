(function(){

    "use strict";

    const iframe = document.getElementById("iframe");
    const result = document.getElementById("result");
    const mikado = Mikado.new(result, "row", { cache: false, store: false, pool: false });
    const keyed = window.location.search.substring(1) === "keyed";
    const strict = window.location.search.substring(1) === "strict";
    const modes = window.location.search.substring(1) === "modes";

    if(keyed || strict || modes){

        document.getElementsByTagName("h1")[0].firstChild.nodeValue = "Benchmark of Web Templating Engines (" + (keyed ? "Keyed" : strict ? "Non-Reusing" : "Modes") + ")"
    }

    if(modes){

        document.body.className = "modes";
    }

    const lib = shuffle(modes ? [

        "mikado-cross-shared", "mikado-exclusive",
        "mikado-keyed", "mikado-non-keyed"
    ]:[
        //"1", "2", "3", "4", "5", "6",
        "mikado", "domc", "inferno",
        "redom", "sinuous", "surplus",
        "innerHTML", "jquery", "mithril",
        "knockout", "lit-html", "ractive"
    ]);

    Mikado.once(document.getElementById("lib"), "lib", lib, {"mode": keyed ? "keyed.html" : strict ? "strict.html" : ""});

    const test = [

        "size", "memory", "create",
        "replace", "update", "repaint",
        "append", "remove", "toggle",
        "clear"
    ];

    let current = new Array(lib.length);
    let index = -1;

    let size = {

        "mikado": 2.5,
        "domc": 4.46,
        "inferno": 8.4,
        "redom": 2.88,
        "sinuous": 7.48,
        "surplus": 15.79,
        "innerHTML": 0,
        "jquery": 31.26,
        "mithril": 9.64,
        "knockout": 24.8,
        "lit-html": 17.31,
        "ractive": 68.2,

        "mikado-cross-shared": 2.5,
        "mikado-exclusive": 2.5,
        "mikado-keyed": 2.5,
        "mikado-non-keyed": 2.5
        //"1": 2.3, "2": 2.3, "3": 2.3, "4": 2.3, "5": 2.3, "6": 2.3
    };

    let memory = {

        "mikado": 16487,
        "domc": 115023,
        "inferno": 150165,
        "redom": 287875,
        "sinuous": 232137,
        "surplus": 175334,
        "innerHTML": 415128,
        "jquery": 519162,
        "lit-html": 352913,
        "mithril": 250668,
        "ractive": 1318599,
        "knockout": 5037020
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
            current[x]["color_" + test[y]] = "transparent";
        }
    }

    mikado.render(current);

    function runner(){

        index++;
        current[index][test[2]] = "run...";
        mikado.update(mikado.node(index), current[index]);
        iframe.src = "test/" + lib[index].toLowerCase() + "/" + (keyed ? "keyed.html" : (strict ? "strict.html" : ""));
    }

    function get_score(){

        let max = new Array(test.length);
        let val = new Array(test.length);

        for(let y = 0; y < test.length; y++){

            max[y] = 0;
            val[y] = [];

            for(let x = 0; x < lib.length; x++){

                if(current[x][test[y]]){

                    val[y].push(current[x][test[y]]);
                }
                else if(test[y] === "memory"){

                    val[y].push(memory[lib[x]]);
                }

                if((test[y] === "size") || (test[y] === "memory")){

                    if((test[y] === "memory") && !current[x][test[y]]){

                        current[x][test[y]] = memory[lib[x]];
                    }

                    if(current[x][test[y]] && ((current[x][test[y]] < max[y]) || !max[y])){

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

        let score = new Array(lib.length);
        let index = new Array(lib.length);
        let max_score = 0, max_index = 0;

        for(let x = 0; x < lib.length; x++){

            score[x] = 0;
            index[x] = 0;

            for(let y = 0; y < test.length; y++){

                if((test[y] === "size") || (test[y] === "memory")){

                    if(current[x][test[y]]){

                        //if(test[y] === "size"){

                            score[x] += Math.sqrt(average(val[y]) / current[x][test[y]]);
                            index[x] += Math.sqrt(max[y] / current[x][test[y]]);
                            current[x]["color_" + test[y]] = color(Math.sqrt(max[y]), Math.sqrt(current[x][test[y]]));
                        // }
                        // else{
                        //
                        //     score[x] += average(val[y]) / current[x][test[y]];
                        //     index[x] += max[y] / current[x][test[y]];
                        //     current[x]["color_" + test[y]] = color(max[y], current[x][test[y]]);
                        // }
                    }
                }
                else{

                    score[x] += current[x][test[y]] / average(val[y]);
                    index[x] += current[x][test[y]] / max[y];
                    current[x]["color_" + test[y]] = color(current[x][test[y]], max[y]);
                }
            }

            current[x]["score"] = (score[x] / (test.length - (lib[x] === "innerHTML" ? 1 : 0)) * 1000 + 0.5) | 0;
            current[x]["index"] = (index[x] / (test.length - (lib[x] === "innerHTML" ? 1 : 0)) * 1000 + 0.5) | 0;
            if(max_score < current[x]["score"]) max_score = current[x]["score"];
            if(max_index < current[x]["index"]) max_index = current[x]["index"];
        }

        for(let x = 0; x < lib.length; x++){

            current[x]["color_score"] = color(current[x]["score"], max_score);
            current[x]["color_index"] = color(current[x]["index"], max_index);
        }
    }

    function color(current, max){

        const percent = current / max * 100;
        const r = percent < 50 ? 255 : (255 - (percent * 2 - 100) * 255 / 100) | 0;
        const g = percent > 50 ? 255 : ((percent * 2) * 255 / 100) | 0;

        return 'rgb(' + r + ', ' + g + ', 0)';
    }

    window.onmessage = function(event){

        if(event.origin === location.protocol + "//" + location.hostname) { // "https://nextapps-de.github.io" "https://raw.githack.com"

            const parts = event.data.split(",");

            current[index][parts[0]] = parseInt(parts[1], 10);
            current[index]["memory"] += parseInt(parts[2], 10);
            mikado.update(mikado.node(index), current[index]);

            if(parts[0] === "clear"){

                if(index < lib.length - 1){

                    setTimeout(runner, 200);
                }
                else{

                    get_score();

                    current.sort(function(a, b){

                        return b["score"] - a["score"];
                    });

                    mikado.render(current);
                }
            }
            else{

                current[index][test[test.indexOf(parts[0]) + 1]] = "run...";
                mikado.update(mikado.node(index), current[index]);
            }
        }
    };

    function shuffle(items){

        for(let i = items.length - 1, j, x; i > 0; i--) {

            j = (Math.random() * i) | 0;
            x = items[i];
            items[i] = items[j];
            items[j] = x;
        }

        return items;
    }

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

    function average(arr){

        const length = arr.length;
        let sum = 0;

        for(let i = 0; i < length; i++){

            sum += arr[i];
        }

        return sum / length;
    }

    setTimeout(runner, 200);
}());
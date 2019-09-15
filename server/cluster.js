const cluster = require("cluster");
const os = require("os");
const config = require("../package.json");

if(cluster.isMaster){

    const cpus = !config.worker || (config.worker === "auto") ? os.cpus().length : config.worker;

    for(let i = 0; i < cpus; i++){

        cluster.fork();
    }

    cluster.on("exit", function(worker, code, signal){

        if((code !== 0) && !worker.exitedAfterDisconnect){

            console.warn("Worker " + worker.id + " crashed. Starting a new worker...");

            cluster.fork();
        }
    });

    process.on("SIGUSR2", function(){

        restartWorker();
    });

    console.info("\x1b[32m\x1b[1m",

        "\n" +
        "           oo dP                      dP\n" +
        "              88                      88\n" +
        "88d8b.d8b. dP 88  .dP  .d8888b. .d888b88 .d8888b.\n" +
        "88'`88'`88 88 88888\"   88'  `88 88'  `88 88'  `88\n" +
        "88  88  88 88 88  `8b. 88.  .88 88.  .88 88.  .88\n" +
        "dP  dP  dP dP dP   `YP `88888P8 `88888P8 `88888P'" + "  Version: " + require("../package.json").version + "\n" +
        "-----------------------------------------------------------------", "\x1b[0m"
    );
}
else{

    require("./server");
}

function restartWorker(workerIndex){

    workerIndex || (workerIndex = 0);

    const workers = Object.values(cluster.workers);
    const worker = workers[workerIndex];

    if(!worker){

        return;
    }

    worker.on("exit", function(){

        if(!worker.exitedAfterDisconnect) {

            return;
        }

        console.info("Exited process: " + worker.process.pid);

        cluster.fork().on("listening", function(){

            restartWorker(workerIndex + 1);
        });
    });

    worker.disconnect();
}

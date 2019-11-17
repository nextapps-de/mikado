const puppeteer = require('puppeteer');
const ws = require('web-servo');

ws.config({
    "server": {
        "port": 8080,
        "dir": "./bench/",
        "exitOnError": false
    }
});

(async function(){

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on("console", function(msg){

        msg = msg.text();

        if(msg.indexOf("result,") === 0){

            const diff = parseInt(msg.split(",")[1]);

            browser.close();
            ws.stop();

            if(diff > 20){

                try{

                    throw new Error("The latest build does not fit the performance criteria. Maximum allowed difference is 20, the current difference is " + diff + ".");
                }
                catch(e){

                    console.log(e);
                }
            }
            else{

                console.log("");
                console.log("Test passed. (diff: " + diff + ")");
            }
        }
        else{

            console.log(msg);
        }
    });

    await page.goto("http://localhost:8080/");
})();

ws.silent().start();
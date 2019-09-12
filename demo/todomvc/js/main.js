"use strict";

import "./route.js";
import "./event.js";
import controller from "./controller.js";
import { init } from "./controller.js";

init();

(window.onpopstate = function(){

    controller(window.location.hash);
})();

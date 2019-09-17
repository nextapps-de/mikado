"use strict";

import "./route.js";
import "./event.js";
import controller from "./controller.js";

(window.onpopstate = function(){

    controller(window.location.hash);
})();

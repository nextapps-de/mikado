// import routes to apply listener
import "./route.js";
import controller from "./controller.js";

// assign app controller to the location listener + run once
(window.onpopstate = function(){
    controller(location.hash);
})();

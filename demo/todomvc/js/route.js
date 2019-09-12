import { list } from "./app.js";
import controller from "./controller.js";

list.route("route-all", function(target){

	controller("#/all", target);

}).route("route-active", function(target){

	controller("#/active", target);

}).route("route-completed", function(target){

	controller("#/completed", target);

}).listen("click");

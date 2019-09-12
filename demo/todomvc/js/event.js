import { store, list } from "./app.js";
import { update } from "./controller.js";
import { $, $$, keycode } from "./helper.js";

/**
 * @enum
 */

const KEYS = {

	ENTER: 13,
	ESC: 27
};

list.route("clear-completed", function(){

	for(let i = 0; i < store.length; i++){

		if(store[i]["completed"]){

			list.remove(list.node(i--));
		}
	}

	update();
	list.export();

}).route("toggle-all", function(target){

	const state = target.checked;
	const toggles = $$(".toggle");

	for(let i = 0; i < store.length; i++){

		store[i]["completed"] = state;
		toggles[i].checked = state;
	}

	update();
	list.render().export();

}).route("enter-edit-mode", function(target, event, self){

	const input = $("input.edit", target);

	list.setClass(target, "editing");
	input.value = self.textContent;
	input.focus();

}).route("destroy", function(target){

	list.remove(target).export();
	update();

}).route("cancel-create", function(target){

	target.value = "";

}).route("cancel-edit", function(target, event, self){

	list.setClass(self, "");

}).route("edit", function(target, event, self){

	event = keycode(event);

	if((event === KEYS.ENTER) || !event) {

		if(self.value){

			store[list.index(target)]["title"] = self.value;
		}
		else{

			list.remove(target);
		}

		list.render().export();
	}
	else if(event === KEYS.ESC) {

		list.setClass(target, "");
	}

}).route("update-state", function(target, event, self){

	const index = list.index(target);
	const status = self.getAttribute("checked") === "false";

	self.checked = status;
	store[index]["completed"] = status;
	list.update(index).export();
	update();

}).route("new-todo", function(target, event){

	event = keycode(event);

	if(event === KEYS.ENTER) {

		const value = target.value.trim();

		if(value) list.add({

			"title": value,
			"completed": false

		}).export();

		update();
		target.value = "";
	}
	else if(event === KEYS.ESC) {

		target.value = "";
	}

}).listen("click");


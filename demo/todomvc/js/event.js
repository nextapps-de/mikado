import { list } from "./app.js";
import { view, update } from "./controller.js";
import { $, $$, keycode } from "./helper.js";

/**
 * @enum
 */

const KEYS = {

    ENTER: 13,
    ESC: 27
};

list.route("clear-completed", function(){

    for(let i = 0; i < list.length; i++){

        if(list.store[i]["completed"]){

            list.remove(i--);
        }
    }

    update();
    list.export();

}).route("toggle-all", function(target){

    const state = target.checked;

    for(let i = 0; i < list.length; i++){

        list.store[i]["completed"] = state;
    }

    update();
    list.refresh(view).export();

}).route("enter-edit-mode", function(target, event, self){

    const input = $("input.edit", target);

    Mikado.setClass(target, "editing");
    input.value = Mikado.getText(self);
    input.focus();

}).route("destroy", function(target){

    list.remove(target).export();
    update();

}).route("cancel-create", function(target){

    target.value = "";

}).route("cancel-edit", function(target, event, self){

    Mikado.setClass(self, "");

}).route("edit", function(target, event, self){

    event = keycode(event);

    if((event === KEYS.ENTER) || !event) {

        if(self.value){

            list.data(target)["title"] = self.value;
        }
        else{

            list.remove(target);
        }

        list.refresh(target, view).export();
    }
    else if(event === KEYS.ESC) {

        Mikado.setClass(target, "");
    }

}).route("update-state", function(target, event, self){

    const index = list.index(target);

    list.store[index]["completed"] = !!self.checked;
    list.refresh(index, view).export();
    update();

}).route("new-todo", function(target, event){

    event = keycode(event);

    if(event === KEYS.ENTER) {

        const value = target.value.trim();

        if(value) list.add({

            "title": value,
            "completed": false

        }, view).export();

        update();
        target.value = "";
    }
    else if(event === KEYS.ESC) {

        target.value = "";
    }

}).listen("click");


import Mikado from "/node_modules/mikado/dist/mikado.bundle.module.min.js";
import { todos } from "./app.js";
import { updateApp } from "./controller.js";
import { $ } from "./helper.js";

/** @enum {Number} */
const KEYS = { ENTER: 13, ESC: 27 };

Mikado.route("new-todo", function(target, event){

    switch(event.which || event.keyCode){

        case KEYS.ENTER:

            const value = target.value.trim();

            if(value){

                todos.push({
                    "id": todos.length,
                    "title": value,
                    "completed": false
                });

                updateApp();
            }

            //fallthrough:

        case KEYS.ESC:

            target.value = "";
    }
})

.route("enter-edit-mode", function(target, event){

    const input = $("input.edit", target);
    const self = event.target;

    Mikado.setClass(target, "editing");
    input.focus();
    input.value = "";
    input.value = Mikado.getText(self);
})

.route("edit", function(target, event){

    switch(event.which || event.keyCode || KEYS.ESC){

        case KEYS.ENTER:

            const index = Mikado.getAttribute(target, "data-index");
            const self = event.target;
            const value = self.value.trim();

            // when empty or changed
            if(!value || todos[index].title !== value){

                if(value){

                    todos[index].title = value;
                }
                else{

                    todos.splice(index, 1);
                }

                updateApp();
            }

            //fallthrough:

        case KEYS.ESC:

            Mikado.setClass(target, "");
    }
})

.route("update-state", function(target, event){

    const index = Mikado.getAttribute(target, "data-index");
    todos[index].completed = event.target.checked;
    updateApp();
})

.route("clear-completed", function(){

    for(let i = 0; i < todos.length; i++){

        todos[i].completed &&
        todos.splice(i--, 1);
    }

    updateApp();
})

.route("toggle-all", function(target){

    todos.forEach(todo => todo.completed = target.checked);
    updateApp();
})

.route("delete", function(target){

    const index = Mikado.getAttribute(target, "data-index");
    todos.splice(index, 1);
    updateApp();
});
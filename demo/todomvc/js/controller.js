import { store, state, main, footer, list } from "./app.js";
import { $, $$ } from "./helper.js";

export default function(route, target){

    if(route){

        if(target){

            window.location.hash = route;
        }

        route = route.substring(2);
    }
    else{

        route = "all";
    }

    // update state:
    state.filter = route;

    // render todos:
    list.render([{}], update);
}

// private helpers:

function filter_by(filter){

    return filter === "all" ?

        store
    :
        store.filter(function(item){

            return item["completed"] === (filter === "completed");
        });
}

export function update(){

    state.left = filter_by("active").length;
    state.completed = store.length - state.left;
    state.empty = !store.length;

    main.render([{}]);
    footer.render([{}]);

    $("#toggle-all").checked = !state.left;
}

export function init(){

    const checkboxes = $$('.toggle[checked="false"]');

    for(let i = 0, length = checkboxes.length; i < length; i++){

        checkboxes[i].checked = false;
    }
}

import { state, main, footer, list } from "./app.js";
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
    list.render(list.store, view, update);
}

export const view = {

  is_visible: function(data){

      return state.filter === "all" ||
            (state.filter === "completed" && data.completed) ||
            (state.filter === "active" && !data.completed)
  }
};

// private helpers:

function filter_by(filter){

    return filter === "all" ?

        list.store
    :
        list.store.filter(function(item){

            return item["completed"] === (filter === "completed");
        });
}

export function update(){

    state.left = filter_by("active").length;
    state.completed = list.length - state.left;
    state.empty = !list.length;

    main.render({});
    footer.render({});

    $("#toggle-all").checked = !state.left;
}

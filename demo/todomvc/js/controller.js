import { main, footer, list } from "./app.js";

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

    list.state.filter = route;
    list.render(list.store, view, update);
}

export const view = {

  "is_visible": function(data){

      const filter = list.state.filter;

      return filter === "all" ||
            (filter === "completed" && data.completed) ||
            (filter === "active" && !data.completed)
  }
};

export function update(){

    list.state.left = filter_by("active").length;
    list.state.completed = list.length - list.state.left;
    list.state.empty = !list.length;

    main.render();
    footer.render();
}

function filter_by(filter){

    return filter === "all" ?

        list.store
    :
        list.store.filter(function(item){

            return item["completed"] === (filter === "completed");
        });
}
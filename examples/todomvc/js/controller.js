import { app, todos } from "./app.js";

// an application controller connecting the
// routes and the app view by also applying logic

export default function(route, target){

    if(route){

        // when target is set the location has to change
        // when no target is set it just init/refresh the current app state

        target && (window.location.hash = route);
        route = route.substring(2);
    }

    app.state.filter = route || "all";
    updateApp();
}

// define helper function on "state", so you can
// use this inside template expressions

app.state.is_visible = function(data){

    // when no pagination is used for the table view,
    // hiding elements by filter state is better than filtering the data

    const filter = app.state.filter;

    return filter === "all" ||
          (filter === "completed" && data.completed) ||
          (filter === "active" && !data.completed)
};

export function updateApp(){

    app.state.left = filterBy("active").length;
    app.state.completed = todos.length - app.state.left;
    app.render({ todos });

    localStorage.setItem("todos", JSON.stringify(todos));
}

// instead of hiding elements, this could also be used to filter data
// e.g. app.render({ todos: filterBy(app.state.filter) })

function filterBy(filter){

    return filter === "all"
        ? todos
        : todos.filter(item => item.completed === (filter === "completed"));
}
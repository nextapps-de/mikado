import { app, todos } from "./app.js";

// an application controller connecting the
// routes and the app view by also applying logic

export default function(route, target){

    if(route){

        if(target){

            window.location.hash = route;
        }

        route = route.substring(2);
    }

    app.state.filter = route || "all";
    updateApp();
}

app.state.is_visible = function(data){

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

function filterBy(filter){

    return filter === "all"
        ? todos
        : todos.filter(item => item.completed === (filter === "completed"));
}
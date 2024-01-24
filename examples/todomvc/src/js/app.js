import Mikado from "/node_modules/mikado/dist/mikado.bundle.module.min.js";
import tpl_app from "../template/app.js";

// optionally enable event cache when complex event delegation was used
// like forwarding the event target to as custom root
Mikado.eventCache = true;

// get saved data from local storage
export const todos = JSON.parse(localStorage.getItem("todos")) || [];

// create the app view instance, also
// mount the app view to a render destination target
export const app = new Mikado(tpl_app, {
    mount: document.body,
    recycle: true,
    cache: true
});

// the initial render is triggered by the controller withing "main.js"
// accordingly to the requested url location

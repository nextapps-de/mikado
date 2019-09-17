"use strict";

//import Mikado from "../../../src/mikado.js";
import tpl_app from "./../template/app/app.es6.js";
import tpl_main from "./../template/main/main.es6.js";
import tpl_footer from "./../template/footer/footer.es6.js";
import tpl_list from "./../template/list/list.es6.js";
import { $ } from "./helper.js";

export const store = [];
export const state = {};

Mikado.once($("#root-app"), tpl_app);

export const main = Mikado.new(tpl_main, {
    "state": state
})
.mount($("#root-main"))
.render({});

export const footer = Mikado.new(tpl_footer, {
    "state": state
})
.mount($("#root-footer"))
.render({});

export const list = Mikado.new(tpl_list, {
    "state": state,
    "store": store,
    "loose": false
})
.mount($(".todo-list"))
.import()
.render();
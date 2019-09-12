"use strict";

//import Mikado from "../node_modules/mikado/src/mikado.js";
import tpl_app from "./../template/app/app.es6.js";
import tpl_main from "./../template/main/main.es6.js";
import tpl_footer from "./../template/footer/footer.es6.js";
import tpl_list from "./../template/list/list.es6.js";
import { $ } from "./helper.js";

export const store = [];
export const state = {};
const options = {

    "store": store,
    "state": state,
    "loose": false,
    "cache": true,
    "reuse": true
};

Mikado.new(tpl_app)
      .mount($("#root-app"))
      .render()
      .destroy(true);

export const main = Mikado.new(tpl_main, options)
                          .mount($("#root-main"))
                          .render([{}]);

export const footer = Mikado.new(tpl_footer, options)
                            .mount($("#root-footer"))
                            .render([{}]);

export const list = Mikado.new(tpl_list, options)
                          .mount($(".todo-list"))
                          .import()
                          .render();
"use strict";

import tpl_app from "./../template/app/app.es6.js";
import tpl_main from "./../template/main/main.es6.js";
import tpl_footer from "./../template/footer/footer.es6.js";
import tpl_list from "./../template/list/list.es6.js";
import { $ } from "./helper.js";

Mikado.once($("#root-app"), tpl_app);

export const main = Mikado.new(tpl_main)
.mount($("#root-main"))
.render({});

export const footer = Mikado.new(tpl_footer)
.mount($("#root-footer"))
.render({});

export const list = Mikado.new(tpl_list, {
    "store": true,
    "loose": false
})
.mount($(".todo-list"))
.import();

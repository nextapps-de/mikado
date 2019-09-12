"use strict";

import Mikado from "../node_modules/mikado/src/mikado.js";
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

Mikado.new(/** @type {Template} */ (tpl_app))
	  .mount($("#root-app"))
	  .render()
	  .destroy(true);

export const main = Mikado.new(/** @type {Template} */ (tpl_main), options)
						  .mount($("#root-main"))
						  .render([state]);

export const footer = Mikado.new(/** @type {Template} */ (tpl_footer), options)
							.mount($("#root-footer"))
							.render([state]);

export const list = Mikado.new(/** @type {Template} */ (tpl_list), options)
						  .mount($(".todo-list"))
						  .import()
						  .render();

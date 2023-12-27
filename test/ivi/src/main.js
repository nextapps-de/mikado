import { _, render, Events, onClick, withNextFrame, requestDirtyCheck, elementProto, component, useSelect, selector, TrackByKey, key } from "ivi";
import { h1, div, span, table, tbody, tr, td, a, button } from "ivi-html";

window._ivi = (items) => setState({ data: items.length ? items : [] });

const template = (items) => items.map((item) => html`
    <section data-id="${item.id}" data-date="${item.date}" data-index="${item.index}">
        <div class="${item.classname}" style="padding-right: 10px;">
            <div class="title">${item.title}</div>
            <div class="content">${item.content}</div>
            <div class="footer">${item.footer}</div>
        </div>
    </section>
`);


declare class Mikado {
    constructor(template: Template, options?: MikadoOptions);
    name: string;
    root: HTMLElement|null;
    state: Object;
    store: Mikado.array|null;
    length: number;

    mount(target: HTMLElement, hydrate?: boolean): Mikado;
    render(data?: Object|Array<Object>, state?: Object, callback?: Function): Promise<void>|Mikado;

    add(data: Object, state?: Object, index?: number): Mikado;
    add(data: Object, index?: number): Mikado;
    append(data: Object|Array<Object>, state?: Object, index?: number): Mikado;
    append(data: Object|Array<Object>, index?: number): Mikado;
    update(node: HTMLElement|number, data?: Object, state?: Object, index?: number): Mikado;
    update(node: HTMLElement|number, data?: Object, index?: number): Mikado;
    replace(node: HTMLElement|number, data: Object, state?: Object, index?: number): Mikado;
    replace(node: HTMLElement|number, data: Object, index?: number): Mikado;
    remove(index?: HTMLElement|number, count?: number): Mikado;
    create(data: Object, state?: Object, index?: number): HTMLElement;

    cancel(): Mikado;
    clear(): Mikado;
    destroy(): void;

    index(node: HTMLElement): number;
    node(index: number): HTMLElement;

    route(name: string, fn: Function, options: RouteOptions): Mikado;
    listen(event: string, options?: EventListenerOptions|boolean): Mikado;
    unlisten(event: string, options?: EventListenerOptions|boolean): Mikado;
    dispatch(name: string, target?: HTMLElement, event?: Event, self?: EventTarget): Mikado;

    move(node: HTMLElement|number, index: number): Mikado;
    before(node_a: HTMLElement|number, node_b: HTMLElement|number): Mikado;
    after(node_a: HTMLElement|number, node_b: HTMLElement|number): Mikado;
    up(node: HTMLElement|number, offset?: number): Mikado;
    down(node: HTMLElement|number, offset?: number): Mikado;
    shift(node: HTMLElement|number, offset: number, state?: Object): Mikado;
    swap(node_a: HTMLElement|number, node_b: HTMLElement|number, state?: Object): Mikado;
    first(a: HTMLElement|number): Mikado;
    last(a: HTMLElement|number): Mikado;
}

declare namespace Mikado {

    const eventCache: boolean;
    const eventBubble: boolean;

    function once(root: HTMLElement, template: Template|string, data?: Object|Array<Object>, state?: Object, callback?: Function): Mikado;
    //function compile(node: HTMLTemplateElement|string): Mikado;

    function route(name: string, fn: Function, options: RouteOptions): Mikado;
    function listen(event: string, options?: EventListenerOptions|boolean): Mikado;
    function unlisten(event: string, options?: EventListenerOptions|boolean): Mikado;
    function dispatch(route: string, target?: HTMLElement, event?: Event): Mikado;
    function register(template: Template|string, options: MikadoOptions): Mikado;
    function unregister(template: string|Template): Mikado;

    class array {
        constructor(array?: Array<Object>);
        length: number;

        mount(mikado: Mikado): array;
        concat(array: Array<Object>): array;
        filter(handler: Function, self?: any): array;
        forEach(handler: Function): void;
        indexOf(search: Object): number;
        lastIndexOf(search: Object): number;
        map(handler: Function, self?: any): array;
        pop(): Object;
        push(data: Object): void;
        reverse(): array;
        set(array?: Array<Object>): array;
        shift(): Object;
        slice(index?: number): Array<Object>;
        sort(handler: Function): array;
        splice(start?: number, count?: number, insert?: Object): Array<Object>;
        swap(index_a: number, index_b: number): array;
        unshift(data: Object): void;
    }

    function getClasses(target: HTMLElement): Array<string>;
    function hasClass(target: HTMLElement, classname: string): boolean;
    function toggleClass(target: HTMLElement, classname: string, state?: boolean): Mikado;
    function toggleClasses(target: HTMLElement, classnames: Array<string>, state?: boolean): Mikado;
    function removeClass(target: HTMLElement, classname: string): Mikado;
    function removeClasses(target: HTMLElement, classnames: Array<string>): Mikado;
    function addClass(target: HTMLElement, classname: string): Mikado;
    function addClasses(target: HTMLElement, classnames: Array<string>): Mikado;
    function setClass(target: HTMLElement, classname: string): Mikado;

    function getAttribute(target: HTMLElement, attribute: string): string;
    function hasAttribute(target: HTMLElement, attribute: string): boolean;
    function removeAttribute(target: HTMLElement, attribute: string): Mikado;
    function removeAttributes(target: HTMLElement, attributes: Array<string>): Mikado;
    function setAttribute(target: HTMLElement, attribute: string, value: string): Mikado;
    function setAttributes(target: HTMLElement, attributes: {[attribute: string]: string}): Mikado;

    function setHtml(target: HTMLElement, html: string): Mikado;
    function getHtml(target: HTMLElement): string;
    function setText(target: HTMLElement, text: string): Mikado;
    function getText(target: HTMLElement): string;

    function setCss(target: HTMLElement, style: string): Mikado;
    function getCss(target: HTMLElement): string;
    function setStyle(target: HTMLElement, property: string, value: string): Mikado;
    function setStyles(target: HTMLElement, styles: {[property: string]: string}): Mikado;
    function getStyle(target: HTMLElement, property: string): string;

    function escape(text: string): string;
    function sanitize(text: string): string;
}

type Template = {
    name: string;
    tpl: TemplateDOM;
    fn: Array<Function>|null;
    key?: string;
    cache?: boolean;
}

type TemplateDOM = {
    tag?: string;
    style?: string|[string];
    class?: string|[string];
    text?: string|[string];
    html?: string|[string];
    attr?: {[attribute: string]: string|[string]};
    event?: {[event: string]: string|[string]};
    child?: TemplateDOM|Array<TemplateDOM>;
    inc?: string;
    key?: string;
    cache?: boolean;
    svg?: 1;
}

type MikadoOptions = {
    root?: HTMLElement;
    mount?: HTMLElement;
    cache?: boolean;
    recycle?: boolean;
    hydrate?: boolean;
    async?: boolean;
    pool?: boolean|number;
    state?: Object;
    observe?: Mikado.array;
    on?: {[event: string]: Function};
}

type RouteOptions = {
    prevent?: boolean;
    stop?: boolean;
    cancel?: boolean;
    once?: boolean;
}

export = Mikado;
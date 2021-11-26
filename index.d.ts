export declare class Mikado {
    constructor(root: HTMLElement, template: Template, options?: Options);
    constructor(template: Template, options?: Options);
    add(data: Object, view?: Object, index?: number): Mikado;
    add(data: Object, index?: number): Mikado;
    after(node_a: HTMLElement|number, node_b: HTMLElement|number): Mikado;
    append(data: Object, view?: Object, index?: number): Mikado;
    append(data: Object, index?: number): Mikado;
    before(node_a: HTMLElement|number, node_b: HTMLElement|number): Mikado;
    cancel(): Mikado;
    clear(purge?: boolean): Mikado;
    create(data: Object, view?: Object): HTMLElement;
    data(index: number): Object;
    delete(id: string): Mikado;
    destroy(unload?: boolean): void;
    dispatch(name: string, target?: HTMLElement, event?: Event, self?: EventTarget): Mikado;
    down(node: HTMLElement|number, offset?: number): Mikado;
    export(): Mikado;
    find(data: Object|string): HTMLElement|void;
    first(a: HTMLElement|number): Mikado;
    import(): Mikado;
    index(node: HTMLElement): number;
    init(template?: Template, options?: Options): Mikado;
    last(a: HTMLElement|number): Mikado;
    listen(event: string, options?: EventListenerOptions): Mikado;
    load(file: string, callback?: Function): Mikado;
    mount(target: HTMLElement): Mikado;
    move(node: HTMLElement|number, index: number): Mikado;
    node(index: number): HTMLElement;
    purge(): Mikado;
    reconcile(data: Object, view?: Object): Mikado;
    refresh(index?: HTMLElement|number, view?: Object): Mikado;
    remove(index?: HTMLElement|number, count?: number): Mikado;
    render(data?: Object, view?: Object, callback?: Function): Promise<void>|void;
    replace(node: HTMLElement|number, data: Object, view?: Object): Mikado;
    route(id: string, fn: Function): Mikado;
    search(data: Object): HTMLElement|void;
    shift(node: HTMLElement|number, offset: number, view?: Object): Mikado;
    swap(node_a: HTMLElement|number, node_b: HTMLElement|number, view?: Object): Mikado;
    sync(clear_cache?: boolean): Mikado;
    unlisten(event: string, options?: EventListenerOptions): Mikado;
    unload(): Mikado;
    unregister(): Mikado;
    up(node: HTMLElement|number, offset?: number): Mikado;
    update(node: HTMLElement|number, data?: Object, view?: Object): Mikado;
    where(payload: Object): Array<Object>;
}

export declare namespace Mikado {
    class array {
        constructor(array?: Array<Object>);
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
    function addClass(target: HTMLElement, classname: string): Mikado;
    function compile(node: HTMLTemplateElement|string): Mikado;
    function dispatch(name: string, target?: HTMLElement, event?: Event, self?: EventTarget): Mikado;
    function getAttribute(target: HTMLElement, attr: string): string;
    function getCSS(target: HTMLElement): string;
    function getClass(target: HTMLElement): string;
    function getHTML(target: HTMLElement): string;
    function getText(target: HTMLElement): string;
    function hasAttribute(target: HTMLElement, attr: string): boolean;
    function hasClass(target: HTMLElement, classname: string): boolean;
    function listen(event: string, options?: EventListenerOptions): Mikado;
    function load(file: string, callback?: Function): Mikado;
    function once(root: HTMLElement, template: Template|string, data?: Array<Object>, view?: Object, callback?: Function): Mikado;
    function register(name: string, tpl: Template): Mikado;
    function removeAttribute(target: HTMLElement, attr: string): Mikado;
    function removeClass(target: HTMLElement, classname: string): Mikado;
    function route(key: string, handler: Function): Mikado;
    function setAttribute(target: HTMLElement, attr: string, value: string): Mikado;
    function setCSS(target: HTMLElement, style: string): Mikado;
    function setClass(target: HTMLElement, classname: string): Mikado;
    function setHTML(target: HTMLElement, html: string): Mikado;
    function setText(target: HTMLElement, text: string): Mikado;
    function toggleClass(target: HTMLElement, classname: string): Mikado;
    function unlisten(event: string, options?: EventListenerOptions): Mikado;
    function unload(template: string|Template): Mikado;
    function unregister(template: string|Template): Mikado;
}

interface Template {
    t: string,
    i: Template|Array<Template>;
    h: string|Array<string|number>;
    x: string|Array<string|number>;
    s: string|Array<string|number>;
    p: any;
    a: {[attribute: string]: string};
    c: string|Array<string|number>;
    j: string;
    n: string;
    v: string;
    d: boolean;
}

interface Options {
    cache?: boolean;
    reuse?: boolean;
    store?: boolean|Array<Object>|Mikado.array;
    pool?: boolean;
    size?: number;
    loose?: boolean;
    keep?: boolean;
}

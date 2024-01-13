declare class MikadoSSR {

    constructor(template: Template, options?: MikadoSSROptions);
    name: TemplatePath;
    state: Object;

    apply(data?: Object, state?: Object): HTMLString;
    render(data?: Object|Array<Object>, state?: Object): HTMLString;
    text(text: string): string;
    attr(text: string): string;
}

declare namespace MikadoSSR {

    const state: Object;
    const options: MikadoSSROptions;

    function compile(src: TemplatePath, options?: MikadoSSROptions): MikadoSSR;
}

type TemplatePath = string;
type HTMLString = string;
type Template = Object;

type MikadoSSROptions = {
    extension?: string;
    schema?: string;
    compression?: boolean;
    debug?: boolean;
    cache?: boolean|number;
    ssr?: boolean;
    csr?: boolean;
}

export = MikadoSSR;

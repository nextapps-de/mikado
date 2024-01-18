export function $(query, ctx){

    return (ctx || document).querySelector(query);
}

export function $$(query, ctx){

    return (ctx || document).querySelectorAll(query);
}

export function $(query, ctx){

    return (ctx || document).querySelector(query);
}

export function $$(query, ctx){

    return (ctx || document).querySelectorAll(query);
}

export function keycode(event){

    return event.which || event.keyCode;
}

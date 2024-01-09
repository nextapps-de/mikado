
import Mikado from "./mikado.js";

/** @type {Object<string, boolean|number>} */
const events = {},
      event_options = {},
      routes = /** @type {Object<string, Function>} */Object.create(null),
      options = /** @type {Object<string, Boolean|EventOptions>} */Object.create(null),
      doc = document.documentElement || document.body.parentNode,
      has_touch = "ontouchstart" in window,
      has_pointer = !has_touch && window.PointerEvent && navigator.maxTouchPoints;
/** @type {Object<string, boolean|EventListenerOptions>} */

/** @type {Object<string, Function>} */

/** @type {Object<string, Boolean|EventOptions>} */


// The most outer element which is covered by Mikado event system is document.body

let tap_fallback;

function handler(event, type) {

    type || (type = event.type);

    const event_target = event.target,
          use_event_cache = Mikado.eventCache,
          use_bubble = Mikado.eventBubble;
    // disabled by default:

    // disabled by default:

    let cache;

    // When "eventCache" options is enabled, all the assigned event route names and all the event targets exposed by bubbling are being cached,
    // and therefore they can't be changed dynamically after its creation.
    // Instead of: <div click="{{ true ? 'route-a' : 'route-b' }}"> just apply logic inside the handler.
    // Also, this will only work when the route doesn't change for the same element: <div click="{{ data.route }}">.
    // Alternatively a route can re-defined dynamically by register a new function to by calling Mikado.route(name, fn, options) again.
    // Delete a route by Mikado.route(name, null, null)

    if (use_event_cache) {

        cache = event_target["_mke" + type];
    }

    if ("undefined" == typeof cache) {

        let target = event_target;

        // bubble up the dom tree to find element which has assigned a handler

        while (target && target !== doc) {

            let route;

            if ("click" === type && tap_fallback) {

                route = target.getAttribute("tap");
            }

            if (!route) {

                route = target.getAttribute(type);
            }

            if (route) {

                const delimiter = route.indexOf(":");
                // when continue bubble it needs the original target
                let root = target;

                // it has a custom target, bubbling needs to continue

                if (-1 < delimiter) {
                    const handler = route.substring(0, delimiter),
                          attr = route.substring(delimiter + 1);


                    route = "";

                    // continue bubble up the dom tree to find the custom defined root element

                    while ((root = root.parentElement) !== doc) {

                        if (root.hasAttribute(attr)) {

                            route = handler;
                            break;
                        }
                    }
                }

                if (route) {

                    if (!cache) {

                        cache = [];

                        if (use_event_cache) {

                            event_target["_mke" + type] = cache;
                        }
                    }

                    cache.push([route, root]);
                    const option = options[route];

                    if (!use_bubble || option && (option.stop || option.cancel)) {

                        // stop bubbling

                        break;
                    }
                }
            }

            // continue bubble up

            target = target.parentElement;
        }

        if (use_event_cache) {

            cache || (event_target["_mke" + type] = null);
        }
    }

    if (cache) for (let i = 0, tmp; i < cache.length; i++) {

        tmp = cache[i];
        const route = tmp[0],
              fn = routes[route];


        if (fn) {
            const target = tmp[1],
                  option = options[route];


            if (option) {

                option.prevent && event.preventDefault();
                option.stop && event.stopImmediatePropagation();

                if (option.once) {

                    routes[route] = null;

                    if (use_event_cache) {

                        event_target["_mke" + type] = null;
                    }
                }
            }

            //fn(target, event, event_target);
            fn(target, event);
        }
    }
}

/**
 * @param {!string} route
 * @param {!Function} fn
 * @param {EventOptions=} option
 */
export function route(route, fn, option) {

    routes[route] = fn;
    option && (options[route] = option);
    return this;
}

/**
 * @param {!string} route
 * @param {!Element} target
 * @param {Event=} event
 */
export function dispatch(route, target, event) {

    routes[route](target || this, event || window.event);
    return this;
}

/**
 * @param {!string} event
 * @param {EventListenerOptions|boolean=} options
 */
export function listen(event, options) {

    if (!events[event]) {

        register_event(1, event, handler, options);
        events[event] = 1;
        event_options[event] = options || null;
    }

    return this;
}

/**
 * @param {string} event
 * @returns {Mikado}
 */
export function unlisten(event) {

    if (events[event]) {

        register_event(0, event, handler, event_options[event]);
        events[event] = 0;
        event_options[event] = null;
    }

    return this;
}

let touch_x, touch_y, register_tap;

if (has_touch || has_pointer) {

    /**
     * @param {TouchEvent|PointerEvent} event
     */

    function handler_down(event) {

        pointer(event, event.touches);
    }

    /**
     * @param {TouchEvent|PointerEvent} event
     */

    function handler_end(event) {
        const last_x = touch_x,
              last_y = touch_y;


        pointer(event, event.changedTouches);

        if (15 > Math.abs(touch_x - last_x) && 15 > Math.abs(touch_y - last_y)) {

            handler(event, "tap");
        }
    }

    /**
     * @param {TouchEvent|PointerEvent|Touch} event
     * @param {TouchList} touches
     */

    function pointer(event, touches) {

        if (touches) {

            event = touches[0];
        }

        touch_x = event.clientX;
        touch_y = event.clientY;
    }

    /**
     * @type {EventListenerOptions}
     */

    const opt = {

        // Note: the default click behavior should not force passive handling
        passive: !1,
        // Capturing by default, since we need the event dispatched from window
        capture: !0
    };

    register_tap = function (add_or_remove) {

        register_event(add_or_remove, has_pointer ? "pointerdown" : "touchstart", handler_down, opt);
        //register_event(add_or_remove, "touchmove", handler_move, false);
        register_event(add_or_remove, has_pointer ? "pointerup" : "touchend", handler_end, opt);
    };
}

/**
 * @param add_or_remove
 * @param type
 * @param handler
 * @param {EventListenerOptions|boolean=} options
 */

function register_event(add_or_remove, type, handler, options) {

    if ("tap" === type) {

        if (has_touch || has_pointer) {

            register_tap(add_or_remove);
            return;
        } else {

            tap_fallback = !0;
            type = "click";
        }
    }

    window[(add_or_remove ? "add" : "remove") + "EventListener"](type, handler,
    // Capturing by default, since we need the event dispatched from window
    options || !1 === options ? options : !0);
}
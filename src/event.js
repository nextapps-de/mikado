import Mikado from "./mikado.js";

if(SUPPORT_EVENTS){

    const events = {};
    const listener = {};
    const body = document.body;

    const has_touch = "ontouchstart" in window;
    const has_pointer = !has_touch && window["PointerEvent"] && navigator["maxTouchPoints"];
    let tap_fallback;

    function handler(event, type){

        type || (type = event.type);

        const event_target = event.target;
        let target = event_target;
        let id = event_target["_event_" + type];

        if(!id){

            while(target !== body){

                if((type === "click") && tap_fallback){

                    id = target.getAttribute("tap");
                }

                if(!id){

                    id = target.getAttribute(type);
                }

                if(id){

                    const tmp = id.indexOf(":");

                    if(tmp !== -1){

                        const handler = id.substring(0, tmp);
                        const root = id.substring(tmp + 1);

                        id = 0;
                        target = target.parentElement;

                        while(target !== body){

                            if(target.hasAttribute(root)){

                                id = handler;
                                break;
                            }

                            target = target.parentElement;
                        }

                        if(DEBUG){

                            if(!id){

                                console.warn("Event root '" + root + "' was not found for the event: '" + handler + "'.");
                            }
                        }
                    }

                    break;
                }

                target = target.parentElement;
            }

            if(!id){

                return;
            }

            event_target["_event_" + type] = id;
            event_target["_root_" + type] = target;
        }
        else{

            target = event_target["_root_" + type];
        }

        const fn = listener[id];

        if(fn){

            event.preventDefault();
            fn(target, event, event_target);
        }
        else if(DEBUG){

            console.warn("Missing route '" + id + "' for event '" + type + "'.");
        }

        event.stopPropagation();
    }

    Mikado["route"] = Mikado.prototype.route = function(id, fn){

        listener[id] = fn;
        return this;
    };

    Mikado["dispatch"] = Mikado.prototype.dispatch = function(id, target, event, event_target){

        listener[id].call(this, target, event, event_target);
        return this;
    };

    let touch_x, touch_y;
    let register_tap;

    if(has_touch || has_pointer){

        function handler_down(event){

            pointer(event, event["touches"]);
        }

        function handler_end(event){

            let last_x = touch_x;
            let last_y = touch_y;

            pointer(event, event["changedTouches"]);

            if((Math.abs(touch_x - last_x) < 50) &&
               (Math.abs(touch_y - last_y) < 50)){

                handler.call(this, event, "tap");
            }
        }

        function pointer(event, touches){

            if(touches){

                event = touches[0];
            }

            touch_x = event["clientX"];
            touch_y = event["clientY"];
        }

        register_tap = function(add_or_remove){

            register_event(add_or_remove, has_pointer ? "pointerdown" : "touchstart", handler_down, false);
            //register_event(add_or_remove, "touchmove", handler_move, false);
            register_event(add_or_remove, has_pointer ? "pointerup" : "touchend", handler_end, false);
        };
    }

    /**
     * @param event
     * @param {Object|boolean=} options
     */

    Mikado["listen"] = Mikado.prototype.listen = function(event, options){

        if(!events[event]){

            register_event(1, event, handler, options || true);
            events[event] = 1;
        }

        return this;
    };

    /**
     * @param event
     * @param {Object|boolean=} options
     * @returns {Mikado}
     */

    Mikado["unlisten"] = Mikado.prototype.unlisten = function(event, options){

        if(events[event]){

            register_event(0, event, handler, options || true);
            events[event] = 0;
        }

        return this;
    };

    /**
     * @param add_or_remove
     * @param type
     * @param handler
     * @param {EventListenerOptions|boolean=} options
     */

    function register_event(add_or_remove, type, handler, options){

        if(type === "tap"){

            if(has_touch || has_pointer){

                register_tap(add_or_remove);
                return;
            }
            else{

                tap_fallback = true;
                type = "click";
            }
        }

        window[(add_or_remove ? "add": "remove") + "EventListener"](
            type,
            handler,
            options || {
                "passive": true,
                "capture": true
            }
        );
    }
}

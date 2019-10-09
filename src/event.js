import Mikado from "./mikado.js";

if(SUPPORT_EVENTS){

    const events = {};
    const listener = {};
    const body = document.body;

    function handler(event, type){

        type || (type = event.type);

        const event_target = event.target;
        let target = event_target;
        let id = event_target["_event_" + type];

        if(!id){

            while(target){

                if(target === body){

                    return;
                }

                id = target.getAttribute(type);

                if(id){

                    const tmp = id.indexOf(':');

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

            console.warn("Route: '" + id + "', Event: '" + type + "' is undefined.");
        }

        event.stopPropagation();
    }

    Mikado["route"] = Mikado.prototype.route = function(id, fn){

        listener[id] = fn;
        return this;
    };

    let has_touch = ("ontouchstart" in window) || navigator["msMaxTouchPoints"];
    let touch_x, touch_y;
    let register_tap;

    if(has_touch){

        function handler_down(event){

            pointer(event, event.touches);
        }

        function handler_end(event){

            let last_x = touch_x;
            let last_y = touch_y;

            pointer(event, event.changedTouches);

            if((Math.abs(touch_x - last_x) < 50) &&
               (Math.abs(touch_y - last_y) < 50)){

                handler.call(this, event, "click");
            }
        }

        function pointer(event, touches){

            if(touches){

                touches = touches[0];
            }

            touch_x = touches ? touches["clientX"] : event["pageX"];
            touch_y = touches ? touches["clientY"] : event["pageY"];
        }

        register_tap = function(add_or_remove){

            register_event(add_or_remove, "touchstart", handler_down, false);
            //register_event(add_or_remove, "touchmove", handler_move, false);
            register_event(add_or_remove, "touchend", handler_end, false);
        };
    }

    /**
     * @param event
     * @param {Object|boolean=} options
     */

    Mikado["listen"] = Mikado.prototype.listen = function(event, options){

        if(!events[event]){

            if(has_touch && (event === "click")){

                register_tap(1);
            }
            else{

                register_event(1, event, handler, options || true);
            }

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

            if(has_touch && (event === "click")){

                register_tap(0);
            }
            else{

                register_event(0, event, handler, options || true);
            }

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
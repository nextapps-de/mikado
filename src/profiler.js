/**
 * @param {!string} name
 */

export function tick(name){

    /** @type {!Object<string, number>} */
    const profiler = window["profiler"] || (window["profiler"] = {});

    profiler[name] || (profiler[name] = 0);
    profiler[name]++;
}

import{Template,TemplateDOM,MikadoOptions,EventOptions}from"./type.js";import Mikado,{once,register,unregister}from"./mikado.js";import Observer from"./array.js";import{Cache}from"./factory.js";import{escape,sanitize}from"./sanitize.js";import"./helper.js";import compile from"./compile.js";import{setHtml,getHtml,setText,getText,getAttribute,hasAttribute,removeAttribute,setAttribute,getClass,setClass,hasClass,toggleClass,removeClass,addClass,getCss,setCss,getStyle,setStyle}from"./cache.js";import{dispatch,listen,route,unlisten}from"./event.js";Mikado.once=once,Mikado.register=register,Mikado.unregister=unregister,Mikado.compile=compile,Mikado.eventCache,Mikado.eventBubble,Mikado.length,Mikado.state,Mikado.name,Mikado.prototype.update,Mikado.prototype.replace,Mikado.prototype.render,Mikado.prototype.remove,Mikado.prototype.node,Mikado.prototype.index,Mikado.prototype.mount,Mikado.prototype.destroy,Mikado.prototype.flush,Mikado.prototype.create,Mikado.prototype.clear,Mikado.prototype.cancel,Mikado.prototype.append,Mikado.prototype.add,Mikado.setText=setText,Mikado.getText=getText,Mikado.setHtml=setHtml,Mikado.getHtml=getHtml,Mikado.setClass=setClass,Mikado.getClass=getClass,Mikado.hasClass=hasClass,Mikado.toggleClass=toggleClass,Mikado.removeClass=removeClass,Mikado.addClass=addClass,Mikado.setAttribute=setAttribute,Mikado.getAttribute=getAttribute,Mikado.hasAttribute=hasAttribute,Mikado.removeAttribute=removeAttribute,Mikado.setCss=setCss,Mikado.getCss=getCss,Mikado.getStyle=getStyle,Mikado.setStyle=setStyle,Mikado.escape=escape,Mikado.sanitize=sanitize,Mikado.prototype.route=Mikado.route=route,Mikado.prototype.dispatch=Mikado.dispatch=dispatch,Mikado.prototype.listen=Mikado.listen=listen,Mikado.prototype.unlisten=Mikado.unlisten=unlisten,Mikado.prototype.route,Mikado.prototype.dispatch,Mikado.prototype.listen,Mikado.prototype.unlisten,Mikado.prototype.move,Mikado.prototype.up,Mikado.prototype.down,Mikado.prototype.first,Mikado.prototype.last,Mikado.prototype.before,Mikado.prototype.after,Mikado.prototype.swap,Mikado.prototype.shift,Cache.c,Cache.n,Cache.v,Cache.prototype._a,Cache.prototype._t,Cache.prototype._s,Cache.prototype._c,Cache.prototype._h,Mikado.Array=Observer,Observer.length,Observer.prototype.mount,Observer.prototype.concat,Observer.prototype.push,Observer.prototype.splice,Observer.prototype.pop,Observer.prototype.shift,Observer.prototype.unshift,Observer.prototype.slice,Observer.prototype.set,Observer.prototype.sort,Observer.prototype.reverse,Observer.prototype.map,Observer.prototype.filter,Observer.prototype.indexOf,Observer.prototype.lastIndexOf,Observer.prototype.includes,Observer.prototype.forEach,Observer.prototype.swap,Template.tpl,Template.cmp,Template.key,Template.cache,Template.name,Template.fn,TemplateDOM.tag,TemplateDOM.attr,TemplateDOM.style,TemplateDOM.class,TemplateDOM.child,TemplateDOM.text,TemplateDOM.html,TemplateDOM.for,TemplateDOM.foreach,TemplateDOM.if,TemplateDOM.inc,TemplateDOM.js,TemplateDOM.event,TemplateDOM.key,TemplateDOM.cache,TemplateDOM.svg,MikadoOptions.root,MikadoOptions.mount,MikadoOptions.recycle,MikadoOptions.pool,MikadoOptions.cache,MikadoOptions.async,MikadoOptions.on,MikadoOptions.hydrate,MikadoOptions.shadow,EventOptions.prevent,EventOptions.stop,EventOptions.cancel,EventOptions.once;const root=window;{let a;(a=root.define)&&a.amd?a([],function(){return Mikado}):"object"==typeof root.exports?root.exports=Mikado:root.Mikado=Mikado}
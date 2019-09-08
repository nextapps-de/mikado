/**
 * Mikado.js v0.0.7 (Light)
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';var h=window.requestAnimationFrame,u={};function y(a,b,c){a.nodeType||(c=b,b=a,a=null);b||(c=a,a=c.root,b=c.template);"string"===typeof b?b=u[b]:y.register(b);this.cache=!c||!1!==c.cache;this.u=c&&!!c.async;this.v=!c||!1!==c.reuse;a&&this.mount(a);this.m!==b&&(this.m=b,this.id=++z,this.clone=this.o=this.f=null,this.g=!0,A(this));this.state={}}y.register=function(a,b){b||(b=a,a=b.n);u[a]=b};y["new"]=function(a,b,c){return new this(a,b,c)};
y.prototype.mount=function(a){if(this.b!==a){this.b=a;A(this);var b;if(!(b=a._d)){b=a.children;for(var c=b.length,d=Array(c),f=0,e;f<c;f++)e=b[f],e._i=f,d[f]=e;b=a._d=d}this.l=b;this.length=this.l.length}return this};
var B={tap:1,change:1,click:1,dblclick:1,input:1,keydown:1,keypress:1,keyup:1,mousedown:1,mouseenter:1,mouseleave:1,mousemove:1,mouseout:1,mouseover:1,mouseup:1,mousewheel:1,touchstart:1,touchmove:1,touchend:1,touchcancel:1,reset:1,select:1,submit:1,toggle:1,blur:1,error:1,focus:1,load:1,resize:1,scroll:1},z=0;function A(a){if(a.b){var b=a.b._t;b!==a.id&&(a.b._t=a.id,b&&(a.b.textContent="",a.b._d=a.l=[],a.length=0,a.cache&&(a.b._h=null)))}}
y.prototype.create=function(a,b,c){var d=this.clone;d||(this.clone=d=C(this,this.m));this.g||this.o(d._p,a,c,b);b=d.cloneNode(!0);this.w&&(b._m=a);return b};
y.prototype.render=function(a,b,c,d){"function"===typeof a?c=a:"function"===typeof b&&(c=b,b=null);if(!d){if(c){var f=this;h(function(){f.render(a,b,null,!0);"function"===typeof c&&c()});return this}if(this.u){var e=this;return new Promise(function(r){h(function(){e.render(a,b,null,!0);r()})})}}if(a){d=a.length;for(var g,k=0,m=void 0,l=void 0;k<d;k++)l=a[k],(m=this.l[k])?this.v?this.update(m,l,b,k):this.replace(m,l,b,k):this.add(l,b,g||(g=document.createDocumentFragment()));g&&this.b.appendChild(g);
if(d<this.length)for(g=this.l.splice(d),this.length=d,d=g.length,k=0;k<d;k++)this.b.removeChild(g[k])}else this.l[0]||this.add();return this};y.prototype.add=function(a,b,c){var d=this.length;a=this.create(a,b,d);a._i=d;(c||this.b).appendChild(a);this.l[d]=a;this.length++;return this};var D;
function C(a,b,c,d,f){var e=document.createElement(b.t||"div");c||(c=0,d="&",D="",a.f=[],e._p=f=[]);var g=b.s,k=b.i,m=b.x,l=b.h,r=b.a,n=b.c,p=b.j;b=a.f.length;var t=0,q="";p&&(q+=p+";");a.cache&&(q+="this");n&&("object"===typeof n?(q+=a.cache?"._l(self,"+n[0]+")":"self.className="+n[0]+";",a.f[b]=d,f[b]=e,a.g=!1,t++):e.className=n);if(r){n=Object.keys(r);for(p=0;p<n.length;p++){var v=n[p],x=r[v];if("object"===typeof x){q+=a.cache?"._a(self,'"+v+"',"+x[0]+")":"self.setAttribute('"+v+"',"+x[0]+");";
var w=!0}else e.setAttribute(v,x);B[v]&&a.A(v)}w&&(a.f[b]=d,f[b]=e,a.g=!1,t++)}if(g)if("string"===typeof g)e.style.cssText=g;else if(g.length)q+=a.cache?"._c(self,"+g[0]+")":"self.style.cssText="+g[0]+";",a.f[b]=d,f[b]=e,t++;else{r=Object.keys(g);for(w=0;w<r.length;w++)if(n=r[w],p=g[n],"object"===typeof p){q+=a.cache?"._s(self,'"+n+"',"+p[0]+")":"self.style.setProperty('"+n+"',"+p[0]+");";var E=!0}else e.style.setProperty(n,p);E&&(a.f[b]=d,f[b]=e,a.g=!1,t++)}k||(m?(d+="|",(g="object"===typeof m)&&
(m=m[0]),l=document.createTextNode(m),g&&(q+=a.cache?"._t(self,"+m+")":"self.nodeValue="+m+";",f[b]&&b++,a.f[b]=d,f[b]=l,a.g=!1,t++),e.appendChild(l)):l&&("object"===typeof l?(l=l[0],q+=a.cache?"._h(self, "+l+")":"self.innerHTML="+l+";",a.f[b]=d,f[b]=e,a.g=!1,t++):e.innerHTML=l));t&&(D=1<t?D+("self=p["+b+"];"+q):D+("p["+b+"]"+q.substring(4)));if(k)if(k.length)for(m=">",b=0;b<k.length;b++)b&&(m+="+"),e.appendChild(C(a,k[b],c+b+1,d+m,f));else e.appendChild(C(a,k,c+1,d+">",f));c||a.g||(a.o=Function("p",
"item","index","view",D?'"use strict";var self;'+D:""));return e}y.prototype._t=function(a,b){a._x!==b&&(a.nodeValue=b,a._x=b);return this};y.prototype._h=function(a,b){a._h!==b&&(a.innerHTML=b,a._h=b);return this};y.prototype._l=function(a,b){a._c!==b&&(a.className=b,a._c=b,a._cs=null);return this};y.prototype._s=function(a,b,c){var d=a._sc||(a._sc={});d[b]!==c&&(d[b]=c,(a._s||(a._s=a.style)).setProperty(b,c),a._cs=null);return this};
y.prototype._c=function(a,b){a._cs!==b&&((a._s||(a._s=a.style)).cssText=b,a._cs=b,a._sc=null);return this};y.prototype._a=function(a,b,c){var d="_a_"+b;a[d]!==c&&(a.setAttribute(b,c),a[d]=c);return this};(function(){var a=this||window,b;(b=a.define)&&b.amd?b([],function(){return y}):(b=a.modules)?b.mikado=y:"object"===typeof a.exports?a.module.exports=y:a.Mikado=y})();}).call(this);

/**!
 * Mikado.js v0.7.6 (ES5)
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';var l;Object.assign||(Object.assign=function(){for(var a=arguments,b=a.length,c=a[0],d=1,e,f,g;d<b;d++){e=a[d];f=Object.keys(e);g=f.length;for(var h=0,k;h<g;h++)k=f[h],c[k]=e[k]}return c});Object.values||(Object.values=function(a){for(var b=Object.keys(a),c=b.length,d=Array(c),e=0;e<c;e++)d[e]=a[b[e]];return d});window.requestAnimationFrame||(window.requestAnimationFrame=window.setTimeout);window.cancelAnimationFrame||(window.cancelAnimationFrame=window.clearTimeout);
window.Promise||(window.Promise=function(){function a(b){this.g=null;var c=this;b(function(d){c.g&&(c.g(d),c.g=null)})}a.prototype.then=function(b){this.g=b};return a}());function m(a,b,c,d){if("tap"===b){if(x||C){aa(a);return}ba=!0;b="click"}window[(a?"add":"remove")+"EventListener"](b,c,d||!1)}
function D(a,b){b||(b=a.type);var c=a.target,d=c,e=c["_e_"+b];if(e)d=c["_r_"+b];else{for(;d!==ca;){"click"===b&&ba&&(e=d.getAttribute("tap"));e||(e=d.getAttribute(b));if(e){var f=e.indexOf(":");if(-1!==f){var g=e.substring(0,f);f=e.substring(f+1);e=0;for(d=d.parentElement;d!==ca;){if(d.hasAttribute(f)){e=g;break}d=d.parentElement}}break}d=d.parentElement}if(!e)return;c["_e_"+b]=e;c["_r_"+b]=d}b=E[e];e=da[e];b&&(!1!==e.cancel&&a.preventDefault(),b(d,a,c));!1!==e.stop&&a.stopPropagation()}
var F={},E={},da={},ca=document.documentElement||document.body.parentNode,x="ontouchstart"in window,C=!x&&window.PointerEvent&&navigator.maxTouchPoints,ba;G.route=G.prototype.route=function(a,b,c){E[a]=b;da[a]=c||{};return this};G.dispatch=G.prototype.dispatch=function(a,b,c,d){E[a].call(this,b,c,d);return this};var H,I,aa;
if(x||C){var ea=function(a,b){b&&(a=b[0]);H=a.clientX;I=a.clientY},fa=function(a){var b=H,c=I;ea(a,a.changedTouches);50>Math.abs(H-b)&&50>Math.abs(I-c)&&D.call(this,a,"tap")},ha=function(a){ea(a,a.touches)},ia={passive:!1,capture:!0};aa=function(a){m(a,C?"pointerdown":"touchstart",ha,ia);m(a,C?"pointerup":"touchend",fa,ia)}}G.listen=G.prototype.listen=function(a,b){F[a]||(m(1,a,D,b),F[a]=1);return this};G.unlisten=G.prototype.unlisten=function(a,b){F[a]&&(m(0,a,D,b),F[a]=0);return this};l=G.prototype;l.move=function(a,b){if("number"===typeof a){var c=a;a=this.b[c]}else c=this.index(a);0>b&&(b=this.length+b-1);c!==b&&this.shift(a,b-c);return this};
l.shift=function(a,b,c){if(!b)return this;if("number"===typeof a){var d=a;a=this.b[a]}else d=this.index(a);var e=0>b;if(e&&d||!e&&d<this.length-1){b=e?Math.max(d+b,0):Math.min(d+b,this.length-1);var f=this.b[b],g=e&&1<d-b||!e&&1<b-d;if(!g&&this.I&&(this.store||this.C)){var h=this.store?this.store[d]:a._m;this.update(a,this.store?this.store[b]:f._m,c,b);this.update(f,h,c,d)}else this.root.insertBefore(a,e?f:this.b[b+1]||null);if(g){a=this.b[d];f=this.store&&this.store[d];if(e)for(;d>b;d--)this.b[d]=
this.b[d-1],this.store&&(this.store[d]=this.store[d-1]);else for(;d<b;d++)this.b[d]=this.b[d+1],this.store&&(this.store[d]=this.store[d+1]);this.b[b]=a;this.store&&(this.store[b]=f)}else c=this.b,e=this.store,c[d]=f,c[b]=a,e&&(a=e[b],e[b]=e[d],e[d]=a)}return this};l.up=function(a,b){(!b||0<b)&&this.shift(a,-(b||1));return this};l.down=function(a,b){(!b||0<b)&&this.shift(a,b||1);return this};l.first=function(a){return this.shift(a,-this.length)};l.last=function(a){return this.shift(a,this.length)};
l.before=function(a,b){"number"!==typeof a&&(a=this.index(a));"number"!==typeof b&&(b=this.index(b));b!==a+1&&(0>b&&(b=this.length+b,0>a&&b--),0>a&&(a=this.length+a-1),this.shift(a,b-a-1));return this};l.after=function(a,b){"number"!==typeof a&&(a=this.index(a));"number"!==typeof b&&(b=this.index(b));b!==a-1&&(0>b&&(b=this.length+b-2,0>a&&b++),0>a&&(a=this.length+a-1),this.shift(a,b-a+1));return this};
l.swap=function(a,b,c){if(a!==b){if("number"===typeof a){var d=a;a=this.b[a]}else d=this.index(a);if("number"===typeof b){var e=b;b=this.b[b]}else e=this.index(b);if(this.I&&(this.store||this.C)){var f=this.store?this.store[d]:a._m;this.update(a,this.store?this.store[e]:b._m,c,d);this.update(b,f,c,e)}else c=d+1!==e,this.root.insertBefore(c?a:b,c?b:a),c&&e+1!==d&&this.root.insertBefore(b,this.b[d+1]||null),this.b[d]=b,this.b[e]=a,this.store&&!this.K&&(a=this.store[e],this.store[e]=this.store[d],this.store[d]=
a)}return this};var J={};function ja(a){return J[a]=new RegExp("(?:^|\\s)"+a+"(?!\\S)","g")}function ka(a,b){K(a,b)||(a.className+=" "+b,a._c+=" "+b);return this}function la(a,b){b=(a._c||(a._c=a.className)).replace(J[b]||ja(b),"");a._c!==b&&(a.className=b,a._c=b);return this}function K(a,b){return!!(a._c||(a._c=a.className)).match(J[b]||ja(b))}function ma(a,b){var c=a._a||(a._a={}),d=c[b];return d||""===d?d:c[b]=a.getAttribute(b)};var na=window.localStorage;G.prototype.export=function(){if(this.store)var a=this.store;else if(this.C){a=Array(this.length);for(var b=0;b<this.length;b++)a[b]=this.b[b]._m}a&&na.setItem(this.l,JSON.stringify(a));return this};G.prototype.import=function(){var a=na.getItem(this.l);a&&(this.store=a=JSON.parse(a));return this};var L=Array.prototype,M=window.Proxy,N=0;function O(a){if(!(this instanceof O))return new O(a);if(a instanceof O)return a;this.view=this.A=null;var b=a?a.length:0;if(M){if(b)for(var c=0;c<b;c++)this[c]=a[c];this.length=b;this.F={splice:L.splice.bind(this),pop:L.pop.bind(this),shift:L.shift.bind(this),unshift:L.unshift.bind(this),push:L.push.bind(this)};return new Proxy(this,oa)}this.F=a||[];for(a=0;a<=b;a++)pa(this,a);N=b;pa(this,"length")}
function pa(a,b){Object.defineProperty(a,b,{get:function(){return this.F[b]},set:function(c){"number"===typeof b&&(b===N&&pa(this,++N),oa.set(this,b,c))}})}
var P=!1,oa={set:function(a,b,c){if("number"===typeof b)var d=!0;else{var e=parseInt(b,10);b===""+e&&(b=e,d=!0)}if(!P){P=!0;if((e=a.A)&&!e.L){var f=a.length;if(d){var g=e.length;f!==g&&(a.length=g);if(e.B&&a[b]===c)return P=!1,!0;d=a.view;b>=g?(e.add(c,d),a.length++):b<g&&(f=e.key,g=e.b[b],e.I||f&&g._k===c[f]?e.update(g,c,d,b):e.replace(g,c,d,b));if(e.proxy)return P=!1,!0}else"length"===b&&c<f&&e.remove(c,f-c)}P=!1}(M?a:a.F)[b]=c;return!0}};l=O.prototype;
l.swap=function(a,b){P=!0;this.A.swap(a,b,this.view);P=!1;return this};l.set=function(a){this.splice();return this.concat(a)};l.splice=function(a,b,c){P=!0;a||(a=0);"undefined"===typeof b&&(b=this.length-a,0>b&&(b=0));b&&this.A.remove(a,b);b=c?this.F.splice(a,b,c):this.F.splice(a,b);c&&this.A.add(c,a,this.view);P=!1;return b};l.push=function(a){P=!0;this.A.add(a,this.view);this.A.proxy||(this[this.length]=a);M&&this.length++;P=!1};
l.unshift=function(a){P=!0;this.A.add(a,0,this.view);this.F.unshift(a);P=!1};l.pop=function(){P=!0;this.A.remove(this.length-1);var a=this.F.pop();P=!1;return a};l.shift=function(){P=!0;this.A.remove(0);var a=this.F.shift();P=!1;return a};l.concat=function(a){for(var b=a.length,c=0;c<b;c++)this.push(a[c]);return this};l.sort=L.sort;l.reverse=L.reverse;l.slice=L.slice;l.map=function(a,b){b&&(a=a.bind(this));b=0;for(var c=this.length;b<c;b++)this[b]=a(this[b]);return this};
l.filter=function(a,b){b&&(a=a.bind(this));b=0;for(var c=this.length;b<c;b++)if(a(this[b]))e&&(this.splice(d,e),c-=e,b-=e,e=0);else if(e)e++;else{var d=b;var e=1}e&&this.splice(d,e);return this};l.indexOf=function(a){for(var b=0,c=this.length;b<c;b++)if(this[b]===a)return b;return-1};l.lastIndexOf=function(a){for(var b=this.length-1;0<=b;b--)if(this[b]===a)return b;return-1};l.forEach=function(a){for(var b=0,c=this.length;b<c;b++)a(this[b])};var ra=!window.Proxy&&function(){function a(b,c){this.path=c.path;this.M=c.M;c=Object.keys(b);for(var d=0,e=c.length;d<e;d++){var f=c[d];this.g(b,f,b[f])}return b}a.prototype._y=!0;a.prototype.g=function(b,c,d){var e=this;Object.defineProperty(b,c,{get:function(){return d},set:function(f){d!==f&&(qa(e.M,e.path,c,f),d=f)}})};return a}(),sa={_x:function(a,b){a.nodeValue=b},_h:function(a,b){a.innerHTML=b},_c:function(a,b){a.className=b},_cs:function(a,b){(a._s||(a._s=a.style)).cssText=b},_a:function(a,
b,c){a.setAttribute(c,b)}};function ta(a,b,c){return new (ra||Proxy)(a,{path:b,M:c,get:ua,set:va})}function ua(a,b){return"_y"===b||a[b]}function va(a,b,c){a[b]!==c&&(qa(this.M,this.path,b,c),a[b]=c);return!0}function qa(a,b,c,d){if(a=a["data."+c])for(var e=0,f=a.length,g;e<f;e++)g=a[e],sa[g[0]](b[g[1]],d,g[2]||c)};var wa=window,xa=wa.requestAnimationFrame,ya=wa.cancelAnimationFrame,za={},Q={},R={},S={},T={};function G(a,b,c){if(!(this instanceof G))return new G(a,b,c);a.nodeType||(c=b,b=a,a=null);a?this.mount(a):(this.root=this.b=null,this.length=0);this.init(b,c)}var Ba=G.register=function(a,b){b||(b=a,a=b.n);Q[a]=b;return G};l=G.prototype;
l.mount=function(a){this.root!==a&&(this.key&&this.root&&(this.root._o=this.g,this.g=a._o||{}),this.root=a,Ca(this),this.b=a._d||(a._d=Da(a.children)),this.length=this.b.length);return this};l.sync=function(a){this.root._d=this.b=Da(this.root.children);this.length=this.b.length;if(a&&this.cache)for(a=0;a<this.length;a++){var b=this.b[a]._p;if(b)for(var c=0,d;c<b.length;c++)d=b[c],d._c=d._h=d._x=d._cs=d._a=null}return this};
l.index=function(a){for(var b=0,c=this.length;b<c;b++)if(this.b[b]===a)return b;return-1};l.node=function(a){return this.b[a]};l.data=function(a){var b="object"===typeof a;return this.store?this.store[b?this.index(a):a]:(b?a:this.b[a])._m};l.find=function(a){if(this.key)return this.g["object"!==typeof a?a:a[this.key]];for(var b=0;b<this.length;b++)if(this.data(b)===a)return this.b[b]};
l.search=function(a){a=Object.values(a).join("^");for(var b=0;b<this.length;b++)if(Object.values(this.data(b)).join("^")===a)return this.b[b]};l.where=function(a){for(var b=Object.keys(a),c=b.length,d=[],e=0,f,g;e<this.length;e++){f=this.data(e);g=1;for(var h=0,k;h<c;h++)if(k=b[h],f[k]!==a[k]){g=0;break}g&&(d[d.length]=this.b[e])}return d};
l.init=function(a,b){"string"===typeof a?a=Q[a]:(b||!a||a.n||(b=a,a=null),a?a.n&&Ba(a):a=Q[this.l]);b||(b=this.O||{});this.I=!1!==b.reuse;this.state=b.state||za;this.cache=!1!==b.cache;this.async=b.async;this.D=0;this.J=b.on;var c=b.store||!1!==b.store;(this.K="object"===typeof c)?b.store=!0:c&&(c=[]);if(this.observe=c instanceof O)c.A=this;this.L=0;this.C=!this.K&&!1!==b.loose;this.store=!this.C&&c;this.O=b;c=a.n;this.l!==c&&(this.l=c,this.G=a.d,this.H=this.o=null,this.proxy=this.B=0,this.include=
null,this.N=!1!==b.prefetch&&U(this,a),Ca(this),this.g=(this.key=a.k)&&{},a=b.pool,this.v=this.I&&!1!==a&&"key"!==a&&(S[c]||(S[c]=[])),this.u=this.key&&!1!==a&&"queue"!==a&&(T[c]||(T[c]={})),this.size=this.v&&b.size);return this};G.once=function(a,b,c,d,e){var f=new G(a,b);"function"===typeof d&&(e=d,d=null);if(e){var g=e;e=function(){f.destroy(1);g()}}f.render(c,d,e);e||f.destroy(1);return G};function Ca(a){if(a.root){var b=a.root._t;b!==a.l&&(a.root._t=a.l,b&&(a.g={},a.remove(0,a.length)))}}
function Da(a){for(var b=a.length,c=Array(b),d=0,e;d<b;d++)e=a[d],c[d]=e;return c}l=G.prototype;
l.create=function(a,b,c){var d=this.key,e=d&&a[d],f,g,h;if(d&&(g=this.u)&&(f=g[e])){var k=1;if(g){if(g[e]=null,g=this.v){var n=f._n;f._n=null;var w=g.pop();w!==f&&(w._n=n,g[n]=w)}}else d=0}else(f=this.v)&&f.length?(f=f.pop(),g&&(f._n=null,g[f._k]=null)):f=h=this.N||(this.N=U(this,Q[this.l]));k&&this.B&&!this.observe||this.apply(f,a,b,c);if(h){f=f.cloneNode(!0);var v;(v=this.J)&&(v=v.create)&&v(f)}d&&(f._k=e,this.g[e]=f);return f};
l.apply=function(a,b,c,d){if(!this.G){b||(b=this.store?this.store[d]:a._m);c&&this.observe&&(this.store.view=c);this.H(a._p||Ea(this,a),!1,b,d,c);var e;(e=this.J)&&(e=e.change)&&a!==this.N&&e(a);return this}};l.refresh=function(a,b){if(this.B)return this;var c;"number"===typeof a?c=this.b[a]:b=a;if(c)return this.apply(c,null,b,a);a=this.length;if((c=this.store)&&this.C)return this.store=null,this.render(c,b);c=c?c.length:a;a=a<c?a:c;for(c=0;c<a;c++)this.apply(this.b[c],null,b,c);return this};
l.render=function(a,b,c,d){if(!d){b&&"object"!==typeof b&&(c=b,b=null);this.D&&this.cancel();if(c){var e=this;this.D=xa(function(){e.D=0;e.render(a,b,null,1);"function"===typeof c&&c()});return this}if(this.async){var f=this;return new Promise(function(p){f.D=xa(function(){f.D=0;f.render(a,b,null,1);p()})})}}d=this.length;if(!a){if(this.G)return this.b[0]||this.add(),this;if(!(a=this.store))return this}var g=a.length;if("undefined"===typeof g)a=[a],g=1;else if(!g)return this.remove(0,d);var h=(this.u||
!this.I)&&this.key;h||this.I||(this.remove(0,d,g),d=0);var k=d<g?d:g,n=0;if(n<k)for(;n<k;n++){var w=this.b[n],v=a[n];if(h&&w._k!==v[h])return this.reconcile(a,b,n,1);this.update(w,v,b,n)}if(n<g)for(;n<g;n++)this.add(a[n],b);else g<d&&this.remove(g,d-g);return this};
l.reconcile=function(a,b,c,d){var e=!this.K&&this.store;e&&(a||(a=e),this.store=0);var f=this.b,g=this.g,h=a.length,k=f.length,n=k>h?k:h,w=0,v=this.key;for(c||(c=0);c<n;c++){var p=void 0;if(c<h){var r=a[c],q=c>=k,t=void 0,A=void 0,y=void 0;if(!q&&(t=f[c],A=r[v],y=t._k,y===A)){d&&this.update(t,r,b,c);continue}if(q||!g[A]){d&&(q||!this.u?(k++,n=k>h?k:h,this.add(r,b,c)):this.replace(t,r,b,c));continue}for(var z=q=void 0,u=c+1;u<n;u++)if(!q&&u<k&&f[u]._k===A&&(q=u+1),!z&&u<h&&a[u][v]===y&&(z=u+1),q&&
z){q>=z?(p=f[q-1],this.root.insertBefore(p,t),d&&this.update(p,r,b,c),q===z?(1<u-c&&this.root.insertBefore(t,f[q]),f[c]=f[u],f[u]=t):(V(f,q-1,c),w++)):(r=z-1+w,this.root.insertBefore(t,f[r]||null),V(f,c,(r>k?k:r)-1),w--,c--);p=1;break}}p||(this.remove(c),k--,n=k>h?k:h,c--)}e&&(this.store=a);return this};function V(a,b,c,d){var e=d||a[b];d&&b++;if(b<c)for(;b<c;b++)a[b]=a[b+1];else for(;b>c;b--)a[b]=a[b-1];a[c]=e}
l.add=function(a,b,c,d){if(!d)if("number"===typeof b){c=b;b=null;var e=1}else if(c||0===c)e=1;c=d||e?c:this.length;b=this.create(a,b,c);var f;this.proxy&&(this.B&&this.C&&b._m===a?f=1:a._y||(a=ta(a,b._p||Ea(this,b),this.proxy)));f||(this.store?e&&!this.K?V(this.store,this.length-1,c,a):(this.L=1,this.store[c]=a,this.L=0):this.C&&(b._m=a));e?(this.root.insertBefore(b,this.b[c]),V(this.b,this.length-1,c,b),this.length++):(d?this.root.replaceChild(b,d):(this.root.appendChild(b),this.length++),this.b[c]=
b);var g;(g=this.J)&&(g=g.insert)&&g(b);return this};l.clear=function(a){this.length&&this.remove(0,this.length);if(a){R[this.l+(this.cache?"$":"")]=null;if(this.key)if(this.length){a=Object.keys(this.g);for(var b=0,c=a.length,d=void 0;b<c;b++)this.key[d=a[b]]||delete this.key[d]}else this.g={};this.v&&(this.v=S[this.l]=[]);this.u&&(this.u=T[this.l]={})}return this};l.destroy=function(a){a&&this.unload();this.length=0;this.include=this.store=this.g=this.b=this.root=this.l=this.o=this.H=this.N=null};
l.cancel=function(){this.D&&(ya(this.D),this.D=null);return this};l.append=function(a,b,c){if("number"===typeof b){c=b;b=null;var d=1}else d=c||0===c;for(var e=a.length,f=0;f<e;f++)this.add(a[f],b,d?c++:null);return this};
l.remove=function(a,b,c){var d=this.length;a&&("object"===typeof a?a=this.index(a):0>a&&(a=d+a-1));if(!d||a>=d)return this;b?0>b&&(a-=b+1,0>a&&(a=0),b*=-1):b=1;if(!a&&b>=d){this.store&&!this.K&&(this.store=c?Array(c):[]);if(this.include&&(this.u||this.v))for(b=0;b<this.include.length;b++)this.include[b].clear();a=this.b;b=a.length;this.root.textContent="";this.root._d=this.b=c?Array(c):[];d=0}else this.store&&!this.observe&&this.store.splice(a,b),a=this.b.splice(a,b),d-=b;var e;if((e=this.J)&&(e=
e.remove))for(c=0;c<b;c++)e(a[c]);this.length=d;if(this.v&&!this.u&&1<b){e=a;c=e.length;for(var f=c/2|0,g=0,h;g<f;g++)h=e[g],e[g]=e[c-g-1],e[c-g-1]=h}for(e=0;e<b;e++)c=a[e],d&&this.root.removeChild(c),Fa(this,c);return this};function Fa(a,b){if(a.key){var c=b._k;a.g[c]=null;a.u&&(a.u[c]=b)}a.v&&(c=a.v.length,!a.size||c<a.size)&&(a.u&&(b._n=c),a.v[c]=b)}
l.replace=function(a,b,c,d){"undefined"===typeof d&&("number"===typeof a?(d=a,a=this.b[d]):d=this.index(a));this.add(b,c,d,a);Fa(this,a);var e;(e=this.J)&&(e=e.remove)&&e(a);return this};
l.update=function(a,b,c,d){"undefined"===typeof d&&("number"===typeof a?(d=a,a=this.b[a]):d=this.index(a));if(this.proxy){if(this.B&&(this.store?this.store[d]:a._m)===b)return this;b._y||(b=ta(b,a._p||Ea(this,a),this.proxy))}this.store?(this.L=1,this.store[d]=b,this.L=0):this.C&&(a._m=b);if(this.key){var e=a._k,f=b[this.key];e!==f&&(this.g[e]=null,this.g[f]=a,a._k=f)}var g;(g=this.J)&&(g=g.update)&&g(a);return this.apply(a,b,c,d)};
function Ea(a,b){for(var c=a.o.length,d={},e=Array(c),f=0,g;f<c;f++){g=a.o[f];var h=f,k;if(!(k=d[g])){k=b;for(var n=0,w=g.length,v="";n<w;n++){var p=g[n];v+=p;d[v]?k=d[v]:(">"===p?k=k.firstElementChild:"+"===p?k=k.nextElementSibling:"|"===p&&(k=k.firstChild),d[v]=k)}}e[h]=k}return b._p=e}var W;
function U(a,b,c,d,e){if(!c){var f=R[b.n+(a.cache?"$":"")];if(f)return a.H=f.H,a.G=f.G,a.B=f.B,a.proxy=f.proxy,a.include=f.P,a.o=f.o,f.node}f=document.createElement(b.t||"div");c||(c=0,d="&",W="",a.o=[],f._p=e=[]);var g=b.s,h=b.i,k=b.x,n=b.h,w=b.a,v=b.e,p=b.c,r=b.j,q=a.o.length,t=0,A=0,y="";r&&(y+=";"+r,-1<y.indexOf("self")&&(t=2));b.f&&(W+=";if("+b.f+"){self.hidden=false",t=2);p&&("object"===typeof p?(r=p[1],p=""+p[0],y+=a.cache&&!r?";v="+p+";if(self._c!==v){self._c=v;self.className=v}":p?";self.className="+
p:"",r&&(X(a,p,["_c",q]),A++),t++):f.className=p);if(w||v){var z;w&&(z=Object.keys(w));v&&(p=Object.keys(v),z=z?z.concat(p):p);for(p=0;p<z.length;p++){r=z[p];var u=void 0;w&&"undefined"!==typeof(u=w[r])||(u=v[r],a.listen(r));if("object"===typeof u){var Aa=u[1];u=""+u[0];y+=a.cache&&!Aa?";v="+u+";var _a=self._a||(self._a={});if(_a['"+r+"']!==v){_a['"+r+"']=v;self[v||v===0?'setAttribute':'removeAttribute']('"+r+"',v)}":u?";v="+u+";self[v||v===0?'setAttribute':'removeAttribute']('"+r+"',v)":"";Aa&&(X(a,
u,["_a",q,r]),A++);t++}else f.setAttribute(r,u)}}g&&("string"===typeof g?f.style.cssText=g:g.length&&(z=g[1],g=g[0],y+=a.cache&&!z?";v="+g+";if(self._cs!==v){self._cs=v;(self._s||(self._s=self.style)).cssText=v}":g?";self.style.cssText="+g:"",z&&(X(a,g,["_cs",q]),A++),t++));if(b["@"]||b.r){a.include||(a.include=[]);var B=b["@"]||b.i;b["@"]||(B.n=b["@"]=a.l+"@"+a.include.length,b.i=null);h=null;y+=";this.include["+a.include.length+"].mount(self).render("+b.r+(b.m?".slice("+(0<=b.m?"0,"+b.m:b.m)+")":
"")+",view)";k=W;W="";a.include.push(new G(f,B,Object.assign({},a.O,{store:!1,async:0})));W=k;t++}else if(!h)if(b["+"])h=Q[b["+"]];else if(k){if(n="object"===typeof k)B=k[1],k=""+k[0];g=document.createTextNode(k);n&&(t&&q++,a.o[q]=d+"|",e[q]=g,Ga(t,a.cache&&!B?";v="+k+";if(self._x!==v){self._x=v;self.nodeValue=v}":k?";self.nodeValue="+k:"",q,a.cache),B&&(X(a,k,["_x",q]),A++),t&&q--);f.appendChild(g)}else n&&("object"===typeof n?(B=n[1],n=""+n[0],y+=a.cache&&!B?";v="+n+";if(self._h!==v){self._h=v;self.innerHTML=v}":
n?";self.innerHTML="+n:"",B&&(X(a,n,["_h",q]),A++),t++):f.innerHTML=n);t?(a.o[q]=d,e[q]=f,a.G=0,t===A&&(a.B=1),Ga(t,y,q,a.cache)):y&&(W+=y);if(h)if(h.length)for(y=">",B=0;B<h.length;B++){B&&(y+="+");k=h[B];if(A=k["+"])k=Q[A];f.appendChild(U(a,k,c+B+1,d+y,e))}else{if(A=h["+"])h=Q[A];f.appendChild(U(a,h,c+1,d+">",e))}b.f&&(W+="}else "+(1<t?"self":"p["+q+"]")+".hidden=true");c||(!a.G&&W&&(a.H=Function("p","s","data","index","view",'"use strict";var self,v'+W)),c={H:a.H,G:a.G,o:a.o,node:f},c.P=a.include,
c.proxy=a.proxy,c.B=a.B,R[b.n+(a.cache?"$":"")]=c);return f}function X(a,b,c){a.proxy||(a.proxy={});(a.proxy[b]||(a.proxy[b]=[])).push(c)}function Ga(a,b,c,d){W=d||1<a?W+(";self=p["+c+"]"+b):W+b.replace(/self/g,"p["+c+"]")}
G.prototype.load=function(a,b){var c=this,d=new XMLHttpRequest;d.overrideMimeType("application/json");d.open("GET",a,!1!==b);d.onload=function(){var e=this.responseText;if(e){try{var f=JSON.parse(e);Ba(f);c instanceof G&&c.init(f)}catch(h){var g=h}"function"===typeof b&&b(g)}};d.send();return this};G.load=G.prototype.load;G.prototype.unload=function(a){a?"object"===typeof a&&(a=a.n):a=this.l;a&&(Q[a]=null,S[a]=T[a]=R[a]=null,R[a+"$"]=null);return this};G.unregister=G.unload=G.prototype.unload;var Ha={tap:1,change:1,click:1,dblclick:1,input:1,keydown:1,keypress:1,keyup:1,mousedown:1,mouseenter:1,mouseleave:1,mousemove:1,mouseout:1,mouseover:1,mouseup:1,mousewheel:1,touchstart:1,touchmove:1,touchend:1,reset:1,select:1,submit:1,toggle:1,blur:1,error:1,focus:1,load:1,resize:1,scroll:1},Ia,Ja=0;
function Ka(a,b){var c={};if(!b){Ia=!0;if("string"===typeof a)if(-1!==a.indexOf("<")){var d=document.createElement("div");d.innerHTML=a;a=d.firstElementChild;c.n=a.id||"tpl_"+Ja++}else c.n=a,a=document.getElementById(a);else c.n=a.id||"tpl_"+Ja++;a.content?a=a.content.firstElementChild:"TEMPLATE"===a.tagName&&(a=a.firstElementChild)}if(d=a.tagName){if("INCLUDE"===d)return b=a.getAttribute("from"),c["+"]=b?b:La(a.firstChild.nodeValue),c;"DIV"!==d&&(c.t=d.toLowerCase())}else return(b=a)&&(b=b.nodeValue)&&
(b=b.replace(/\s+/g," "))&&b.trim()&&(a=b.indexOf("{{@"),-1!==a&&(d=b.indexOf("}}",a),c.j=b.substring(a+3,d),b=b.substring(0,a)+b.substring(d+2)),b&&b.trim()&&(-1!==b.indexOf("{{#")?Y(c,"h",b.replace(/{{#/g,"{{")):Y(c,"x",b))),c.j||b&&b.trim()?c:null;var e=a.attributes;if(e.length)for(var f=0;f<e.length;f++){var g=e[f].nodeName;if("class"===g)Y(c,"c",a.className);else{var h=a.getAttribute(g);"style"===g?Y(c,"s",h):"if"===g?Y(c,"f",h):"include"===g?a.hasAttribute("for")||(g={},(c.i||(c.i=[])).push(g),
Y(g,"+",h)):"for"===g&&"LABEL"!==d?((g=a.getAttribute("include"))&&(c["@"]=La(g)),Y(c,"r",h)):"max"===g?Y(c,"m",h):"js"===g?c.j=La(h):"key"===g?Y(c,"k",h.replace("data.","")):("bind"===g&&(h=h.split(":"),2>h.length&&h.unshift("value"),g=h[0],h="{{=="+h[1]+"}}"),Ha[g.substring(2)]&&-1!==h.indexOf("{{")&&(g=g.substring(2)),Ha[g]?Y(c.e||(c.e={}),g,h):Y(c.a||(c.a={}),g,h))}}a=a.childNodes;if(d=a.length){for(f=e=0;f<d;f++)if(h=Ka(a[f],1))1===d&&3===a[f].nodeType?(h.j&&(c.j=h.j),h.h&&(c.h=h.h),h.x&&(c.x=
h.x)):(c.i||(c.i=[]))[e++]=h;1===e&&(c.i=c.i[0])}b||(c.d=Ia);return c}function Y(a,b,c){if(-1!==c.indexOf("{{")&&-1!==c.indexOf("}}")){var d=-1!==c.indexOf("{{=="),e=d||-1!==c.indexOf("{{=");Ia=!1;c=c.replace(/{{==/g,"{{").replace(/{{=/g,"{{").replace(/"{{/g,"").replace(/}}"/g,"").replace(/{{/g,"' + ").replace(/}}/g," + '");a[b]=[("'"+c+"'").replace(/'' \+ /g,"").replace(/ \+ ''/g,"").trim()];d?a[b].push(2):e&&a[b].push(1)}else a[b]=c}
function La(a){return a.replace(/{{/g,"").replace(/}}/g,"").trim()};G.compile=Ka;G.array=O;G.setText=function(a,b){3!==a.nodeType&&(a._h=null,a=a.firstChild||a.appendChild(document.createTextNode(a._x=b)));a._x!==b&&(a.nodeValue=b,a._x=b);return this};G.getText=function(a){if(3!==a.nodeType&&!(a=a.firstChild))return"";var b=a._x;return b||""===b?b:a._x=a.nodeValue};G.setHTML=function(a,b){a._h!==b&&(a.innerHTML=b,a._h=b);return this};G.getHTML=function(a){var b=a._h;return b||""===b?b:a._h=a.innerHTML};G.setClass=function(a,b){a._c!==b&&(a.className=b,a._c=b);return this};
G.getClass=function(a){var b=a._c;return b||""===b?b:a._c=a.className};G.hasClass=K;G.toggleClass=function(a,b){K(a,b)?la(a,b):ka(a,b);return this};G.removeClass=la;G.addClass=ka;G.setCSS=function(a,b){a._cs!==b&&((a._s||(a._s=a.style)).cssText=b,a._cs=b);return this};G.getCSS=function(a){var b=a._cs;return b||""===b?b:a._cs=a.getAttribute("style")};G.setAttribute=function(a,b,c){var d=a._a||(a._a={});d[b]!==c&&(a.setAttribute(b,c),d[b]=c);return this};G.getAttribute=ma;
G.hasAttribute=function(a,b){a=ma(a,b);return!!a||""===a};G.removeAttribute=function(a,b){var c=a._a||(a._a={});null!==c[b]&&(a.removeAttribute(b),c[b]=null);return this};var Z=window,Ma;(Ma=Z.define)&&Ma.amd?Ma([],function(){return G}):"object"===typeof Z.exports?Z.module.exports=G:Z.Mikado=G;}).call(this);

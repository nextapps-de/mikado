export default{name:"keyed",key:"id",cache:true,tpl:{tag:"section",attr:{"data-id":[""],"data-date":[""],"data-index":[""]},child:{tag:"div",child:[{tag:"div",class:"title",text:[""]},{tag:"div",class:"content",text:[""]},{tag:"div",class:"footer",text:[""]}],class:[""],style:"padding-right:10px;"}},fn:[function(data,state,index,_p,_x){let _o,_v,_c;_o=_p[0];_x&&(_x[0]=_c={});_v=data.id+"";_c&&(_c["_adata-id"]=_v);if(_o.c["_adata-id"]!==_v){_o.c["_adata-id"]=_v;_o.n[_v===false?"removeAttribute":"setAttribute"]("data-id",_v)}_v=data.date+"";_c&&(_c["_adata-date"]=_v);if(_o.c["_adata-date"]!==_v){_o.c["_adata-date"]=_v;_o.n[_v===false?"removeAttribute":"setAttribute"]("data-date",_v)}_v=data.index+"";_c&&(_c["_adata-index"]=_v);if(_o.c["_adata-index"]!==_v){_o.c["_adata-index"]=_v;_o.n[_v===false?"removeAttribute":"setAttribute"]("data-index",_v)}_o=_p[1];_x&&(_x[1]=_c={});_v=data.classname+"";_c&&(_c._c=_v);if(_o.c._c!==_v){_o.c._c=_v;_o.n.className=_v}_o=_p[2];_x&&(_x[2]=_c={});_v=data.title+"";_c&&(_c._t=_v);if(_o.c._t!==_v){_o.c._t=_v;_o.n.nodeValue=_v}_o=_p[3];_x&&(_x[3]=_c={});_v=data.content+"";_c&&(_c._t=_v);if(_o.c._t!==_v){_o.c._t=_v;_o.n.nodeValue=_v}_o=_p[4];_x&&(_x[4]=_c={});_v=data.footer+"";_c&&(_c._t=_v);if(_o.c._t!==_v){_o.c._t=_v;_o.n.nodeValue=_v}return _x;}]}
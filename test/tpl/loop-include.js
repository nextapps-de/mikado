export default{
name:"loop-include",
tpl:{
  tag: "main",
  inc: {
    tag: "div",
    child: [
      {
        tag: "div",
        inc: "template"
      },
      {
        tag: "div",
        inc: "template"
      }
    ]
  }
},
fn:[null,null,function(data,state,index,_p){
  let _o,_v;
  _o=_p[0];
  this.inc[0].mount(_o.n)[data?"render":"clear"](data,state);
  _o=_p[1];
  this.inc[1].mount(_o.n)[data?"render":"clear"](data,state);
},function(data,state,index,_p){
  let _o,_v;
  _o=_p[0];
  this.inc[0].mount(_o.n)[!data.hide?"render":"clear"](data.main,state);
}]
}
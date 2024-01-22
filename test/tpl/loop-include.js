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
fn:[null,null,function(data,state,index,_p,_f,_x){
  this.inc[0].mount(_p[0].n)[data?"render":"clear"](data,state);
  this.inc[1].mount(_p[1].n)[data?"render":"clear"](data,state);
},function(data,state,index,_p,_f,_x){
  this.inc[0].mount(_p[0].n)[!data.hide?"render":"clear"](data.main,state);
}]
}
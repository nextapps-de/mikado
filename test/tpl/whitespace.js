export default{
name:"whitespace",
tpl:{
  tag: "main",
  child: [
    {
      tag: "section",
      style: "display:block;\r\nposition:relative;",
      text: "\r\n\r\n        test\r\n\r\n    "
    },
    {
      tag: "section",
      text: [
        ""
      ]
    }
  ]
},
fn:[function(data,state,index,_p,_x){
  _p[0]._t(' '+('test' + `-` + "test")+' ',_x,0);
}]
}
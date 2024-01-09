export default{
name:"scope",
tpl:{
  tag: "div",
  child: [
    {
      tag: "div",
      text: [
        ""
      ]
    },
    {
      tag: "div",
      text: [
        ""
      ]
    },
    {
      tag: "div",
      text: [
        ""
      ]
    }
  ]
},
fn:[function(data,state,index,_p){
  let value = 'test';
  _p[0]._t(value);
  value += '|test';
  _p[1]._t(value);
  value += (function(d){

        return '|' + d.test;

    }(data));
  _p[2]._t(value);
}]
}
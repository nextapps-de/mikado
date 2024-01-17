export default{
name:"crazy",
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
      child: [
        {
          text: [
            ""
          ]
        },
        {
          text: [
            ""
          ]
        },
        {
          text: [
            ""
          ]
        }
      ]
    },
    {
      tag: "div",
      attr: {
        "data-id": [
          ""
        ]
      },
      html: [
        ""
      ],
      style: [
        ""
      ]
    }
  ]
},
fn:[function(data,state,index,_p,_x){
  _p[0]._t(("This")+' is '+("some " + 'crazy\'\""')+' template',_x,0);
  const whitespace = ' ';
  _p[1]._t('This'+(            " is ")+'some '+((function(value){
                return  value;
            }('crazy')))+(whitespace)+'template',_x,1);
  let  test = 1;
  _p[2]._t(test,_x,2);
  test++;
  _p[3]._t(test,_x,3);
  test++;
  _p[4]._t((test === 3),_x,4);
  const val = "block";
  const html = decodeURIComponent('%3Cb>bold%3C/b>');
  _p[5]._a("data-id",val,_x,5);
  _p[5]._h(html,_x,5);
  _p[6]._s('display:'+(val),_x,6);
  return _x;
}]
}
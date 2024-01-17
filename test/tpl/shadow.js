export default{
name:"shadow",
tpl:{
  tag: "section",
  attr: {
    "data-id": [
      ""
    ],
    "data-date": [
      ""
    ],
    "data-index": [
      ""
    ],
    "root": ""
  },
  child: {
    tag: "div",
    child: [
      {
        tag: "div",
        class: "title",
        event: {
          "click": "delegate:root"
        },
        text: [
          ""
        ]
      },
      {
        tag: "div",
        class: "content",
        event: {
          "click": "delegate:foo"
        },
        html: [
          ""
        ]
      },
      {
        tag: "div",
        attr: {
          "data-footer": [
            ""
          ]
        },
        class: "footer",
        text: [
          ""
        ]
      }
    ],
    class: [
      ""
    ],
    event: {
      "tap": "attach"
    },
    style: "padding-right:10px;"
  }
},
cmp:[
  {
    tag: "style",
    text: "table{ width: 100%; opacity: 0.5 }"
  },
  {
    tag: "script",
    text: "window.footer = \"foobar\";"
  }
],
fn:[function(data,state,index,_p,_x){
  _p[0]._a("data-id",data.id,_x,0);
  _p[0]._a("data-date",data.date,_x,0);
  _p[0]._a("data-index",index,_x,0);
  _p[1]._c(data.class,_x,1);
  _p[2]._t(data.title,_x,2);
  _p[3]._h(data.content,_x,3);
  _p[4]._a("data-footer",window.footer,_x,4);
  _p[5]._t(data.footer,_x,5);
  return _x;
}]
}
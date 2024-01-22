export default{
name:"proxy-keyed",
key:"id",
tpl:{
  tag: "section",
  attr: {
    "data-id": [
      "id"
    ],
    "data-date": [
      "date"
    ],
    "data-index": [
      "index"
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
          "title"
        ]
      },
      {
        tag: "div",
        class: "content",
        event: {
          "click": "delegate:foo"
        },
        html: [
          "content"
        ]
      },
      {
        tag: "div",
        class: "footer",
        text: [
          "footer"
        ]
      }
    ],
    class: [
      "class"
    ],
    event: {
      "tap": "attach"
    },
    style: [
      "style"
    ]
  }
},
fn:[function(data,state,index,_p,_f,_x){
  _p[0]._a("data-id",data.id,_f,_x,0);
  _p[0]._a("data-date",data.date,_f,_x,0);
  _p[0]._a("data-index",data.index,_f,_x,0);
  _p[1]._c(data.class,_x,1);
  _p[2]._s(data.style,_x,2);
  _p[3]._t(data.title,_x,3);
  _p[4]._h(data.content,_x,4);
  _p[5]._t(data.footer,_x,5);
}]
}
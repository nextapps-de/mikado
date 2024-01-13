export default{
name:"proxy",
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
fn:[function(data,state,index,_p){
  _p[0]._a("data-id",data.id);
  _p[0]._a("data-date",data.date);
  _p[0]._a("data-index",data.index);
  _p[1]._c(data.class);
  _p[2]._s(data.style);
  _p[3]._t(data.title);
  _p[4]._h(data.content);
  _p[5]._t(data.footer);
}]
}
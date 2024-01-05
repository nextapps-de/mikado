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
    style: [
      "style"
    ],
    event: {
      "tap": "attach"
    }
  }
},
fn:[function(data,state,index,_p){
  let _o,_v;
  _o=_p[0];
  _v=data.id;
  (!_o.c||_o.c["_adata-id"]!==_v)&&_o._a("data-id",_v);
  _v=data.date;
  (!_o.c||_o.c["_adata-date"]!==_v)&&_o._a("data-date",_v);
  _v=data.index;
  (!_o.c||_o.c["_adata-index"]!==_v)&&_o._a("data-index",_v);
  _o=_p[1];
  _v=data.class;
  (!_o.c||_o.c._c!==_v)&&_o._c(_v);
  _o=_p[2];
  _v=data.style;
  (!_o.c||_o.c._s!==_v)&&_o._s(_v);
  _o=_p[3];
  _v=data.title;
  (!_o.c||_o.c._t!==_v)&&_o._t(_v);
  _o=_p[4];
  _v=data.content;
  (!_o.c||_o.c._h!==_v)&&_o._h(_v);
  _o=_p[5];
  _v=data.footer;
  (!_o.c||_o.c._t!==_v)&&_o._t(_v);
}]
}
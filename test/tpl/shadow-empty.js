export default{
name:"shadow-empty",
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
    style: "padding-right:10px;",
    event: {
      "tap": "attach"
    }
  }
},
cmp:[],
fn:[function(data,state,index,_p){
  _p[0]._a("data-id",data.id);
  _p[0]._a("data-date",data.date);
  _p[0]._a("data-index",index);
  _p[1]._c(data.class);
  _p[2]._t(data.title);
  _p[3]._h(data.content);
  _p[4]._a("data-footer",window.footer);
  _p[5]._t(data.footer);
}]
}
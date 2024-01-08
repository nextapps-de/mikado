export default{
name:"loop-inline",
tpl:{
  tag: "main",
  inc: {
    tag: "div",
    child: [
      {
        tag: "div",
        inc: {
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
        }
      },
      {
        tag: "div",
        inc: 1
      }
    ]
  }
},
fn:[function(data,state,index,_p){
  _p[0]._a("data-id",data.id);
  _p[0]._a("data-date",data.date);
  _p[0]._a("data-index",index);
  _p[1]._c(data.class);
  _p[2]._t(data.title);
  _p[3]._h(data.content);
  _p[4]._t(data.footer);
},function(data,state,index,_p){
  this.inc[0].mount(_p[0].n)[data?"render":"clear"](data,state);
  this.inc[0].mount(_p[1].n)[data?"render":"clear"](data,state);
},function(data,state,index,_p){
  this.inc[0].mount(_p[0].n)[!data.hide?"render":"clear"](data.main,state);
}]
}
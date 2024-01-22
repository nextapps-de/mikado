export default{
name:"shadow-option",
tpl:{
  tag: "main",
  child: [
    {
      tag: "style",
      text: "table{ width: 100%; opacity: 0.5 }"
    },
    {
      tag: "script",
      text: "window.footer = \"foobar\";"
    },
    {
      tag: "root",
      inc: {
        tag: "section",
        attr: {
          "data-id": [],
          "data-date": [],
          "data-index": [],
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
              text: []
            },
            {
              tag: "div",
              class: "content",
              event: {
                "click": "delegate:foo"
              },
              html: []
            },
            {
              tag: "div",
              attr: {
                "data-footer": []
              },
              class: "footer",
              text: []
            }
          ],
          class: [],
          event: {
            "tap": "attach"
          },
          style: "padding-right:10px;"
        }
      }
    }
  ]
},
fn:[function(data,state,index,_p,_f,_x){
  _p[0]._a("data-id",data.id,_f,_x,0);
  _p[0]._a("data-date",data.date,_f,_x,0);
  _p[0]._a("data-index",index,_f,_x,0);
  _p[1]._c(data.class,_x,1);
  _p[2]._t(data.title,_x,2);
  _p[3]._h(data.content,_x,3);
  _p[4]._a("data-footer",window.footer,_f,_x,4);
  _p[5]._t(data.footer,_x,5);
},function(data,state,index,_p,_f,_x){
  this.inc[0].mount(_p[0].n).render(data.data,state);
}]
}
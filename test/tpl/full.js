export default{
name:"full",
tpl:{
  tag: "main",
  attr: {
    "id": [
      ""
    ]
  },
  child: {
    tag: "table",
    child: [
      {
        tag: "thead",
        child: {
          tag: "tr",
          child: [
            {
              tag: "th",
              text: "Index"
            },
            {
              tag: "th",
              text: "Title"
            },
            {
              tag: "th",
              text: "Media"
            },
            {
              tag: "th",
              text: "Category"
            },
            {
              tag: "th",
              text: "Comment"
            },
            {
              tag: "th",
              text: "Date"
            },
            {
              tag: "th",
              inc: "pager"
            }
          ]
        }
      },
      {
        tag: "tbody",
        inc: {
          tag: "tr",
          attr: {
            "data-id": [
              ""
            ],
            "root": ""
          },
          child: [
            {
              tag: "td",
              text: [
                ""
              ]
            },
            {
              tag: "td",
              text: [
                "title"
              ]
            },
            {
              tag: "td",
              html: [
                ""
              ]
            },
            {
              tag: "td",
              text: [
                ""
              ]
            },
            {
              tag: "td",
              text: [
                ""
              ]
            },
            {
              tag: "td",
              text: [
                ""
              ]
            },
            {
              tag: "td",
              child: {
                tag: "select",
                child: [
                  {
                    tag: "option",
                    attr: {
                      "value": "on",
                      "selected": [
                        ""
                      ]
                    },
                    text: "Enabled"
                  },
                  {
                    tag: "option",
                    attr: {
                      "value": "off",
                      "selected": [
                        ""
                      ]
                    },
                    text: "Disabled"
                  }
                ],
                event: {
                  "change": "select-active:root"
                }
              },
              style: [
                ""
              ]
            }
          ],
          key: "id"
        }
      },
      {
        tag: "tfoot",
        inc: {
          tag: "tr",
          child: {
            tag: "td",
            attr: {
              "colspan": "7"
            },
            text: "No entries found."
          }
        }
      }
    ]
  }
},
fn:[null,function(data,state,index,_p,_x){
  const datestr = new Date(data.date).toLocaleString();
  _p[0]._a("data-id",data.id,_x,0);
  const datestr2 = datestr;
  _p[1]._t((index + 1),_x,1);
  _p[2]._t(data.title,_x,2);
  _p[3]._h(data.media,_x,3);
  _p[4]._t((data.category||data.category===0?data.category:''),_x,4);
  _p[5]._t(data.comment,_x,5);
  _p[6]._t(datestr2,_x,6);
  _p[7]._s('opacity:'+(state.selected===data.id?'1':'0.5'),_x,7);
  _p[8]._a("selected",(data.mode === 'on'),_x,8);
  _p[9]._a("selected",(data.mode === 'off'),_x,9);
},function(data,state,index,_p,_x){
  _p[0]._a("id",data.view,_x,0);
  this.inc[0].mount(_p[1].n).render(data,state);
  this.inc[1].mount(_p[2].n).render(data.entries,state);
  this.inc[2].mount(_p[3].n)[!data.entries.length?"render":"clear"](data,state);
}]
}
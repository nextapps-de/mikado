export default{
name:"static",
tpl:{
  tag: "section",
  attr: {
    "data-id": "data.id",
    "data-date": "data.date",
    "data-index": "index",
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
        text: "data.title"
      },
      {
        tag: "div",
        class: "content",
        event: {
          "click": "delegate:foo"
        },
        text: "data.content"
      },
      {
        tag: "div",
        class: "footer",
        text: "data.footer"
      }
    ],
    class: "data.class",
    event: {
      "tap": "attach"
    },
    style: "padding-right:10px;"
  }
},
fn:null
}
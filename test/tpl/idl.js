export default{
name:"idl",
tpl:{
  tag: "form",
  child: [
    {
      tag: "select",
      child: [
        {
          tag: "option",
          attr: {
            "value": "1",
            "selected": []
          },
          text: "0"
        },
        {
          tag: "option",
          attr: {
            "value": "2",
            "selected": []
          },
          text: "1"
        },
        {
          tag: "option",
          attr: {
            "value": "3",
            "selected": []
          },
          text: "1"
        }
      ]
    },
    {
      tag: "fieldset",
      child: [
        {
          tag: "input",
          attr: {
            "type": "checkbox",
            "checked": []
          }
        },
        {
          tag: "input",
          attr: {
            "type": "checkbox",
            "checked": []
          }
        },
        {
          tag: "input",
          attr: {
            "type": "checkbox",
            "checked": []
          }
        }
      ]
    },
    {
      tag: "fieldset",
      child: [
        {
          tag: "input",
          attr: {
            "type": "radio",
            name: "radio",
            "checked": []
          }
        },
        {
          tag: "input",
          attr: {
            "type": "radio",
            name: "radio",
            "checked": []
          }
        },
        {
          tag: "input",
          attr: {
            "type": "radio",
            name: "radio",
            "checked": []
          }
        }
      ]
    },
    {
      tag: "fieldset",
      child: [
        {
          tag: "input",
          attr: {
            "type": "text",
            "hidden": []
          }
        },
        {
          tag: "input",
          attr: {
            "type": "text",
            "hidden": []
          }
        },
        {
          tag: "input",
          attr: {
            "type": "text",
            "hidden": []
          }
        }
      ]
    }
  ]
},
fn:[function(data,state,index,_p,_f,_x){
  _p[0]._a("selected",(data.selected === 1),_f,_x,0);
  _p[1]._a("selected",(data.selected === 2),_f,_x,1);
  _p[2]._a("selected",(data.selected === 3),_f,_x,2);
  _p[3]._a("checked",(data.checked === 1),_f,_x,3);
  _p[4]._a("checked",(data.checked === 2),_f,_x,4);
  _p[5]._a("checked",(data.checked === 3),_f,_x,5);
  _p[6]._a("checked",(data.checked === 1),_f,_x,6);
  _p[7]._a("checked",(data.checked === 2),_f,_x,7);
  _p[8]._a("checked",(data.checked === 3),_f,_x,8);
  _p[9]._a("hidden",(data.hidden === 1),_f,_x,9);
  _p[10]._a("hidden",(data.hidden === 2),_f,_x,10);
  _p[11]._a("hidden",(data.hidden === 3),_f,_x,11);
}]
}
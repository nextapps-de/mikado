export default {
  "t": "li",
  "a": {
    "root": ""
  },
  "i": [
    {
      "i": [
        {
          "t": "input",
          "a": {
            "type": "checkbox",
            "change": "update-state:root"
          },
          "c": [
            " view.is_visible(item) ? 'toggle' : '' "
          ],
          "j": "self.checked=!!item.completed"
        },
        {
          "t": "label",
          "a": {
            "for": [
              "'item-' +  item.id "
            ],
            "dblclick": "enter-edit-mode:root"
          },
          "c": "title",
          "x": [
            " item.title "
          ]
        },
        {
          "t": "button",
          "a": {
            "click": "destroy:root"
          },
          "c": "destroy"
        }
      ],
      "c": "view"
    },
    {
      "t": "input",
      "a": {
        "id": [
          "'item-' +  item.id "
        ],
        "value": [
          " item.title "
        ],
        "keyup": "edit:root",
        "blur": "edit:root"
      },
      "c": "edit"
    }
  ],
  "c": [
    " item.completed ? 'completed' : '' "
  ],
  "f": "view.is_visible(item)",
  "n": "list",
  "v": "0.1.3"
};
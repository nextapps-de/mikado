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
            "type": "checkbox"
          },
          "c": [
            " view.is_visible(data) ? 'toggle' : '' "
          ],
          "j": "self.checked=!!data.completed",
          "e": {
            "change": "update-state:root"
          }
        },
        {
          "t": "label",
          "a": {
            "for": [
              "'item-' +  data.id "
            ]
          },
          "c": "title",
          "e": {
            "dblclick": "enter-edit-mode:root"
          },
          "x": [
            " data.title "
          ]
        },
        {
          "t": "button",
          "c": "destroy",
          "e": {
            "click": "destroy:root"
          }
        }
      ],
      "c": "view"
    },
    {
      "t": "input",
      "a": {
        "id": [
          "'item-' +  data.id "
        ],
        "value": [
          " data.title "
        ]
      },
      "c": "edit",
      "e": {
        "keyup": "edit:root",
        "blur": "edit:root"
      }
    }
  ],
  "c": [
    " data.completed ? 'completed' : '' "
  ],
  "f": "view.is_visible(data)",
  "n": "list",
  "v": "0.0.5"
};
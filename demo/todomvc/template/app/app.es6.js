export default {
  "i": [
    {
      "t": "section",
      "i": [
        {
          "t": "header",
          "i": [
            {
              "t": "h1",
              "x": "todos"
            },
            {
              "t": "input",
              "a": {
                "placeholder": "What needs to be done?",
                "autofocus": ""
              },
              "c": "new-todo",
              "e": {
                "keyup": "new-todo"
              }
            }
          ],
          "c": "header"
        },
        {
          "a": {
            "id": "root-main"
          }
        },
        {
          "a": {
            "id": "root-footer"
          }
        }
      ],
      "c": "todoapp"
    },
    {
      "t": "footer",
      "i": [
        {
          "t": "p",
          "x": "Double-click to edit a todo"
        },
        {
          "t": "p",
          "i": {
            "t": "a",
            "a": {
              "href": "https://github.com/nextapps-de"
            },
            "x": "Thomas Wilkerling"
          },
          "x": "Created by "
        },
        {
          "t": "p",
          "i": {
            "t": "a",
            "a": {
              "href": "http://todomvc.com"
            },
            "x": "TodoMVC"
          },
          "x": "Part of "
        }
      ],
      "c": "info"
    }
  ],
  "d": true,
  "n": "app",
  "v": "0.0.6"
};
export default {
  "t": "footer",
  "i": [
    {
      "t": "span",
      "i": [
        {
          "t": "strong",
          "x": [
            " this.state.left "
          ]
        },
        {
          "t": "span",
          "x": " item left"
        }
      ],
      "c": "todo-count"
    },
    {
      "t": "ul",
      "i": [
        {
          "t": "li",
          "i": {
            "t": "a",
            "a": {
              "href": "#/"
            },
            "c": [
              " this.state.filter === 'all' ? 'selected' : '' "
            ],
            "e": {
              "click": "route-all"
            },
            "x": "All"
          }
        },
        {
          "t": "li",
          "i": {
            "t": "a",
            "a": {
              "href": "#/active"
            },
            "c": [
              " this.state.filter === 'active' ? 'selected' : '' "
            ],
            "e": {
              "click": "route-active"
            },
            "x": "Active"
          }
        },
        {
          "t": "li",
          "i": {
            "t": "a",
            "a": {
              "href": "#/completed"
            },
            "c": [
              " this.state.filter === 'completed' ? 'selected' : '' "
            ],
            "e": {
              "click": "route-completed"
            },
            "x": "Completed"
          }
        }
      ],
      "c": "filters"
    },
    {
      "t": "button",
      "c": "clear-completed",
      "f": "!this.state.completed",
      "e": {
        "click": "clear-completed"
      },
      "x": "Clear completed"
    }
  ],
  "c": "footer",
  "f": "!this.state.empty",
  "n": "footer",
  "v": "0.0.5"
};
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
              "href": "#/",
              "click": "route-all"
            },
            "c": [
              " this.state.filter === 'all' ? 'selected' : '' "
            ],
            "x": "All"
          }
        },
        {
          "t": "li",
          "i": {
            "t": "a",
            "a": {
              "href": "#/active",
              "click": "route-active"
            },
            "c": [
              " this.state.filter === 'active' ? 'selected' : '' "
            ],
            "x": "Active"
          }
        },
        {
          "t": "li",
          "i": {
            "t": "a",
            "a": {
              "href": "#/completed",
              "click": "route-completed"
            },
            "c": [
              " this.state.filter === 'completed' ? 'selected' : '' "
            ],
            "x": "Completed"
          }
        }
      ],
      "c": "filters"
    },
    {
      "t": "button",
      "a": {
        "click": "clear-completed"
      },
      "c": "clear-completed",
      "f": "!this.state.completed",
      "x": "Clear completed"
    }
  ],
  "c": "footer",
  "f": "!this.state.empty",
  "n": "footer",
  "v": "0.1.3"
};
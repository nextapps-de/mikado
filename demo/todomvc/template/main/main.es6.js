export default {
  "t": "section",
  "i": [
    {
      "t": "input",
      "a": {
        "id": "toggle-all",
        "type": "checkbox",
        "change": "toggle-all"
      },
      "c": "toggle-all"
    },
    {
      "t": "label",
      "a": {
        "for": "toggle-all"
      },
      "x": "Mark all as complete"
    },
    {
      "t": "ul",
      "c": "todo-list"
    }
  ],
  "c": "main",
  "f": "!this.state.empty",
  "n": "main",
  "v": "0.1.3"
};
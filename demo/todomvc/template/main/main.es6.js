export default {
  "t": "section",
  "i": [
    {
      "t": "input",
      "a": {
        "id": "toggle-all",
        "type": "checkbox"
      },
      "c": "toggle-all",
      "e": {
        "change": "toggle-all"
      }
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
  "v": "0.0.5"
};
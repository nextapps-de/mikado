const path = require("path");

module.exports = {
    mode: "production",
    entry: ["./src/js/main.js", "./src/index.html", "/node_modules/todomvc-app-css/index.css"],
    output: {
        path: path.resolve("./dist/"),
        filename: "js/main.js"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "file-loader",
                options: {
                    name : '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                loader: "file-loader",
                options: {
                    name : 'css/[name].[ext]'
                }
            }
        ]
    }
};
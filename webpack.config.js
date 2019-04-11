const path = require("path");

module.exports = {
    entry: "./src/Component.js",
    mode: "production",
    output: {
        filename: "Component.js",
        path: path.resolve(__dirname, "dist")
    }
};

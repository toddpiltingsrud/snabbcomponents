const path = require("path");

module.exports = [
    {
        entry: "./src/Component.js",
        mode: "production",
        output: {
            filename: "Component.js",
            path: path.resolve(__dirname, "dist")
        }
    },
    {
        entry: "./spec/Spec_Component.js",
        mode: "production",
        output: {
            filename: "spec.js",
            path: path.resolve(__dirname, "spec")
        }
    }
];

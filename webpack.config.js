const path = require("path");

module.exports = [
    {
        entry: "./spec/Spec_Component.js",
        mode: "development",
        output: {
            filename: "spec.js",
            path: path.resolve(__dirname, "spec")
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                }
            ]
        }
    }
];

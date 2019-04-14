const path = require("path");

module.exports = [
    {
        entry: "./src/Component.js",
        mode: "production",
        output: {
            filename: "Component.js",
            path: path.resolve(__dirname, "dist")
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
    },
    {
        entry: "./spec/Spec_Component.js",
        mode: "production",
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
    },
    {
        entry: ["./spec/components/src/MonthPicker.js"],
        mode: "production",
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "spec/components/dist")
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

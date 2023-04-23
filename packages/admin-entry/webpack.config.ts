import path from "node:path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function (outputPath: string, dependencies: webpack.Configuration["dependencies"]): webpack.Configuration {
    return {
        name: "entry",
        dependencies: dependencies,
        target: "web",
        entry: path.resolve(__dirname, "./src/index.tsx"),
        output: {
            filename: "entry.[fullhash].js",
            path: outputPath,
            libraryTarget: "umd"
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
                },
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader"
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        externals: {
            react: "React",
            "react-dom": "ReactDOM",
            "@adminstudio/store": "AdminStore"
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "node_modules/react/umd/react.production.min.js"),
                        to: path.resolve(outputPath, "react.production.min.js")
                    },
                    {
                        from: path.resolve(__dirname, "node_modules/react-dom/umd/react-dom.production.min.js"),
                        to: path.resolve(outputPath, "react-dom.production.min.js")
                    },
                    {
                        from: path.resolve(__dirname, "src/fontawesome-free-6.4.0-web/css/all.min.css"),
                        to: path.resolve(outputPath, "fontawesome-free-6.4.0-web/css/all.min.css")
                    },
                    {
                        from: path.resolve(__dirname, "src/fontawesome-free-6.4.0-web/webfonts"),
                        to: path.resolve(outputPath, "fontawesome-free-6.4.0-web/webfonts")
                    }
                ]
            }),
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./src/index.html")
            })
        ]
    }
}
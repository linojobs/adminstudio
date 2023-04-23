import path from "node:path";
import webpack from "webpack";

export default function (
    outputPath: string,
    dependencies: webpack.Configuration["dependencies"]
): webpack.Configuration {
    return {
        name: "store",
        target: "web",
        mode: "production",
        dependencies: dependencies,
        entry: {
            store: path.resolve(__dirname, "./src/index.ts")
        },
        output: {
            library: "AdminStore",
            filename: "store.min.js",
            path: outputPath,
        },
        module: {
            rules: [
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
            "react-dom": "ReactDOM"
        }
    }
}
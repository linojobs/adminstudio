import path from "node:path";
import webpack from "webpack";

const publicDir = path.resolve(__dirname,"../../public");

const WebpackConfig:webpack.Configuration[] = [
    {
        name:"app",
        target:"web",
        entry:path.resolve(__dirname,"./src/index.ts"),
        output:{
            library:"AdminStore",
            filename:"store.js",
            path:publicDir,
        },
        module:{
            rules:[
                {
                    test:/\.tsx?$/,
                    loader:"ts-loader"
                }
            ]
        },
        resolve:{
            extensions:[".ts",".tsx",".js"],
        },
        externals:{
            react:"React",
            "react-dom":"ReactDOM"
        },
    }
];

export default WebpackConfig;
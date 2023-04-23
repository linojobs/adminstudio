import path from "node:path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const publicDir = path.resolve(__dirname,"../../public/ide");

const WebpackConfig:webpack.Configuration[] = [
    {
        name:"app",
        target:"web",
        entry:path.resolve(__dirname,"./src/index.tsx"),
        output:{
            filename:"[name].[fullhash].js",
            path:publicDir,
            libraryTarget:"umd"
        },
        module:{
            rules:[
                {
                    test:/\.less$/,
                    use:[MiniCssExtractPlugin.loader,"css-loader","less-loader"]
                },
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
            "react-dom":"ReactDOM",
            "@adminstudio/store":"AdminStore"
        },
        plugins:[
            new MiniCssExtractPlugin({
                filename:"[name].[fullhash].css",
            })
        ]
    }
];

export default WebpackConfig;
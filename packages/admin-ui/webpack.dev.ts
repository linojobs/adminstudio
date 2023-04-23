import path from "node:path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";

const publicDir = path.resolve(__dirname,"../../public");

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
            new CopyPlugin({
                patterns:[
                    {
                        from:path.resolve(__dirname,"src/style/fontawesome-free-6.4.0-web/css/all.min.css"),
                        to:path.resolve(publicDir,"fontawesome-free-6.4.0-web/css/all.min.css")
                    },
                    {
                        from:path.resolve(__dirname,"src/style/fontawesome-free-6.4.0-web/webfonts"),
                        to:path.resolve(publicDir,"fontawesome-free-6.4.0-web/webfonts")
                    }
                ]
            }),
            new MiniCssExtractPlugin({
                filename:"[name].[fullhash].css",
            }),
            new HtmlWebpackPlugin({
                template:path.resolve(__dirname,"./src/index.html")
            })
        ]
    }
];

export default WebpackConfig;
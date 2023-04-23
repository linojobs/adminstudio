import path from "node:path";
import { Configuration } from "webpack";

import StoreWebpack from "../admin-store/webpack.config";
import EntryWebpack from "./webpack.config";

const publicDir = path.resolve(__dirname, "../../public");

let WebpackConfig: Configuration[] = [];

export default WebpackConfig.concat(
    EntryWebpack(publicDir, ["store"]),
    StoreWebpack(publicDir, []),
);
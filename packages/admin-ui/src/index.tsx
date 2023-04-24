import React from "react";
import { Provider, store } from "@adminstudio/store";
import Biz from "./biz";

import "./style/index.less";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Biz />
        </Provider>
    );
};

export default App;
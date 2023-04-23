import React from "react";
import { Provider, store, OSContext } from "@adminstudio/store";
import Biz from "./biz";

import "./style/index.less";

const App: React.FC = () => {
    return (
        <Provider context={OSContext} store={store}>
            <Biz />
        </Provider>
    );
};

export default App;
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Biz from "./biz";

const App:React.FC = () => {
    return (
        <Provider store={store}>
            <Biz />
        </Provider>
    );
};

export default App;
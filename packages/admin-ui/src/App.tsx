import React from "react";
import { Provider } from "react-redux";
import store,{OSContext} from "@adminstudio/store";
import Biz from "./biz";

const App:React.FC = () => {
    return (
        <Provider context={OSContext} store={store}>
            <Biz />
        </Provider>
    );
};

export default App;
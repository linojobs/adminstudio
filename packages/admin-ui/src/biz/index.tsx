import { useSelector,useBootStart, useBootEnd, useSetMenus } from "@adminstudio/store";
import Boot from "./Boot";
import { getMenus } from "./api";
import React,{ useCallback } from "react";

const App:React.FC = ()=>{
    const status = useSelector((state:any)=>state.boot.status);
    const bootStart = useBootStart();
    const setMenus = useSetMenus();
    const bootEnd = useBootEnd();

    const onBoot = useCallback(async ()=>{
        bootStart();
        //await delay(3000);
        const menus = await getMenus();
        setMenus(menus);
        bootEnd();
    },[]);

    return <Boot status={status} onBoot={onBoot} />;
};

export default App;
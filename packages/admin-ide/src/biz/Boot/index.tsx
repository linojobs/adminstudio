import React, { useEffect } from "react";
import BootLoading from "../BootLoading";
import AdminPage from "../AdminPage";

const Boot:React.FC<BootProps> = ({status,onBoot}) => {

    useEffect(()=>{
        onBoot();
    },[]);

    if(status === "idle"){
        return <>idle</>;
    }

    if(status === "booting"){
        return <BootLoading />;
    }

    if(status === "failed"){
        return <>failed</>;
    }

    if(status === "end"){
        return <AdminPage />;
    }

    return (
        <></>
    );
};

export default Boot;
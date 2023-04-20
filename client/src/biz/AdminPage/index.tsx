import React from "react";
import Menu from "./Menu";

const AdminPage:React.FC = ()=>{
    return (
        <div className="AdminPage">
            <div className="NavPanel"></div>
            <div className="Panel">
                <div className="MenuPanel">
                    <Menu />
                </div>
                <div className="SplitGrab"></div>
                <div className="PagePanel">
                    
                </div>
            </div>
            <div className="FootPanel"></div>
        </div>
    );
};

export default AdminPage;
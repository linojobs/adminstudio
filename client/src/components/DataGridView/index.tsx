import React, { useCallback } from "react";

const DataGrid:React.FC<DataGridViewProps> = (props) => {

    const {columns,dataSource} = props;
    const handleRef = useCallback((ele:HTMLDivElement)=>{
        const parentElement = ele.parentElement as HTMLElement;
        ele.style.width = `${parentElement.offsetWidth}px`;
        ele.style.height = `${parentElement.offsetHeight}px`;
    },[]);

    return (
        <div className="DataGrid">
            <div className="DataGridHead">
                <div style={{width:2000}}></div>
            </div>
            <div className="DataGridBody">
                <div style={{height:2000}}></div>
            </div>
        </div>
    );
};

export default DataGrid;
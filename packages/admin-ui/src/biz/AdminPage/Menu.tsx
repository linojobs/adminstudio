import React from "react";
import {connect} from "@adminstudio/store";
import { Dispatch } from "redux";
import {TreeView} from "@adminstudio/components";

function mapStateToProps(state:AppState){
    return {
        dataSource:state.boot.menus
    };
}

function mapDispatchToProps(dispatch:Dispatch){
    return {
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(TreeView);
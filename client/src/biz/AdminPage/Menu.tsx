import React from "react";
import {connect} from "react-redux";
import { Dispatch } from "redux";
import TreeView from "../../components/TreeView";

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
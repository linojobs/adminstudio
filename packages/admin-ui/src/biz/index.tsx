import {connect} from "react-redux";
import { Dispatch } from "redux";
import { bootStart, bootEnd, setMenus } from "../../sys/redux/reducers/boot";
import Boot from "./Boot";
import { getMenus } from "./api";

function mapStateToProps(state:AppState){
    return {
        status:state.boot.status
    };
}

function mapDispatchToProps(dispatch:Dispatch){
    return {
        async onBoot(){
            dispatch(bootStart());
            //await delay(3000);
            const menus = await getMenus();
            dispatch(setMenus(menus));
            dispatch(bootEnd());
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Boot);
import { Dispatch } from "redux";
import { connect, bootStart, bootEnd, setMenus } from "@adminstudio/store";
import Boot from "./Boot";
import { getMenus } from "./api";

function mapStateToProps(state: AppState) {
    return {
        status: state.boot.status
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        async onBoot() {
            bootStart();
            //await delay(3000);
            const menus = await getMenus();
            setMenus(menus);
            bootEnd();
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Boot);
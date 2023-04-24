import { useDispatch } from "./redux";
import { actions } from "./reducers/boot";

export function useBootStart() {
    const dispatch = useDispatch();
    return ()=>dispatch(actions.bootStart());
}

export function useBootEnd() {
    const dispatch = useDispatch();
    return ()=>dispatch(actions.bootEnd());
}

export function useBootFailed() {
    const dispatch = useDispatch();
    return ()=>dispatch(actions.bootFailed());
}

export function useSetMenus() {
    const dispatch = useDispatch();
    return (menus)=>dispatch(actions.setMenus(menus));
}
import { useDispatch } from "./store";
import { actions } from "./reducers/boot";

export function bootStart() {
    const dispatch = useDispatch();
    dispatch(actions.bootStart());
}

export function bootEnd() {
    const dispatch = useDispatch();
    dispatch(actions.bootEnd());
}

export function bootFailed() {
    const dispatch = useDispatch();
    dispatch(actions.bootFailed());
}

export function setMenus(menus) {
    const dispatch = useDispatch();
    dispatch(actions.setMenus(menus));
}
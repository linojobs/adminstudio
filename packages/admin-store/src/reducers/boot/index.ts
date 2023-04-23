import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState: BootState = {
    status: "idle",
    menus: []
};

// create slice
const slice = createSlice({
    name: "usr",
    initialState,
    reducers: {
        bootStart(state: BootState) {
            state.status = "booting";
        },
        bootEnd(state: BootState) {
            state.status = "end";
        },
        bootFailed(state: BootState) {
            state.status = "failed";
        },
        setMenus(state: BootState, { payload }) {
            state.menus = payload;
        }
    }
});

// export sync action
export const { actions } = slice;
export default slice.reducer;
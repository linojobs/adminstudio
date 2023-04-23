import {createSlice} from "@reduxjs/toolkit";

// initial state
const initialState:GuardState = {
    status:"idle"
};

// create slice
const slice = createSlice({
    name: "usr",
    initialState,
    reducers: {
        loginStart(state:GuardState){
            state.status = "loginstart";
        },
        loginEnd(state:GuardState){
            state.status = "loginend";
        },
        loginFailed(state:GuardState){
            state.status = "loginfailed";
        }
    }
});

// export sync action
export const {loginStart,loginEnd,loginFailed} = slice.actions; 
export default slice.reducer;
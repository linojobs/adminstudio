import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// initial state
const initialState:UsrState = {
    pending:false,
};

// export async action


// create slice
const slice = createSlice({
    name: "usr",
    initialState,
    reducers: {
        add(state:UsrState){
            state.pending = true;
        }
    }
});

// export sync action
export const {add} = slice.actions; 
export default slice.reducer;
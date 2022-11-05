import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {
        fullname: '',
        email: '',
        isAuthenticated: false
    },
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers :{
        setCurrentUser: (state, action) =>{
            state.origin = action.payload
        },
    }
})

export const {setCurrentUser} = authSlice.actions;

//selectors
export const selectCurrent = (state) => state.auth.currentUser;


export default authSlice.reducer;
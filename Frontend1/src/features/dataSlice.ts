import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data : 
    {
        role : "",
        name : "",
        email : "",
        // password : "",
        oauthId : ""
    },
    courses : [],
}

export const dataSlice = createSlice({
    name: 'dataSlice',
    initialState,
    reducers: {
       setData : (state, action) => {
           state.data = action.payload
       },
       setCourses : (state, action) => {
        state.courses = action.payload
    }
    },
})

export const {setData} = dataSlice.actions
export default dataSlice.reducer

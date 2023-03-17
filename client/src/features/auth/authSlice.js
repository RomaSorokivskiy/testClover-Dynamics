import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: '/auth',
    initialState: {
        accessToken: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
    }
})

export const { setCredentials} = authSlice.actions

export default authSlice.reducer
export const selectCurrentToken = (state) => state.auth.token
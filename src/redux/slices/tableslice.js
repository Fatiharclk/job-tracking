import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Data: [],
}

export const tableSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {

        AddItem: (state, action) => {
            state.Data.push(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = tableSlice.actions

export default tableSlice.reducer